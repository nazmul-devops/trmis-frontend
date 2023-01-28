<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { courseMaterials } from '$lib/store/courseMaterial';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import {
		Modal,
		FileUploader,
		TextInput,
		Select,
		SelectItem,
		Button
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	let uploadedFiles = [];

	function handleAdd(event) {
		uploadedFiles = event.detail;
		console.log(uploadedFiles[0].name);
	}
	export let open = true;
	export let courseMaterial = {
		id: null,
		title: null,
		description: null,
		uploaded_files: null,
		training_course_id: null
	};

	$: {
		setFields('title', courseMaterial.title);
		setFields('description', courseMaterial.description);
		setFields('uploaded_files', courseMaterial.uploaded_files);
		setFields('training_course_id', courseMaterial.training_course_id);
	}

	const schema = yup.object({
		title: yup.string().required(),
		description: yup.string().required(),
		uploaded_files: yup.array(),
		training_course_id: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		// transform: (values: any) => {
		// 	return {
		// 		...values,
		// 		uploaded_files: js(values.marital_status)
		// 	};
		// },
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (courseMaterial.id) {
				await courseMaterials.updateCourseMaterial({ ...data, id: courseMaterial.id });
			} else {
				await courseMaterials.createCourseMaterial({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		courseMaterials.getCourseMaterials();
		trainingCourses.getTrainingCourses();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Course Material"
	primaryButtonText={courseMaterial.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="title" labelText="title" placeholder="Enter  Title..." />
		<TextInput name="description" labelText="Description" placeholder="Enter  description..." />
		<FileUploader
			multiple
			labelTitle="Upload files"
			buttonLabel="Add files"
			labelDescription=""
			on:add={handleAdd}
			files={uploadedFiles}
			status="complete"
		/>
		<Select name="training_course_id" labelText="Course">
			<SelectItem text="choose Course" />
			{#each $trainingCourses.data as course}
				<SelectItem value={course.id} text={course.title} />
			{/each}
		</Select>
		{JSON.stringify($errors)}
	</form>
</Modal>
