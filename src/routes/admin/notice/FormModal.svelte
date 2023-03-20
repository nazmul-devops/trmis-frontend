<script lang="ts">
	import { onMount } from 'svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { notices } from '$lib/store/notice';
	import { Checkbox, FileUploader, Modal, TextInput } from 'carbon-components-svelte';

	let fileUploader;
	let files = [];
	export let open = true;
	export let notice = {
		id: null,
		title: null,
		description: null,
		files: null,
		expiration_date: null,
		show_in_home_page: null
	};

	$: {
		if (notice.id != null) {
			setData('title', notice.title);
			setData('description', notice.description);
			setData('expiration_date', notice.expiration_date);
			setData('show_in_home_page', notice.show_in_home_page);
		} else {
			reset();
		}
	}

	$: {
		setData('files', files);
	}

	const schema = yup.object({
		title: yup.string().required(),
		description: yup.string().required(),
		files: yup.mixed().required(),
		expiration_date: yup.string().required(),
		show_in_home_page: yup.boolean()
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
		// transform: (values: any) => {
		// 	return {
		// 		...values,
		// 		serial_no: values.serial_no ? parseInt(values.serial_no) : null
		// 	};
		// },
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (notice.id) {
				await notices.updateNotice({ ...data, id: notice.id });
			} else {
				await notices.createNotice({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		notices.getNotices();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Notice"
	primaryButtonText={notice.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput
			bind:value={$data.title}
			name="title"
			labelText="Title"
			placeholder="Enter Title..."
		/>
		<TextInput
			bind:value={$data.description}
			name="description"
			labelText="Description"
			placeholder="Enter Description..."
		/>
		<FileUploader
			bind:this={fileUploader}
			labelTitle="Upload files"
			buttonLabel="Add files"
			bind:files
			status="complete"
			type="file"
		/>
		<div>
			<label for="">Expiration Date</label> <br />
			<input
				class=" t-border t-p-3 t-my-2 "
				type="datetime-local"
				id="birthdaytime"
				bind:value={$data.expiration_date}
				name="expiration_date"
			/>
		</div>
		<Checkbox name="show_in_home_page" labelText=" Show Public Website ?" />
	</form>
	{JSON.stringify($data)}
</Modal>
