<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { grades } from '$lib/store/grades';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let grade = {
		id: null,
		name: null,
		serial_no: null,
		remarks: null
	};

	$: {
		setFields('name', grade.name);
		setFields('serial_no', grade.serial_no);
		setFields('remarks', grade.remarks);
	}

	const schema = yup.object({
		name: yup.string().required(),
		serial_no: yup.number().required(),
		remarks: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields } = createForm({
		transform: (values: any) => {
			return {
				...values,
				serial_no: values.serial_no ? parseInt(values.serial_no) : null
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (grade.id) {
				await grades.updateGrade({ ...data, id: grade.id });
			} else {
				await grades.createGrade({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		grades.getGrades();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Grades"
	primaryButtonText={grade.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="name" labelText=" name" placeholder="Enter  name..." />
		<TextInput name="serial_no" labelText="Serial_No" placeholder="Enter  Serial_No..." />
		<TextInput name="remarks" labelText="Remarks" placeholder="Enter  Remarks..." />
	</form>
</Modal>
