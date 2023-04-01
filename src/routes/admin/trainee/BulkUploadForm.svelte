<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainees } from '$lib/store/trainee';
	import { FileUploader, Modal } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	let fileUploader;
	let excel_file = [];

	$: {
		console.log(excel_file);
	}

	const schema = yup.object({
		excel_file: yup
			.mixed()
			.required()
			.test('fileFormat', 'Only .xlsx files are accepted', (value) => {
				if (!value) {
					return false;
				}
				return value.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
			})
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await trainees.uploadExel({ ...data });
			open = false;
			reset();
		}
	});

	$: {
		setFields('excel_file', excel_file[0]);
	}

	onMount(async () => {
		trainees.getTrainees();
	});
</script>

<Modal
	bind:open
	modalHeading="Bulk Upload"
	primaryButtonText="Upload"
	preventCloseOnClickOutside
	secondaryButtonText="Cancel"
	on:submit={submitHandler}
>
	<form use:form>
		<div>
			<FileUploader
				bind:this={fileUploader}
				labelTitle="Upload files"
				buttonLabel="Add files"
				bind:files={excel_file}
				status="complete"
				type="file"
			/>
		</div>
		{#if $errors.files}
			<p>{$errors.files}</p>
		{/if}
		<p>{JSON.stringify($data)}</p>
		<p>{JSON.stringify($errors)}</p>
	</form>
</Modal>
