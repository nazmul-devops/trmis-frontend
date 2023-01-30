<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCenters } from '$lib/store/trainingCenter';
	import { divisions } from '$lib/store/division';
	import { districts } from '$lib/store/district';
	import { subDistricts } from '$lib/store/sub-district';
	import { Modal, TextInput, Select, SelectItem } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

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
		setFields('division', trainingCenter.division);
		setFields('district', trainingCenter.district);
		setFields('sub_district', trainingCenter.sub_district);
		setFields('address', trainingCenter.address);
	}

	$: {
		if (trainingCenter.id != null) {
			setFormFields();
		}
	}

	const schema = yup.object({
		name: yup.string().required(),
		division: yup.number().required(),
		district: yup.number().required(),
		sub_district: yup.number().required(),
		address: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		transform: (values: any) => {
			return {
				...values,
				division: parseInt(values.division),
				district: parseInt(values.district),
				sub_district: parseInt(values.sub_district)
			};
		},
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
		divisions.getDivisions();
		districts.getDistricts();
		subDistricts.getSubDistricts();
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
		<Select invalid={$errors.division != null} name="division" labelText="Division">
			<SelectItem text="choose Division" />
			{#each $divisions.data as division}
				<SelectItem value={division.id} text={division.name} />
			{/each}
		</Select>
		<Select invalid={$errors.district != null} name="district" labelText="District">
			<SelectItem text="choose District" />
			{#each $districts.data as district}
				<SelectItem value={district.id} text={district.name} />
			{/each}
		</Select>
		<Select invalid={$errors.sub_district != null} name="sub_district" labelText="Sub District">
			<SelectItem text="choose Sub-district" />
			{#each $subDistricts.data as subDistrict}
				<SelectItem value={subDistrict.id} text={subDistrict.name} />
			{/each}
		</Select>
		<TextInput
			invalid={$errors.address != null}
			name="address"
			labelText="Address"
			placeholder="Enter Address..."
		/>

		<!-- {JSON.stringify($errors)} -->
	</form>
</Modal>
