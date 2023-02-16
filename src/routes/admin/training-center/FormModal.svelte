<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCenters } from '$lib/store/trainingCenter';
	import { getLocations } from '$lib/service/locations';
	import { Modal, TextInput, ComboBox } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	let selectedDivisionId;
	let selectedZilaId;
	let selectedUpazilaId;

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
		if (selectedZilaId) {
			let index = zilaOptions.findIndex((item) => item.id === selectedZilaId);
			upazilaOptions = zilaOptions[index]?.upazilas;
			setFields('district', selectedZilaId);
		} else {
			upazilaOptions = [];
			selectedUpazilaId = null;
			setFields('district', null);
		}
	}

	$: {
		if (selectedDivisionId) {
			let index = locations.findIndex((item) => item.id === selectedDivisionId);
			zilaOptions = locations[index]?.zilas;
			setFields('division', selectedDivisionId);
		} else {
			zilaOptions = [];
			selectedZilaId = null;
			setFields('division', null);
		}
	}

	$: {
		if (selectedUpazilaId) {
			setFields('sub_district', selectedUpazilaId);
		} else {
			setFields('sub_district', null);
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

	function setFormFields() {
		setFields('name', trainingCenter.name);
		// setFields('division', trainingCenter.division);
		selectedDivisionId = trainingCenter.division;
		selectedZilaId = trainingCenter.district;
		selectedUpazilaId = trainingCenter.sub_district;
		setFields('address', trainingCenter.address);
	}

	$: {
		if (trainingCenter.id != null) {
			setFormFields();
		} else {
			setFields('name', null);
			// selectedDivisionId = null;
			// selectedZilaId = null;
			// selectedUpazilaId = null;
			// setFields('division', null);
			// setFields('district', null);
			// setFields('sub_district', null);
			setFields('address', null);
		}
	}

	const schema = yup.object({
		name: yup.string().required(),
		division: yup.number().required(),
		district: yup.number().required(),
		sub_district: yup.number().required(),
		address: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
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
	modalHeading="Create Training Center"
	primaryButtonText={trainingCenter.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput
			invalid={$errors.name != null}
			name="name"
			labelText="Name"
			placeholder="Enter Name..."
		/>
		<ComboBox
			bind:selectedId={selectedDivisionId}
			titleText="Division"
			placeholder="Select Division"
			items={locations}
			{shouldFilterItem}
		/>
		<ComboBox
			disabled={!selectedDivisionId}
			bind:selectedId={selectedZilaId}
			titleText="Training District"
			placeholder="Select District"
			items={zilaOptions}
			{shouldFilterItem}
		/>
		<ComboBox
			disabled={!selectedZilaId}
			bind:selectedId={selectedUpazilaId}
			titleText="Training Sub-District"
			placeholder="Select Sub District"
			items={upazilaOptions}
			{shouldFilterItem}
		/>
		<TextInput
			disabled={!selectedUpazilaId}
			invalid={$errors.address != null}
			name="address"
			labelText="Address"
			placeholder="Enter Address..."
		/>

		{JSON.stringify($data)}
	</form>
</Modal>
