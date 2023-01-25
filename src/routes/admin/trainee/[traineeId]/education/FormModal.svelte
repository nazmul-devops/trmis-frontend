<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { educations } from '$lib/store/traineeEducation';
	import { trainees } from '$lib/store/trainee';
	import { Modal, Select, SelectItem, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let education = {
		id: null,
		degree: null,
		board: null,
		grade_type: null,
		institution: null,
		result: null,
		passing_year: null,
		trainee: null
	};

	let board = [
		{ title: 'Dhaka' },
		{ title: 'Cumilla' },
		{ title: 'Barishal' },
		{ title: 'Chittagong' },
		{ title: 'Dinajpur' },
		{ title: 'Jessore' },
		{ title: 'Mymensingh' },
		{ title: 'Rajshahi' },
		{ title: 'Sylhet' }
	];

	$: {
		setFields('degree', education.degree);
		setFields('board', education.board);
		setFields('grade_type', education.grade_type);
		setFields('institution', education.institution);
		setFields('result', education.result);
		setFields('passing_year', education.passing_year);
		setFields('trainee', education.trainee);
	}

	const schema = yup.object({
		degree: yup.string().required(),
		board: yup.string().required(),
		grade_type: yup.string().required(),
		institution: yup.string().required(),
		result: yup.string().required(),
		passing_year: yup.string().required(),
		trainee: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				trainee: parseInt(values.trainee)
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (education.id) {
				await educations.updateEducation({ ...data, id: education.id });
			} else {
				await educations.createEducation({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		educations.getEducations();
		trainees.getTrainees();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Education"
	primaryButtonText={education.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput
			invalid={$errors.degree != null}
			name="degree"
			labelText="Degree"
			placeholder="Enter  Degree..."
		/>
		<Select invalid={$errors.board != null} name="board" labelText="Board">
			<SelectItem text="choose Board" />
			{#each board as boardData}
				<SelectItem value={boardData.title} />
			{/each}
		</Select>
		<TextInput
			invalid={$errors.grade_type != null}
			name="grade_type"
			labelText="Grade Type"
			placeholder="Enter Grade Type..."
		/>
		<TextInput
			invalid={$errors.institution != null}
			name="institution"
			labelText="Institution"
			placeholder="Enter Institution..."
		/>
		<TextInput
			invalid={$errors.result != null}
			name="result"
			labelText="Result"
			placeholder="Enter Result..."
		/>
		<TextInput
			invalid={$errors.passing_year != null}
			name="passing_year"
			labelText="Passing Year"
			placeholder="Enter Passing Year..."
		/>
		<Select invalid={$errors.trainee != null} name="trainee" labelText="Trainee">
			<SelectItem text="choose Training Course" />
			{#each $trainees.data as trainee}
				<SelectItem value={trainee.phone} text={trainee.name} />
			{/each}
		</Select>

		<p>{JSON.stringify($errors)}</p>
	</form>
</Modal>
