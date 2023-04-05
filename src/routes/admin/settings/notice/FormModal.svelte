<script lang="ts">
	import { onMount } from 'svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { notices } from '$lib/store/notice';
	import { Checkbox, FileUploader, Modal, TextInput } from 'carbon-components-svelte';
	import axios from 'axios';

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
		console.log(notice.files);
		axios.get(notice.files).then((resp) => {
			console.log(resp);
		});
	}

	$: {
		setData('files', files);
	}

	const schema = yup.object({
		title: yup.string().required('Title is required.'),
		description: yup.string().required('Description is required.'),
		files: yup.mixed().required(),
		expiration_date: yup.string().required('Expiration date is required.'),
		show_in_home_page: yup.boolean()
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
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
	preventCloseOnClickOutside
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div>
				<TextInput
					bind:value={$data.title}
					invalid={$errors.title != null}
					name="title"
					labelText="Title"
					placeholder="Enter Title..."
				/>
				{#if $errors.title}
					<p class="t-text-red-500">{$errors.title}</p>
				{/if}
			</div>
			<div>
				<TextInput
					bind:value={$data.description}
					invalid={$errors.description != null}
					name="description"
					labelText="Description"
					placeholder="Enter Description..."
				/>
				{#if $errors.description}
					<p class="t-text-red-500">{$errors.description}</p>
				{/if}
			</div>
			<div class="t-w-full">
				<label for="" class="t-text-[#525252] t-text-xs">Expiration Date</label> <br />
				<input
					class=" t-border-[1px] t-w-full t-mt-3 t-border-[#525252] t-text-[#525252] t-rounded-lg t-px-6 t-py-2 "
					type="datetime-local"
					id="birthdaytime"
					bind:value={$data.expiration_date}
					name="expiration_date"
				/>
				{#if $errors.expiration_date}
					<p class="t-text-red-500">{$errors.expiration_date}</p>
				{/if}
			</div>
			<div>
				<FileUploader
					bind:this={fileUploader}
					labelTitle="Upload file"
					buttonLabel="Add file"
					bind:files
					status="complete"
					type="file"
				/>
			</div>
		</div>
		<div class="t-mt-2">
			<Checkbox name="show_in_home_page" labelText=" Show Public Website ?" />
		</div>
	</form>
	<!-- {JSON.stringify($data)} -->
</Modal>
