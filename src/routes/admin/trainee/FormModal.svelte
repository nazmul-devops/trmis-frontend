<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainees } from '$lib/store/trainee';
	import { designations } from '$lib/store/designations';
	import { organizations } from '$lib/store/organization';
	import { getLocations } from '$lib/service/locations';
	import { MATERIAL_STATUS } from '$lib/constants';
	import { Modal, TextInput, ComboBox } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { sleep } from '$lib/service/utilities';

	let zilaOptions = [];
	let upazilaOptions = [];
	let locations = [];

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	$: {
		getLocations().then((resp) => {
			locations = resp.data;
		});
	}

	$: {
		if ($data.division) {
			let index = locations.findIndex((item) => item.id === $data.division);
			zilaOptions = locations[index]?.zilas;
		} else {
			zilaOptions = [];
		}
	}

	$: {
		if ($data.district) {
			let index = zilaOptions.findIndex((item) => item.id === $data.district);
			if (index >= 0) {
				upazilaOptions = zilaOptions[index]?.upazilas;
			} else {
				upazilaOptions = [];
			}
		} else {
			upazilaOptions = [];
		}
	}

	export let open = true;
	export let trainee = {
		id: null,
		phone: null,
		name: null,
		nid: null,
		email: null,
		gender: null,
		marital_status: null,
		designation: null,
		organization: null,
		division: null,
		address: null,
		district: null,
		sub_district: null
	};

	$: {
		if (trainee.id != null) {
			setData('name', trainee.name);
			setData('phone', trainee.phone);
			setData('nid', trainee.nid);
			setData('email', trainee.email);
			setData('gender', trainee.gender);
			setData('marital_status', trainee.marital_status);
			setData('designation', trainee.designation);
			setData('organization', trainee.organization);
			setData('address', trainee.address);

			sleep(0)
				.then(() => {
					setData('division', trainee.division);
					return sleep(100);
				})
				.then(() => {
					setData('district', trainee.district);
					return sleep(100);
				})
				.then(() => {
					setData('sub_district', trainee.sub_district);
				});
		} else {
			reset();
		}
	}

	const schema = yup.object({
		phone: yup.number().typeError('Phone number is required!').required(),
		nid: yup
			.number()
			.required()
			.min(1000000000, 'Enter a Valid NID')
			.max(9999999999, 'Enter a Valid NID')
			.typeError('NID is required!'),
		email: yup.string().email().required(),
		gender: yup.number().required().typeError('Select Gender'),
		designation: yup.number().required().typeError('Select Designation'),
		organization: yup.number().required().typeError('Select Organization'),
		division: yup.number().required().typeError('Select Division'),
		address: yup.string().required(),
		district: yup.number().required().typeError('Select District'),
		sub_district: yup.number().required().typeError('Select Sub District'),
		marital_status: yup.number().required().typeError('Select Material Status')
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				phone: values.phone ? parseInt(values.phone) : null,
				nid: values.nid ? parseInt(values.nid) : null
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (trainee.phone) {
				await trainees.updateTrainee({ ...data, id: trainee.phone });
			} else {
				await trainees.createTrainee({ ...data });
			}
			open = false;
			reset();
		}
	});

	$: Organizations = $organizations.data.map((item) => ({ ...item, text: item.name }));
	$: Designations = $designations.data.map((item) => ({ ...item, text: item.name }));

	function Cancel() {
		open = false;
		reset();
	}

	onMount(async () => {
		trainees.getTrainees();
		designations.getDesignations();
		organizations.getOrganizations();
	});
</script>

<Modal
	bind:open
	modalHeading={trainee.id == null ? 'Create Participant' : 'Edit Participant'}
	primaryButtonText={trainee.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={Cancel}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput
			bind:value={$data.name}
			invalid={$errors.name != null}
			name="name"
			labelText="Name"
			placeholder="Enter Name..."
		/>
		{#if $errors.name}
			<p class=" t-text-red-500 ">{$errors.name}</p>
		{/if}
		<TextInput
			bind:value={$data.phone}
			invalid={$errors.phone != null}
			name="phone"
			labelText="Phone"
			placeholder="Enter  Phone..."
		/>
		{#if $errors.phone}
			<p class=" t-text-red-500 ">{$errors.phone}</p>
		{/if}
		<TextInput
			bind:value={$data.nid}
			invalid={$errors.nid != null}
			name="nid"
			labelText="NID"
			placeholder="Enter  NID No..."
		/>
		{#if $errors.nid}
			<p class=" t-text-red-500 ">{$errors.nid}</p>
		{/if}
		<TextInput
			bind:value={$data.email}
			invalid={$errors.email != null}
			name="email"
			labelText="Email"
			placeholder="Enter  Email..."
		/>
		{#if $errors.email}
			<p class=" t-text-red-500 ">{$errors.email}</p>
		{/if}
		<TextInput
			bind:value={$data.address}
			invalid={$errors.address != null}
			name="address"
			labelText="Address"
			placeholder="Enter  Address..."
		/>
		{#if $errors.address}
			<p class=" t-text-red-500 ">{$errors.address}</p>
		{/if}
		<ComboBox
			invalid={$errors.gender != null}
			bind:selectedId={$data.gender}
			titleText="Gender"
			placeholder="Select Gender"
			items={[
				{ id: 1, text: 'Male' },
				{ id: 2, text: 'Female' },
				{ id: 3, text: 'Other' }
			]}
			{shouldFilterItem}
		/>

		{#if $errors.gender}
			<p class=" t-text-red-500 ">{$errors.gender}</p>
		{/if}

		<ComboBox
			name="marital_status"
			invalid={$errors.marital_status != null}
			bind:selectedId={$data.marital_status}
			titleText="Material Status"
			placeholder="Select Material Status"
			items={MATERIAL_STATUS}
		/>

		{#if $errors.marital_status}
			<p class=" t-text-red-500 ">{$errors.marital_status}</p>
		{/if}

		<ComboBox
			invalid={$errors.designation != null}
			bind:selectedId={$data.designation}
			titleText="Designations"
			placeholder="Select Designations"
			items={Designations}
			{shouldFilterItem}
		/>

		{#if $errors.designation}
			<p class=" t-text-red-500 ">{$errors.designation}</p>
		{/if}
		<ComboBox
			invalid={$errors.organization != null}
			bind:selectedId={$data.organization}
			titleText="Organizations"
			placeholder="Select Organizations"
			items={Organizations}
			{shouldFilterItem}
		/>
		{#if $errors.organization}
			<p class=" t-text-red-500 ">{$errors.organization}</p>
		{/if}

		<ComboBox
			name="division"
			invalid={$errors.division != null}
			bind:selectedId={$data.division}
			titleText="Division"
			placeholder="Select Division"
			items={locations}
			{shouldFilterItem}
		/>

		{#if $errors.division}
			<p class=" t-text-red-500 ">{$errors.division}</p>
		{/if}

		<ComboBox
			disabled={!$data.division}
			name="district"
			bind:selectedId={$data.district}
			titleText="Zila"
			placeholder="Select Zila"
			items={zilaOptions}
			{shouldFilterItem}
		/>
		<ComboBox
			disabled={!$data.district}
			name="sub_district"
			bind:selectedId={$data.sub_district}
			titleText="Upazila"
			placeholder="Select Upazila"
			items={upazilaOptions}
			{shouldFilterItem}
		/>

		<p>{JSON.stringify($data)}</p>
		<!-- <p>{JSON.stringify($errors)}</p> -->
	</form>
</Modal>
