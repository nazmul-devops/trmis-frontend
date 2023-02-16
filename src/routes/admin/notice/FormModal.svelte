<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { createNotice, updateNotice } from '$lib/service/notice';
	import { Checkbox, FileUploader, Modal, TextInput } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';

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
		setFields('title', notice.title);
		setFields('description', notice.description);
		setFields('expiration_date', notice.expiration_date);
		setFields('show_in_home_page', notice.show_in_home_page);
	}

	$: {
		setFields('files', files[0]);
	}

	const schema = yup.object({
		title: yup.string().required(),
		description: yup.string().required(),
		files: yup.mixed().required(),
		expiration_date: yup.string().required(),
		show_in_home_page: yup.boolean().required()
	});

	const { form, reset, createSubmitHandler, setFields } = createForm({
		// transform: (values: any) => {
		// 	return {
		// 		...values,
		// 		serial_no: values.serial_no ? parseInt(values.serial_no) : null
		// 	};
		// },
		extend: validator({ schema })
	});

	const dispatch = createEventDispatcher();

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (notice.id) {
				await updateNotice({ ...data, id: notice.id });
			} else {
				await createNotice({ ...data });
			}
			open = false;
			dispatch('update-list');
			reset();
		}
	});

	// onMount(async () => {
	// 	getNotices();
	// });
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
		<TextInput name="title" labelText="Title" placeholder="Enter Title..." />
		<TextInput name="description" labelText="Description" placeholder="Enter Description..." />
		<FileUploader
			bind:this={fileUploader}
			labelTitle="Upload files"
			buttonLabel="Add files"
			bind:files
			status="complete"
			type="file"
		/>
		<input type="datetime-local" id="birthdaytime" name="expiration_date" />
		<Checkbox name="show_in_home_page" labelText=" Show Home Page ?" />
	</form>
</Modal>
