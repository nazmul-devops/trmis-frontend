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
		division: null,
		district: null,
		sub_district: null,
		address: null
	};

	$: {
		if (trainingCenter.id != null) {
			setData('name', trainingCenter.name);
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
		name: yup.string().required(),
		division: yup.number().required(),
		district: yup.number().required(),
		sub_district: yup.number().required(),
		address: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (trainingCenter.id) {
				await trainingCenters.updateTrainingCenter({ ...data, id: trainingCenter.id });
			} else {
				await trainingCenters.createTrainingCenter({ ...data });
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
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
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
		<ComboBox
			bind:selectedId={$data.division}
			titleText="Division"
			placeholder="Select Division"
			items={locations}
			{shouldFilterItem}
		/>
		<ComboBox
			disabled={!$data.division}
			bind:selectedId={$data.district}
			titleText="Zila"
			placeholder="Select Zila"
			items={zilaOptions}
			{shouldFilterItem}
		/>
		<ComboBox
			disabled={!$data.district}
			bind:selectedId={$data.sub_district}
			titleText="Upazila"
			placeholder="Select Upazila"
			items={upazilaOptions}
			{shouldFilterItem}
		/>
		<TextInput
			bind:value={$data.address}
			disabled={!$data.sub_district}
			invalid={$errors.address != null}
			name="address"
			labelText="Address"
			placeholder="Enter Address..."
		/>
	</form>
</Modal>
