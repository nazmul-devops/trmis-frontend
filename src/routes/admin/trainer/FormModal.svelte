<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainers } from '$lib/store/trainer';
	import { designations } from '$lib/store/designations';
	import { organizations } from '$lib/store/organization';
	import { getLocations } from '$lib/service/locations';
	import { Modal, TextInput, Select, SelectItem, ComboBox } from 'carbon-components-svelte';
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
		if (selectedUpazilaId) {
			setFields('sub_district', selectedUpazilaId);
		} else {
			setFields('sub_district', null);
		}
	}

	export let open = true;
	export let trainer = {
		id: null,
		phone: null,
		name: null,
		nid: null,
		email: null,
		gender: null,
		marital_status: null,
		area_of_specialization: null,
		address: null,
		designation: null,
		organization: null,
		division: null,
		district: null,
		sub_district: null
	};

	function formSetFields() {
		setFields('name', trainer.name);
		setFields('phone', trainer.phone);
		setFields('nid', trainer.nid);
		setFields('email', trainer.email);
		setFields('gender', trainer.gender);
		setFields('marital_status', trainer.marital_status);
		setFields('area_of_specialization', trainer.area_of_specialization);
		setFields('address', trainer.address);
		setFields('designation', trainer.designation);
		setFields('organization', trainer.organization);
		selectedDivisionId = trainer.division;
		selectedZilaId = trainer.district;
		selectedUpazilaId = trainer.sub_district;
	}

	$: {
		if (trainer.id != null) {
			formSetFields();
		} else {
			reset();
		}
	}

	const schema = yup.object({
		phone: yup.number().required(),
		nid: yup.number().required(),
		email: yup.string().email().required(),
		gender: yup.number().required(),
		address: yup.string().required(),
		designation: yup.number().required(),
		organization: yup.number().required(),
		area_of_specialization: yup.string().required(),
		division: yup.number().required(),
		district: yup.number().required(),
		sub_district: yup.number().required(),
		marital_status: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				phone: values.phone ? parseInt(values.phone) : null,
				nid: values.phone ? parseInt(values.nid) : null,
				gender: parseInt(values.gender),
				designation: parseInt(values.designation),
				organization: parseInt(values.organization),
				division: parseInt(values.division),
				district: parseInt(values.gender),
				sub_district: parseInt(values.sub_district),
				marital_status: parseInt(values.marital_status)
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (trainer.phone) {
				await trainers.updateTrainer({ ...data, id: trainer.phone });
			} else {
				await trainers.createTrainer({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		trainers.getTrainers();
		designations.getDesignations();
		organizations.getOrganizations();
	});
</script>

<Modal
	bind:open
	modalHeading={trainer.id == null ? "Create Resources Person" : "Edit Resources Person"}
	primaryButtonText={trainer.id == null ? 'Create' : 'Edit'}
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
		<TextInput
			invalid={$errors.phone != null}
			name="phone"
			labelText="Phone"
			placeholder="Enter  Phone..."
		/>
		<TextInput
			invalid={$errors.nid != null}
			name="nid"
			labelText="NID"
			placeholder="Enter  NID No..."
		/>
		<TextInput
			invalid={$errors.email != null}
			name="email"
			labelText="Email"
			placeholder="Enter  Email..."
		/>
		<TextInput
			invalid={$errors.area_of_specialization != null}
			name="area_of_specialization"
			labelText="Area Of Specialization"
			placeholder="Enter Specialization..."
		/>
		<Select invalid={$errors.gender != null} name="gender" labelText="Gender">
			<SelectItem text="choose Gender" value="" />
			<SelectItem text="Male" value="1" />
			<SelectItem text="Female" value="2" />
			<SelectItem text="Other" value="3" />
		</Select>
		<TextInput
			invalid={$errors.address != null}
			name="address"
			labelText="Address"
			placeholder="Enter address..."
		/>
		<Select
			invalid={$errors.marital_status != null}
			name="marital_status"
			labelText="Material Status"
		>
			<SelectItem text="choose Material Status" />
			<SelectItem text="Married" value="1" />
			<SelectItem text="UnMarried" value="2" />
		</Select>
		<Select invalid={$errors.designation != null} name="designation" labelText="Designation">
			<SelectItem text="choose Designation" />
			{#each $designations.data as designation}
				<SelectItem value={designation.id} text={designation.name} />
			{/each}
		</Select>
		<Select invalid={$errors.organization != null} name="organization" labelText="Organization">
			<SelectItem text="choose Organization" />
			{#each $organizations.data as organization}
				<SelectItem value={organization.id} text={organization.name} />
			{/each}
		</Select>
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

		<p>{JSON.stringify($data)}</p>
		<p>{JSON.stringify($errors)}</p>
	</form>
</Modal>
