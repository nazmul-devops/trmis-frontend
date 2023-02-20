<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { courseCategories } from '$lib/store/courseCategory';
	import { Modal, NumberInput, TextInput, Select, SelectItem } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let trainingCourse = {
		id: null,
		title: null,
		description: null,
		code: null,
		pass_mark: null,
		objective: null,
		course_category: null
	};

	$: {
		setFields('title', trainingCourse.title);
		setFields('description', trainingCourse.description);
		setFields('code', trainingCourse.code);
		setFields('pass_mark', trainingCourse.pass_mark);
		setFields('objective', trainingCourse.objective);
		setFields('course_category', trainingCourse.course_category);
	}

	const schema = yup.object({
		title: yup.string().required(),
		description: yup.string().required(),
		code: yup.string().required(),
		pass_mark: yup.number().required(),
		objective: yup.string().required(),
		course_category: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		transform: (values: any) => {
			return {
				...values,
				pass_mark: values.pass_mark ? parseInt(values.pass_mark) : null,
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

	onMount(async () => {
		trainingCourses.getTrainingCourses();
		courseCategories.getCourseCategories();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Course"
	primaryButtonText={trainingCourse.id == null ? 'Create' : 'Edit'}
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
		<TextInput
			invalid={$errors.description != null}
			name="description"
			labelText="Description"
			placeholder="Enter  description..."
		/>
		<TextInput
			invalid={$errors.code != null}
			name="code"
			labelText="Code"
			placeholder="Enter  Code..."
		/>
		<TextInput
			invalid={$errors.pass_mark != null}
			name="pass_mark"
			labelText="Pass Mark"
			placeholder="Enter  pass_mark..."
		/>
		<TextInput
			invalid={$errors.objective != null}
			name="objective"
			labelText="Objective"
			placeholder="Enter  objective..."
		/>
		<Select
			invalid={$errors.course_category != null}
			name="course_category"
			labelText="Course Category"
		>
			<SelectItem text="choose Course Category" />
			{#each $courseCategories.data as category}
				<SelectItem value={category.id} text={category.title} />
			{/each}
		</Select>

		<!-- {JSON.stringify($errors)} -->
	</form>
</Modal>
