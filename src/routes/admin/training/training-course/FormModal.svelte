<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { courseCategories } from '$lib/store/courseCategory';
	import { Modal, TextInput, ComboBox } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	export let open = true;
	export let trainingCourse = {
		id: null,
		title: null,
		description: null,
		code: null,
		course_category: null
	};

	$: {
		if (trainingCourse.id != null) {
			setFields('title', trainingCourse.title);
			setFields('description', trainingCourse.description);
			setFields('code', trainingCourse.code);
			setFields('course_category', trainingCourse.course_category);
		} else {
			reset();
		}
	}

	const schema = yup.object({
		title: yup.string().required('Title is required.'),
		description: yup.string().required('Desription is required.'),
		code: yup.string().required('Code is required.'),
		course_category: yup.number().required('Course category is required.')
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				// pass_mark: values.pass_mark ? parseInt(values.pass_mark) : null,
				course_category: parseInt(values.course_category)
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (trainingCourse.id) {
				await trainingCourses.updateTrainingCourse({ ...data, id: trainingCourse.id });
			} else {
				await trainingCourses.createTrainingCourse({ ...data });
			}
			open = false;
			reset();
		}
	});

	$: CourseCategories = $courseCategories.data.map((item) => ({ ...item, text: item.title }));

	onMount(async () => {
		trainingCourses.getTrainingCourses();
		courseCategories.getCourseCategories();
	});
</script>

<Modal
	preventCloseOnClickOutside
	bind:open
	modalHeading={trainingCourse.id == null ? 'Create training' : 'Edit training'}
	primaryButtonText={trainingCourse.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div>
				<TextInput
					invalid={$errors.title != null}
					bind:value={$data.title}
					name="title"
					labelText="Title"
					placeholder="Enter Title..."
				/>
				{#if $errors.title}
					<p class="t-text-sm t-text-red-500">{$errors.title}</p>
				{/if}
			</div>
			<div>
				<TextInput
					invalid={$errors.description != null}
					bind:value={$data.description}
					name="description"
					labelText="Description"
					placeholder="Enter description..."
				/>
				{#if $errors.description}
					<p class="t-text-sm t-text-red-500">{$errors.description}</p>
				{/if}
			</div>
			<div>
				<TextInput
					invalid={$errors.code != null}
					bind:value={$data.code}
					name="code"
					labelText="Code"
					placeholder="Enter Code..."
				/>
				{#if $errors.code}
					<p class="t-text-sm t-text-red-500">{$errors.code}</p>
				{/if}
			</div>
			<div>
				<ComboBox
					invalid={$errors.course_category != null}
					bind:selectedId={$data.course_category}
					direction="top"
					titleText="Course Category"
					placeholder="Select Course Category"
					items={CourseCategories}
					{shouldFilterItem}
				/>
				{#if $errors.course_category}
					<p class="t-text-sm t-text-red-500">{$errors.course_category}</p>
				{/if}
			</div>
		</div>
		<!-- {JSON.stringify($errors)} -->
	</form>
</Modal>
