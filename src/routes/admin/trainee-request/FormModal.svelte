<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { traineeRequests } from '$lib/store/trainee-request';
	import { designations } from '$lib/store/designations';
	import { organizations } from '$lib/store/organization';
	import { getLocations } from '$lib/service/locations';
	import { Modal, TextInput, ComboBox, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { sleep } from '$lib/service/utilities';

	export let open = false;

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

	export let traineeRequest = {
		id: null,
		phone: null,
		name: null,
		nid: null,
		email: null,
		gender: null,
		marital_status: null,
		designation: null,
		organization: null,
		remarks: null,
		division: null,
		address: null,
		status: null,
		district: null,
		sub_district: null
	};

	$: {
		setData('name', traineeRequest.name);
		setData('phone', traineeRequest.phone);
		setData('nid', traineeRequest.nid);
		setData('email', traineeRequest.email);
		setData('gender', traineeRequest.gender);
		setData('status', traineeRequest.status);
		setData('marital_status', traineeRequest.marital_status);
		setData('designation', traineeRequest.designation);
		setData('organization', traineeRequest.organization);
		setData('remarks', traineeRequest.remarks);
		setData('address', traineeRequest.address);

		sleep(0)
			.then(() => {
				setData('division', traineeRequest.division);
				return sleep(100);
			})
			.then(() => {
				setData('district', traineeRequest.district);
				return sleep(100);
			})
			.then(() => {
				setData('sub_district', traineeRequest.sub_district);
			});
	}

	const schema = yup.object({
		phone: yup.number().typeError('Phone number is required!').required(),
		nid: yup
			.number()
			.required()
			.min(1000000000, 'Enter A Valid NID')
			.max(9999999999, 'Enter A Valid NID')
			.typeError('NID is required!'),
		email: yup.string().email().required(),
		gender: yup.number().required().typeError('Select Gender'),
		designation: yup.number().required().typeError('Select Designation'),
		organization: yup.number().required().typeError('Select Organization'),
		remarks: yup.string().required(),
		division: yup.number().required().typeError('Select Division'),
		address: yup.string().nullable(),
		district: yup.number().required().typeError('Select District'),
		sub_district: yup.number().required().typeError('Select Sub District')
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
			await traineeRequests.updateTrainee_Request({ ...data, id: traineeRequest.id });
			open = false;
			reset();
		}
	});

	$: Organizations = $organizations.data.map((item) => ({ ...item, text: item.name }));
	$: Designations = $designations.data.map((item) => ({ ...item, text: item.name }));

	onMount(async () => {
		traineeRequests.getTrainee_Requests();
		designations.getDesignations();
		organizations.getOrganizations();
	});
</script>

<Modal
	bind:open
	modalHeading="Edit Details"
	primaryButtonText="Edit"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<div class=" ">
		<form use:form>
			<div class="t-grid t-grid-cols-2 t-gap-4">
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
					bind:value={$data.remarks}
					invalid={$errors.remarks != null}
					name="remarks"
					labelText="Remarks"
					placeholder="Remarks"
				/>
				{#if $errors.nid}
					<p class=" t-text-red-500 ">{$errors.remarks}</p>
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
					invalid={$errors.status != null}
					bind:selectedId={$data.status}
					titleText="Status"
					placeholder="Select Status"
					items={[
						{ id: 1, text: 'Pending' },
						{ id: 2, text: 'Approved' },
						{ id: 3, text: 'Reject' }
					]}
					{shouldFilterItem}
				/>

				{#if $errors.gender}
					<p class=" t-text-red-500 ">{$errors.gender}</p>
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
			</div>
			<!-- <p>{JSON.stringify($data)}</p> -->
			<!-- <p>{JSON.stringify($errors)}</p> -->
		</form>
	</div>
</Modal>
