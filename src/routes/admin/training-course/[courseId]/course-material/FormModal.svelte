<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { courseMaterials } from '$lib/store/courseMaterial';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { Modal, FileUploader, TextInput, Select, SelectItem, ComboBox } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { bind } from 'svelte/internal';

	let fileUploader;
	let files = [];

	export let open = true;
	export let courseMaterial = {
		id: null,
		title: null,
		description: null,
		files: null,
		training_course_id: null
	};

	function formSetFields() {
		setFields('title', courseMaterial.title);
		setFields('description', courseMaterial.description);
		setFields('training_course_id', courseMaterial.training_course_id);
	}


	$: {
		// formSetFieldsForFile();
		if (courseMaterial.id != null) {
			formSetFields();
		}else{
			reset()
		}
	}

	$: {
		setFields('files', files[0]);
		console.log(files[0]);
	}

	const schema = yup.object({
		title: yup.string().required().typeError("Title is required."),
		description: yup.string().required().typeError("Description is required."),
		files: yup.mixed().required(),
		training_course_id: yup.number().required().typeError("Training course id is required.")
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				training_course_id: parseInt(values.training_course_id)
			};
		},
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

	$: trainingCoursesList = $trainingCourses.data.map((item)=>({...item, text:item.title}))

	onMount(async () => {
		courseMaterials.getCourseMaterials();
		trainingCourses.getTrainingCourses();
	});
</script>

<Modal
	bind:open
	modalHeading={courseMaterial.id == null ? 'Create Course Material' : 'Edit Course Material'}
	primaryButtonText={courseMaterial.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput 
			invalid={$errors.title != null}
			name="title" 
			labelText="title" 
			placeholder="Enter  Title..." 
		/>
		{#if $errors.title}
			<p class="t-text-red-600">{$errors.title}</p>
		{/if}
		<TextInput 
			invalid={$errors.description != null}
			name="description" 
			labelText="Description" 
			placeholder="Enter  description..." 
		/>
		{#if $errors.description}
			<p class="t-text-red-600">{$errors.description}</p>
		{/if}

		<ComboBox
			titleText="Course"
			invalid = {$errors.training_course_id != null}
			bind:selectedId={$data.training_course_id}
			placeholder={"Choose Course"}
			items={trainingCoursesList}
		/>
		{#if $errors.training_course_id}
			<p class="t-text-red-600">{$errors.training_course_id}</p>
		{/if}
		<!-- <Select name="training_course_id" labelText="Course">
			<SelectItem text="choose Course" />
			{#each $trainingCourses.data as course}
				<SelectItem value={course.id} text={course.title} />
			{/each}
		</Select> -->
		<FileUploader
			bind:this={fileUploader}
			labelTitle="Upload files"
			buttonLabel="Add files"
			bind:files
			status="complete"
			type="file"
		/>
		<!-- {JSON.stringify($errors, $data)} -->
	</form>
</Modal>
