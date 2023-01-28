<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { courseTopics } from '$lib/store/courseTopic';
	import { Modal, TextInput, Select, SelectItem } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let courseTopic = {
		id: null,
		title: null,
		description: null,
		training_course: null,
		training_course_name: null
	};

	$: {
		setFields('title', courseTopic.title);
		setFields('description', courseTopic.description);
		setFields('training_course', courseTopic.training_course);
	}

	const schema = yup.object({
		title: yup.string().required(),
		description: yup.string().required(),
		training_course: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		transform: (values: any) => {
			return {
				...values,
				training_course: parseInt(values.training_course)
			}
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (courseTopic.id) {
				await courseTopics.updateCourseTopic({ ...data, id: courseTopic.id });
			} else {
				await courseTopics.createCourseTopic({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		trainingCourses.getTrainingCourses();
		courseTopics.getCourseTopics();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Course Topic"
	primaryButtonText={courseTopic.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="title" labelText="title" placeholder="Enter  Title..." />
		<TextInput name="description" labelText="Description" placeholder="Enter  description..." />
		<Select name="training_course" labelText="Course">
			<SelectItem text="choose Course" />
			{#each $trainingCourses.data as course}
				<SelectItem value={course.id} text={course.title} />
			{/each}
		</Select>
	</form>
	<!-- {JSON.stringify($errors)} -->
</Modal>
