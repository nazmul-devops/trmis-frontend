<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { createBatch, updateBatch } from '$lib/service/batch';
	import { coordinators } from '$lib/store/coordinators';
	import { organizations } from '$lib/store/organization';
	import { sourceOfFounds } from '$lib/store/source-of-found';
	import { getApprovedSchedules, getTrainingSchedules } from '$lib/service/trainingSchedule';
	import { createEventDispatcher } from 'svelte';
	import { Modal, TextInput, Select, SelectItem } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	let training_course_schedules: any = [];
	export let open = true;
	export let batch = {
		id: null,
		status: null,
		name: null,
		duration: null,
		initial_cost: null,
		final_cost: null,
		coordinator_id: null,
		organization_id: null,
		source_of_fund_id: null,
		training_course_schedule: null
	};

	function formSetFields() {
		setFields('status', batch.status);
		setFields('name', batch.name);
		setFields('duration', batch.duration);
		setFields('initial_cost', batch.initial_cost);
		setFields('final_cost', batch.final_cost);
		setFields('coordinator', batch.coordinator_id);
		setFields('organization', batch.organization_id);
		setFields('source_of_fund', batch.source_of_fund_id);
	}

	$: {
		if (batch.id != null) {
			formSetFields();
		} else {
			reset();
		}
	}

	$: {
		// console.log(training_course_schedules);
		// console.log(batch.training_course_schedule);
		console.log(training_course_schedules);
		if (batch.training_course_schedule && training_course_schedules.length > 0) {
			setData('training_course_schedule', 242);
		}
	}

	const schema = yup.object({
		status: yup.number().required(),
		name: yup.string().required(),
		duration: yup.number().required(),
		initial_cost: yup.number().required(),
		final_cost: yup.number(),
		coordinator: yup.number().required(),
		organization: yup.number().required(),
		source_of_fund: yup.number().required(),
		training_course_schedule: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setFields, setData, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				duration: values.duration ? parseInt(values.duration) : null,
				initial_cost: values.initial_cost ? parseInt(values.initial_cost) : null,
				final_cost: values.final_cost ? parseInt(values.final_cost) : null,
				status: parseInt(values.status),
				coordinator: parseInt(values.coordinator),
				organization: parseInt(values.organization),
				source_of_fund: parseInt(values.source_of_fund),
				training_course_schedule: parseInt(values.training_course_schedule)
			};
		},
		extend: validator({ schema })
	});

	const dispatch = createEventDispatcher();

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (batch.id) {
				await updateBatch({ ...data, id: batch.id });
			} else {
				await createBatch({ ...data });
			}
			open = false;
			reset();
			dispatch('update-list');
		}
	});

	onMount(async () => {
		coordinators.getCoordinators();
		organizations.getOrganizations();
		sourceOfFounds.getSourceOfFounds();
		const { data } = await getApprovedSchedules();
		training_course_schedules = data; 
	});
</script>

<Modal
	bind:open
	modalHeading="Create Batch"
	primaryButtonText={batch.id == null ? 'Create' : 'Edit'}
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
		<Select invalid={$errors.status != null} name="status" labelText="Status">
			<SelectItem text="choose status" value="" />
			<SelectItem text="Pending" value="1" />
			<SelectItem text="In Progress" value="2" />
			<SelectItem text="Completed" value="3" />
			<SelectItem text="Rejected" value="4" />
		</Select>
		<TextInput
			invalid={$errors.duration != null}
			name="duration"
			labelText="Duration"
			placeholder="Enter Duration..."
		/>
		<TextInput
			invalid={$errors.initial_cost != null}
			name="initial_cost"
			labelText="Initial Cost"
			placeholder="Enter Initial Cost..."
		/>
		<TextInput
			invalid={$errors.final_cost != null}
			name="final_cost"
			labelText="Final Cost"
			placeholder="Enter Final Cost..."
		/>
		<Select invalid={$errors.coordinator != null} name="coordinator" labelText="Coordinator">
			<SelectItem text="choose Coordinator" />
			{#each $coordinators.data as coordinator}
				<SelectItem value={coordinator.id} text={coordinator.name} />
			{/each}
		</Select>
		<Select invalid={$errors.organization != null} name="organization" labelText="Organization">
			<SelectItem text="choose Organization" />
			{#each $organizations.data as organization}
				<SelectItem value={organization.id} text={organization.name} />
			{/each}
		</Select>
		<Select
			invalid={$errors.source_of_fund != null}
			name="source_of_fund"
			labelText="Source Of Fund"
		>
			<SelectItem text="choose Source Of Fund" />
			{#each $sourceOfFounds.data as sof}
				<SelectItem value={sof.id} text={sof.name} />
			{/each}
		</Select>
		<Select
			invalid={$errors.training_course_schedule != null}
			name="training_course_schedule"
			labelText="Training Schedule"
		>
			<SelectItem text="choose Schedule" />
			{#each training_course_schedules as Schedule}
				<SelectItem value={Schedule.value} text={Schedule.title} />
			{/each}
		</Select>

		<!-- <p>{JSON.stringify($errors)}</p>
		<p>{JSON.stringify($data)}</p> -->
	</form>
</Modal>
