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

	let fileUploader;
	let files: Array<any> = [];

	export let open = true;
	export let courseMaterial = {
		id: null,
		title: null,
		description: null,
		uploaded_files: [],
		training_course_id: null
	};

	$: {
		setFields('title', courseMaterial.title);
		setFields('description', courseMaterial.description);
		setFields('training_course_id', courseMaterial.training_course_id);
	}

	$: {
		setFields('uploaded_files', files);
	}

	const schema = yup.object({
		title: yup.string().required(),
		description: yup.string().required(),
		uploaded_files: yup.array().min(1),
		training_course_id: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, addField } = createForm({
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
			bind:this={fileUploader}
			labelTitle="Upload files"
			buttonLabel="Add files"
			multiple
			bind:files
			status="complete"
			type="file"
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
