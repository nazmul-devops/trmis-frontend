<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { traineeRequests } from '$lib/store/trainee-request';
	import { designations } from '$lib/store/designations';
	import { organizations } from '$lib/store/organization';
	import { getLocations } from '$lib/service/locations';
	import { MATERIAL_STATUS } from '$lib/constants';
	import { Modal, TextInput, ComboBox, Button } from 'carbon-components-svelte';
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

	// export let traineeRequest = {
	// 	id: null,
	// 	phone: null,
	// 	name: null,
	// 	nid: null,
	// 	email: null,
	// 	gender: null,
	// 	marital_status: null,
	// 	designation: null,
	// 	organization: null,
	// 	division: null,
	// 	address: null,
	// 	district: null,
	// 	sub_district: null
	// };

	const schema = yup.object({
		phone: yup.string().typeError('Phone number is required!').required(),
		nid: yup.string().required().typeError('NID is required!'),
		email: yup.string().email().required(),
		gender: yup.number().required().typeError('Select Gender'),
		designation: yup.number().required().typeError('Select Designation'),
		organization: yup.number().required().typeError('Select Organization'),
		// area_of_specialization: yup.string().required(),
		division: yup.number().required().typeError('Select Division'),
		address: yup.string().required(),
		district: yup.number().required().typeError('Select District'),
		sub_district: yup.number().required().typeError('Select Sub District')
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await traineeRequests.createTrainee_Request({ ...data });
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

<div class=" t-mx-[100px] t-my-[40px] ">
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div>
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
			</div>
			<div>
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
			</div>
			<div>
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
			</div>
			<div>
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
			</div>
			<div>
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
			</div>
			<!-- <TextInput
				bind:value={$data.area_of_specialization}
				invalid={$errors.area_of_specialization != null}
				name="area_of_specialization"
				labelText="Specialization"
				placeholder="Enter Area Of Specializayion..."
			/>
			{#if $errors.area_of_specialization}
				<p class=" t-text-red-500 ">{$errors.area_of_specialization}</p>
			{/if} -->
			<div>
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
			</div>

			<div>
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
			</div>
			<div>
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
			</div>

			<div>
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
			</div>

			<div>
				<ComboBox
					disabled={!$data.division}
					name="district"
					bind:selectedId={$data.district}
					titleText="Zila"
					placeholder="Select Zila"
					items={zilaOptions}
					{shouldFilterItem}
				/>
			</div>
			<div>
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
		</div>
		<div class=" t-flex t-gap-2 t-my-5 ">
			<Button kind="danger">cancel</Button>
			<Button on:click={submitHandler}>Submit</Button>
		</div>
		<!-- <p>{JSON.stringify($data)}</p> -->
		<!-- <p>{JSON.stringify($errors)}</p> -->
	</form>
</div>
