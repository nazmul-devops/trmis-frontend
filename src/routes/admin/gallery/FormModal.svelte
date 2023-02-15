<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { createImage, getImages, updateImage } from '$lib/service/gallery';
	import { Checkbox, FileUploader, Modal, TextInput } from 'carbon-components-svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	let fileUploader;
	let files = [];
	export let open = true;
	export let image = {
		id: null,
		title: null,
		description: null,
		uploaded_files: []
	};

	$: {
		setFields('title', image.title);
		setFields('description', image.description);
		setFields('uploaded_files', image.uploaded_files);
	}

	$: {
		setFields('uploaded_files', files);
	}

	const schema = yup.object({
		title: yup.string().required(),
		description: yup.string().required(),
		uploaded_files: yup.array().min(1)
	});

	const { form, reset, createSubmitHandler, setFields, data, errors } = createForm({
		extend: validator({ schema })
	});

	const dispatch = createEventDispatcher();

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (image.id) {
				await updateImage({ ...data, id: image.id });
			} else {
				await createImage({ ...data });
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
	modalHeading="Upload Images"
	primaryButtonText={image.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="title" labelText="Title" placeholder="Enter Title..." />
		<TextInput name="description" labelText="Description" placeholder="Enter Description..." />
		<FileUploader
			bind:this={fileUploader}
			multiple
			labelTitle="Upload files"
			buttonLabel="Add files"
			bind:files
			status="complete"
			type="file"
		/>
	</form>

	{JSON.stringify($data)} <br />
	{JSON.stringify($errors)}
</Modal>
