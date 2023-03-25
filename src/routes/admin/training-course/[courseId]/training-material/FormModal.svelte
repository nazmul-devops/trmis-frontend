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
		ComboBox
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let fileUploader;
	let files = [];

	export let open = true;
	export let courseMaterial = {
		id: null,
		title: null,
		description: null,
		files: null,
	};

	function formSetFields() {
		setFields('title', courseMaterial.title);
		setFields('description', courseMaterial.description);
	}

	$: {
		// formSetFieldsForFile();
		if (courseMaterial.id != null) {
			formSetFields();
		} else {
			reset();
		}
	}

	$: {
		setFields('files', files[0]);
		console.log(files[0]);
	}

	const schema = yup.object({
		title: yup.string().required().typeError('Title is required.'),
		description: yup.string().required().typeError('Description is required.'),
		files: yup.mixed().required(),
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
				await courseMaterials.createCourseMaterial({
					...data,
					training_course_id: parseInt($page.params.courseId)
				});
			}
			open = false;
			reset();
		}
	});


	$: {
		courseMaterials.getCourseMaterials($page.params.courseId);
	}

	onMount(async () => {
		trainingCourses.getTrainingCourses();
	});
</script>

<Modal
	bind:open
	modalHeading={courseMaterial.id == null ? 'Create Training Material' : 'Edit Training Material'}
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

		<!-- <ComboBox
			titleText="Course"
			invalid={$errors.training_course_id != null}
			bind:selectedId={$data.training_course_id}
			placeholder={'Choose Course'}
			items={trainingCoursesList}
		/>
		{#if $errors.training_course_id}
			<p class="t-text-red-600">{$errors.training_course_id}</p>
		{/if} -->
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
