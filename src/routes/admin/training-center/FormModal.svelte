<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCenters } from '$lib/store/trainingCenter';
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
			if (index >= 0) {
				zilaOptions = locations[index]?.zilas;
			} else {
				zilaOptions = [];
			}
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
	export let trainingCenter = {
		id: null,
		name: null,
		latitude: null,
		longitude: null,
		division: null,
		district: null,
		sub_district: null,
		address: null
	};

	$: {
		if (trainingCenter.id != null) {
			setData('name', trainingCenter.name);
			setData('latitude', trainingCenter.latitude);
			setData('longitude', trainingCenter.longitude);
			sleep(0)
				.then(() => {
					setData('division', trainingCenter.division);
					return sleep(100);
				})
				.then(() => {
					setData('district', trainingCenter.district);
					return sleep(100);
				})
				.then(() => {
					setData('sub_district', trainingCenter.sub_district);
					return sleep(100);
				})
				.then(() => {
					setData('address', trainingCenter.address);
					return sleep(100);
				});
		} else {
			reset();
		}
	}

	const schema = yup.object({
		name: yup.string().required("Training venue name is required."),
		latitude: yup.string().required("Latitude is required."),
		longitude: yup.string().required("Longtitude is required."),
		division: yup.number().required('Division is required.'),
		district: yup.number().required('Distric is required.'),
		sub_district: yup.number().required("Sub district is required."),
		address: yup.string().required('Address is required.')
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
		// transform(values : any) {
		// 	return{
		// 		...values,
		// 		latitude: values.latitude ? parseFloat(values.latitude) : null,
		// 		longitude: values.longitude ? parseFloat(values.longitude) : null,
		// 	}
		// },
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (trainingCenter.id) {
				await trainingCenters.updateTrainingCenter({ ...data, id: trainingCenter.id });
			} else {
				await trainingCenters.createTrainingCenter({
					...data
				});
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		trainingCenters.getTrainingCenters();
	});
</script>

<Modal
	bind:open
	modalHeading={trainingCenter.id == null ? 'Create Training Venue' : 'Edit Training Venue'}
	primaryButtonText={trainingCenter.id == null ? 'Create' : 'Edit'}
	preventCloseOnClickOutside
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
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
					<p>{$errors.name}</p>
				{/if}
			</div>
			<div>
				<ComboBox
					invalid={$errors.division != null}
					bind:selectedId={$data.division}
					titleText="Division"
					placeholder="Select Division"
					items={locations}
					{shouldFilterItem}
				/>
				{#if $errors.division}
					<p class="t-text-red-500 t-text-sm">{$errors.division}</p>
				{/if}
			</div>
			<div>
				<ComboBox
					invalid={$errors.district != null}
					disabled={!$data.division}
					bind:selectedId={$data.district}
					titleText="Zilla"
					placeholder="Select Zilla"
					items={zilaOptions}
					{shouldFilterItem}
				/>
				{#if $errors.district}
					<p class="t-text-red-500">{$errors.district}</p>
				{/if}
			</div>
			<div>
				<ComboBox
					invalid={$errors.sub_district != null}
					disabled={!$data.district}
					bind:selectedId={$data.sub_district}
					titleText="Upazilla"
					placeholder="Select Upazilla"
					items={upazilaOptions}
					{shouldFilterItem}
				/>
				{#if $errors.sub_district}
					<p class="t-text-red-500">{$errors.sub_district}</p>
				{/if}
			</div>
			<div class="t-col-span-2">
				<div>
					<TextInput
						bind:value={$data.address}
						disabled={!$data.sub_district}
						invalid={$errors.address != null}
						name="address"
						labelText="Address"
						placeholder="Enter Address..."
					/>
				</div>
				{#if $errors.address}
					<p class='t-text-red-500'>{$errors.address}</p>
				{/if}
			</div>
			<div>
				<TextInput
					bind:value={$data.latitude}
					invalid={$errors.latitude != null}
					name="latitude"
					labelText="Latitude"
					placeholder="Enter Latitude..."
				/>
				{#if $errors.latitude}
					<p class="t-text-red">{$errors.latitude}</p>
				{/if}
			</div>
			<div>
				<TextInput
					bind:value={$data.longitude}
					invalid={$errors.longitude != null}
					name="longitude"
					labelText="Longitude"
					placeholder="Enter Longitude..."
				/>
				{#if $errors.longitude}
					<p class="t-text-red-500">{$errors.longitude}</p>
				{/if}
			</div>
		</div>
	</form>

	<!-- {JSON.stringify($errors)} -->
</Modal>
