<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { completedCourses } from '$lib/store/completedCourse';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { trainees } from '$lib/store/trainee';
	import {
		Modal,
		Select,
		SelectItem
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let completedCourse = {
		id: null,
		trainee_id: null,
		training_course_id: null
	};


	function formSetFields(){
		setFields('trainee_id', completedCourse.trainee_id);
		setFields('training_course_id', completedCourse.training_course_id);
	}

	$: {
		if (completedCourse.id != null) {
			formSetFields();
		}
	}

	const schema = yup.object({
		trainee_id: yup.number().required(),
		training_course_id: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				trainee_id: parseInt(values.trainee_id),
				training_course_id: parseInt(values.training_course_id)
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (completedCourse.id) {
				await completedCourses.updateCompletedCourse({ ...data, id: completedCourse.id });
			} else {
				await completedCourses.createCompletedCourse({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		completedCourses.getCompletedCourses();
		trainingCourses.getTrainingCourses();
		trainees.getTrainees();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Completed Course"
	primaryButtonText={completedCourse.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<Select invalid={$errors.designation != null} name="trainee_id" labelText="Trainee">
			<SelectItem text="choose Trainee" />
			{#each $trainees.data as trainee}
				<SelectItem value={trainee.phone} text={trainee.name} />
			{/each}
		</Select>
		<Select invalid={$errors.grade != null} name="training_course_id" labelText="Training Course">
			<SelectItem text="choose Training Course" />
			{#each $trainingCourses.data as course}
				<SelectItem value={course.id} text={course.title} />
			{/each}
		</Select>

		<!-- <p>{JSON.stringify($errors)}</p> -->
	</form>
</Modal>
