<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { users } from '$lib/store/users';
	import { groupsList } from '$lib/store/group';
	import { Modal, TextInput, Checkbox, MultiSelect } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let user = {
		id: null,
		username: null,
		first_name: null,
		last_name: null,
		email: null,
		is_staff: null,
		is_superuser: null,
		groups: []
	};

	let Groups = [];

	$: {
		Groups = user.groups ? user.groups : [];
	}

	$: {
		setData('username', user.username);
		setData('first_name', user.first_name);
		setData('last_name', user.last_name);
		setData('email', user.email);
		setData('is_staff', user.is_staff);
		setData('is_superuser', user.is_superuser);
		setData('groups', Groups);
	}

	const schema = yup.object({
		username: yup.string().required(),
		email: yup.string().email().required(),
		first_name: yup.string(),
		last_name: yup.string(),
		is_staff: yup.boolean(),
		is_superuser: yup.boolean(),
		groups: yup.array().min(1)
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (user.id) {
				await users.updateUser({ ...data, id: user.id });
			} else {
				await users.createUser({ ...data });
			}
			open = false;
			reset();
		}
	});

	export let open = true;

	onMount(async () => {
		users.getUsers();
		groupsList.getGroups();
	});
</script>

<Modal
	bind:open
	modalHeading="Edit User"
	primaryButtonText={user.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput
			invalid={$errors.username != null}
			bind:value={user.username}
			name="username"
			labelText=" User Name"
			placeholder="Enter username..."
		/>
		<TextInput
			invalid={$errors.first_name != null}
			bind:value={user.first_name}
			name="first_name"
			labelText="First Name"
			placeholder="Enter  name..."
		/>
		<TextInput
			invalid={$errors.last_name != null}
			bind:value={user.last_name}
			name="last_name"
			labelText="Last Name"
			placeholder="Enter  name..."
		/>
		<TextInput
			invalid={$errors.email != null}
			bind:value={user.email}
			name="email"
			labelText=" Email"
			placeholder="Enter  name..."
		/>
		<Checkbox bind:checked={user.is_staff} name="is_staff" labelText="Is Staff?" />
		<Checkbox name="is_superuser" labelText="Is Super User?" />
		<MultiSelect
			selectedIds={Groups}
			titleText="Groups"
			label="Select Group..."
			items={$groupsList.data.map((item) => ({ ...item, text: item.name }))}
			on:select={(e) => setData('groups', e.detail.selectedIds)}
		/>

		<p>{JSON.stringify($errors)}</p>
	</form>
</Modal>
