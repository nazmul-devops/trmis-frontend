<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainees } from '$lib/store/trainee';
	import { designations } from '$lib/store/designations';
	import { grades } from '$lib/store/grades';
	import { organizations } from '$lib/store/organization';
	import { divisions } from '$lib/store/division';
	import { districts } from '$lib/store/district';
	import { subDistricts } from '$lib/store/sub-district';
	import {
		Modal,
		NumberInput,
		DatePickerInput,
		TextInput,
		Select,
		SelectItem,
		DatePicker
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let trainee = {
		id: null,
		phone: null,
		name: null,
		emg_phone: null,
		nid: null,
		email: null,
		gender: null,
		marital_status: null,
		dob: null,
		designation: null,
		grade: null,
		organization: null,
		division: null,
		address: null,
		district: null,
		sub_district: null
	};

	function formSetFields() {
		setFields('name', trainee.name);
		setFields('phone', trainee.phone);
		setFields('emg_phone', trainee.emg_phone);
		setFields('nid', trainee.nid);
		setFields('email', trainee.email);
		setFields('gender', trainee.gender);
		setFields('marital_status', trainee.marital_status);
		setFields('dob', trainee.dob);
		setFields('designation', trainee.designation);
		setFields('grade', trainee.grade);
		setFields('organization', trainee.organization);
		setFields('division', trainee.division);
		setFields('address', trainee.address);
		setFields('district', trainee.district);
		setFields('sub_district', trainee.sub_district);
	}

	$: {
		if (trainee.id != null) {
			formSetFields();
		}
	}

	const schema = yup.object({
		phone: yup.number().required(),
		emg_phone: yup.number().required(),
		nid: yup.number().required(),
		email: yup.string().email().required(),
		gender: yup.number().required(),
		dob: yup.string().required(),
		designation: yup.number().required(),
		grade: yup.number().required(),
		organization: yup.number().required(),
		division: yup.number().required(),
		address: yup.string().required(),
		district: yup.number().required(),
		sub_district: yup.number().required(),
		marital_status: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				phone: values.phone ? parseInt(values.phone) : null,
				emg_phone: values.phone ? parseInt(values.emg_phone) : null,
				nid: values.phone ? parseInt(values.nid) : null,
				gender: parseInt(values.gender),
				designation: parseInt(values.designation),
				grade: parseInt(values.grade),
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
			if (trainee.phone) {
				await trainees.updateTrainee({ ...data, id: trainee.phone });
			} else {
				await trainees.createTrainee({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		// trainees.getTrainees();
		// designations.getDesignations();
		// grades.getGrades();
		// organizations.getOrganizations();
		// divisions.getDivisions();
		// districts.getDistricts();
		// subDistricts.getSubDistricts();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Trainee"
	primaryButtonText={trainee.id == null ? 'Create' : 'Edit'}
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
			invalid={$errors.emg_phone != null}
			name="emg_phone"
			labelText="Emergency Phone "
			placeholder="Enter  Emergency Phone..."
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
			invalid={$errors.address != null}
			name="address"
			labelText="Address"
			placeholder="Enter  Address..."
		/>
		<Select invalid={$errors.gender != null} name="gender" labelText="Gender">
			<SelectItem text="choose Gender" value="" />
			<SelectItem text="Male" value="1" />
			<SelectItem text="Female" value="2" />
			<SelectItem text="Other" value="3" />
		</Select>
		<DatePicker
			bind:value={$data.dob}
			name="dob"
			dateFormat="Y-m-d"
			datePickerType="single"
			on:change
		>
			<DatePickerInput
				invalid={$errors.dob != null}
				labelText="Date Of Birth"
				placeholder="YYYY-mm-dd"
			/>
		</DatePicker>

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
		<Select invalid={$errors.grade != null} name="grade" labelText="Grade">
			<SelectItem text="choose Grade" />
			{#each $grades.data as grade}
				<SelectItem value={grade.id} text={grade.name} />
			{/each}
		</Select>
		<Select invalid={$errors.organization != null} name="organization" labelText="Organization">
			<SelectItem text="choose Organization" />
			{#each $organizations.data as organization}
				<SelectItem value={organization.id} text={organization.name} />
			{/each}
		</Select>
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
			<SelectItem text="choose Sub District" />
			{#each $subDistricts.data as subDistrict}
				<SelectItem value={subDistrict.id} text={subDistrict.name} />
			{/each}
		</Select>

		<!-- <p>{JSON.stringify($errors)}</p> -->
	</form>
</Modal>
