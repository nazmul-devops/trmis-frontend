<!-- <script lang="ts">
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
		course_category: yup.string()
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			console.log(data);
			// return;
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
	modalHeading="Create database"
	primaryButtonText={trainingCourse.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="title" labelText="title" placeholder="Enter  Title..." />
		<TextInput name="description" labelText="Description" placeholder="Enter  description..." />
		<TextInput name="code" labelText="Code" placeholder="Enter  Code..." />
		<NumberInput name="pass_mark" label="Pass Mark" placeholder="Enter  pass_mark..." />
		<TextInput name="objective" labelText="Objective" placeholder="Enter  objective..." />
		<Select name="course_category" labelText="Course Category">
			<SelectItem text="choose Course Category" />
			{#each $courseCategories.data as category}
				<SelectItem value={category.id} text={category.title} />
			{/each}
		</Select>
	</form>
</Modal> -->
