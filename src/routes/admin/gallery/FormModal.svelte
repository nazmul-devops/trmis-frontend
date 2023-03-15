<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { createImage, getImages, updateImage } from '$lib/service/gallery';
	import {
		ComboBox,
		FileUploader,
		Modal,
		Select,
		SelectItem,
		TextInput
	} from 'carbon-components-svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	let fileUploader;
	let files = [];
	export let open = true;
	export let image = {
		id: null,
		title: null,
		description: null,
		category: null,
		uploaded_files: []
	};

	$: {
		if (image.id != null) {
			setFields('title', image.title);
			setFields('description', image.description);
			setFields('category', image.category);
			setFields('uploaded_files', image.uploaded_files);
		} else {
			reset();
		}
	}

	$: {
		setFields('uploaded_files', files);
	}

	const schema = yup.object({
		title: yup.string().required().typeError('Title is required.'),
		description: yup.string().required().typeError('Description is required'),
		category: yup.number().required(),
		uploaded_files: yup.array().min(1)
	});

	const { form, reset, createSubmitHandler, setFields, data, errors } = createForm({
		transform: ( values : any ) =>{
			return {
				...values,
				category : parseInt( values.category )
			}
		},
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
</script>

<Modal
	bind:open
	modalHeading={image.id == null ? 'Upload Images' : 'Edit Images'}
	primaryButtonText={image.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput
			invalid={$errors.title != null}
			name="title"
			labelText="Title"
			placeholder="Enter Title..."
		/>
		{#if $errors.title}
			<p class="t-text-red-500">{$errors.title}</p>
		{/if}
		<TextInput
			invalid={$errors.description != null}
			name="description"
			labelText="Description"
			placeholder="Enter Description..."
		/>
		{#if $errors.description}
			<p class="t-text-red-500">{$errors.description}</p>
		{/if}

		<Select selected={image.category} labelText="Course" name="category">
			<SelectItem text="choose Course" />
			<SelectItem value="1" text="Meeting" />
			<SelectItem value="2" text="Orientation" />
			<SelectItem value="3" text="Training" />
			<SelectItem value="4" text="Seminar" />
			<SelectItem value="5" text="Workshop" />
		</Select>

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

	<!-- {JSON.stringify($data)} -->
	{JSON.stringify($errors)}
</Modal>
