<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { courseCategories } from '$lib/store/courseCategory';
	import {
		Modal,
		NumberInput,
		TextInput,
		Select,
		SelectItem,
		ComboBox
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { Course } from 'carbon-icons-svelte';

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
		title: yup.string().required(),
		description: yup.string().required(),
		code: yup.string().required(),
		course_category: yup.number().required()
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
	$: {
		console.log('Hello', CourseCategories);
	}

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
			<TextInput
			invalid={$errors.title != null}
			name="title"
			labelText="title"
			placeholder="Enter Title..."
			/>
			<TextInput
				invalid={$errors.description != null}
				name="description"
				labelText="Description"
				placeholder="Enter description..."
			/>
			<TextInput
				invalid={$errors.code != null}
				name="code"
				labelText="Code"
				placeholder="Enter 	Code..."
			/>

			<ComboBox
				bind:selectedId={$data.course_category}
				direction='top'
				titleText="Course Category"
				placeholder="Select Course Category"
				items={CourseCategories}
				{shouldFilterItem}
			/>

		</div>
		<!-- {JSON.stringify($errors)} -->
	</form>
</Modal>
