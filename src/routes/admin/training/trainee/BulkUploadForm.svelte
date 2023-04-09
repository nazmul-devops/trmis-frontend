<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainees } from '$lib/store/trainee';
	import { FileUploader, Modal } from 'carbon-components-svelte';

	export let open = true;
	export let confirmModal = false;
	let fileUploader;
	let excel_file = [];

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
			confirmModal = true;
		}
	});

	$: {
		setFields('excel_file', excel_file[0]);
	}
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
				labelTitle="Upload file"
				buttonLabel="Add file"
				bind:files={excel_file}
				status="complete"
				type="file"
			/>
		</div>
		{#if $errors.files}
			<p>{$errors.files}</p>
		{/if}
	</form>
</Modal>

<Modal passiveModal bind:open={confirmModal} modalHeading="Bulk Upload (participants)" on:open on:close>
	<div class="t-flex t-items-center">
		<div class="t-bg-clip-text t-text-transparent t-bg-#0F62FE">
			<i class="las la-user-graduate t-text-xl"></i>
		</div>
		<p>
			Successfully Upload {$trainees.upload.successRows} Participants
		</p>
	</div>
	<div class="t-flex t-items-center">
		<div class="t-bg-clip-text t-text-transparent t-bg-[#FEAD0F]">
			<i class="las la-exclamation-traiangle t-text-xl"></i>
		</div>
		<p>
			{$trainees.upload.errorMessage}
		</p>
	</div>
	<div class="t-flex t-items-center">
		<div class="t-bg-clip-text t-text-transparent t-bg-[#FE0F0F]">
			<i class="las la-exclamation-circle t-text-xl"></i>
		</div>
		<p>
			Error At Row Number {$trainees.upload.errorRows} From Excel File.
		</p>
	</div>
</Modal>
