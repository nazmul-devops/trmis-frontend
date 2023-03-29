<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainees } from '$lib/store/trainee';
	import { designations } from '$lib/store/designations';
	import { organizations } from '$lib/store/organization';
	import { getLocations } from '$lib/service/locations';
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
		hris: null,
		name: null,
		nid: null,
		email: null,
		gender: null,
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
			setData('hris', trainee.hris);
			setData('email', trainee.email);
			setData('gender', trainee.gender);
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
		phone: yup
			.string()
			.matches(new RegExp(/^\+?(88)?0?1[3456789][0-9]{8}\b/), 'Not valid format')
			.required(),
		nid: yup
			.number()
			.min(1000000000, 'Enter A Valid NID')
			.max(9999999999, 'Enter A Valid NID')
			.nullable(),
		email: yup.string().email().nullable(),
		gender: yup.number().required().typeError('Select Gender'),
		hris: yup.number(),
		designation: yup.number().required().typeError('Select Designation'),
		organization: yup.number().required().typeError('Select Organization'),
		division: yup.number().required().typeError('Select Division'),
		address: yup.string().nullable(true),
		district: yup.number().required().typeError('Select District'),
		sub_district: yup.number().required().typeError('Select Sub District')
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				// hris: values.hris ? parseInt(values.hris) : null,
				nid: values.nid ? parseInt(values.nid) : null
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			const payload = {
				...data,
				address: data.address.length == 0 ? null : data.address
			};
			if (trainee.id) {
				await trainees.updateTrainee({...payload, id: trainee.id});
			} else {
				await trainees.createTrainee(payload);
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
	preventCloseOnClickOutside
	secondaryButtonText="Cancel"
	on:click:button--secondary={Cancel}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-2">
			<div class="t-col-span-2">
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
					bind:value={$data.hris}
					type="number"
					invalid={$errors.hris != null}
					name="hris"
					labelText="HRIS ID"
					placeholder="Enter HRIS ID.."
				/>
				<!-- {#if $errors.phone}
		<p class=" t-text-red-500 ">{$errors.hris}</p>
	{/if} -->
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
					type="number"
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
					labelText="Personal Address"
					placeholder="Enter Personal Address..."
				/>
				{#if $errors.address}
					<p class=" t-text-red-500 ">{$errors.address}</p>
				{/if}
			</div>
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
					titleText="Designation"
					placeholder="Select Designation"
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
					titleText="Organization"
					placeholder="Select Organization"
					items={Organizations}
					{shouldFilterItem}
				/>
				{#if $errors.organization}
					<p class=" t-text-red-500 ">{$errors.organization}</p>
				{/if}
			</div>
			<div class="t-col-span-2">
				<p class="t-text-2xl t-font-medium t-text-[#161616] t-py-2">Place of Posting</p>
			</div>
			<div>
				<ComboBox
					name="division"
					direction="top"
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
					direction="top"
					name="district"
					bind:selectedId={$data.district}
					titleText="Zilla"
					placeholder="Select Zilla"
					items={zilaOptions}
					{shouldFilterItem}
				/>
			</div>
			<div>
				<ComboBox
					disabled={!$data.district}
					direction="top"
					name="sub_district"
					bind:selectedId={$data.sub_district}
					titleText="Upazilla"
					placeholder="Select Upazilla"
					items={upazilaOptions}
					{shouldFilterItem}
				/>
			</div>
		</div>
		<!-- <p>{JSON.stringify($data)}</p> -->
		<p>{JSON.stringify($errors)}</p>
	</form>
</Modal>
