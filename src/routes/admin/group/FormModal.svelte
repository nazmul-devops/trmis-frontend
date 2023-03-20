<script>
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { permissions } from '$lib/store/permission';
	import { groupsList } from '$lib/store/group';
	import { Modal, MultiSelect, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let group = {
		id: null,
		name: null,
		permissions: []
	};
	let groups = [];

	$: {
		groups = group.permissions ? group.permissions.map((item) => item.permission) : [];
	}

	$: {
		setData('name', group.name);
		setData('permissions', groups);
	}

	const schema = yup.object({
		name: yup.string().required(),
		permissions: yup.array().min(1)
	});

	const { reset, createSubmitHandler, setData, errors, data } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (group.id) {
				await groupsList.updateGroup({ ...data, id: group.id });
			} else {
				await groupsList.createGroup({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		permissions.getPermissions();
		groupsList.getGroups();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Group"
	primaryButtonText={group.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<TextInput bind:value={group.name} labelText="Name" placeholder="Enter Name" />
	<MultiSelect
		selectedIds={groups}
		titleText="Prerequisite"
		label="Select Prerequisite..."
		items={$permissions.data.map((item) => ({ ...item, id: item.value, text: item.title }))}
		on:select={(e) => setData('permissions', e.detail.selectedIds)}
	/>
	<!-- {JSON.stringify($data)} -->
</Modal>
