<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { batchs } from '$lib/store/batch';
	import { coordinators } from '$lib/store/coordinators';
	import { organizations } from '$lib/store/organization';
	import { sourceOfFounds } from '$lib/store/source-of-found';
	import { getApprovedSchedules } from '$lib/service/trainingSchedule';
	import { Modal, TextInput, ComboBox } from 'carbon-components-svelte';
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
		training_course_schedule_id: null
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
		setFields('training_course_schedule', batch.training_course_schedule_id);
	}

	$: {
		if (batch.id != null) {
			formSetFields();
		} else {
			reset();
		}
	}

	const schema = yup.object({
		status: yup.number().required().typeError('Status is required.'),
		name: yup.string().required().typeError('Name is required.'),
		duration: yup.number().required().typeError('Duration is required.'),
		initial_cost: yup.number().required().typeError('Initial cost is required.'),
		final_cost: yup.number(),
		coordinator: yup.number().required().typeError('Coordinator is required.'),
		organization: yup.number().required().typeError('Organization is required.'),
		source_of_fund: yup.number().required().typeError('Source of fund is required.'),
		training_course_schedule: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setFields, setData, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				duration: values.duration ? parseInt(values.duration) : null,
				initial_cost: values.initial_cost ? parseInt(values.initial_cost) : null,
				final_cost: values.final_cost ? parseInt(values.final_cost) : null
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (batch.id) {
				await batchs.updateBatch({ ...data, id: batch.id });
			} else {
				await batchs.createBatch({ ...data });
			}
			open = false;
			reset();
		}
	});

	$: coordinatorsList = $coordinators.data.map((item) => ({ ...item, text: item.name }));
	$: organizationsList = $organizations.data.map((item) => ({ ...item, text: item.name }));
	$: sourceOfFundList = $sourceOfFounds.data.map((item) => ({ ...item, text: item.name }));
	$: trainingScheduleList = training_course_schedules.map((item) => ({
		...item,
		id: item.value,
		text: item.title
	}));

	$: {
		console.log(batch);
	}

	onMount(async () => {
		batchs.getBatches();
		coordinators.getCoordinators();
		organizations.getOrganizations();
		sourceOfFounds.getSourceOfFounds();
		const { data } = await getApprovedSchedules();
		training_course_schedules = data;
	});
</script>

<Modal
	bind:open
	modalHeading={batch.id == null ? 'Create Batch' : 'Edit Batch'}
	primaryButtonText={batch.id == null ? 'Create' : 'Edit'}
	preventCloseOnClickOutside
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div>
				<TextInput
					invalid={$errors.name != null}
					invalidText={$errors.name}
					name="name"
					labelText="Name"
					placeholder="Enter Name..."
				/>
			</div>
			<div>
				<ComboBox
					name="status"
					invalid={$errors.status != null}
					invalidText={$errors.status}
					titleText="Status"
					placeholder="Choose Status"
					bind:selectedId={$data.status}
					items={[
						{ id: 1, text: 'Pending' },
						{ id: 2, text: 'In Progress' },
						{ id: 3, text: 'Completed' }
					]}
				/>
			</div>
			<div>
				<TextInput
					invalid={$errors.duration != null}
					invalidText={$errors.duration}
					name="duration"
					labelText="Duration"
					placeholder="Enter Duration..."
				/>
			</div>
			<div>
				<TextInput
					invalid={$errors.initial_cost != null}
					invalidText={$errors.initial_cost}
					name="initial_cost"
					labelText="Initial Cost"
					placeholder="Enter Initial Cost..."
				/>
			</div>
			<div>
				<TextInput
					invalid={$errors.final_cost != null}
					invalidText={$errors.final_cost}
					name="final_cost"
					labelText="Final Cost"
					placeholder="Enter Final Cost..."
				/>
			</div>
			<div>
				<ComboBox
					invalid={$errors.coordinator != null}
					invalidText={$errors.coordinator}
					name="coordinator"
					titleText="Coordinator"
					placeholder="Choose Coordinator"
					bind:selectedId={$data.coordinator}
					items={coordinatorsList}
				/>
			</div>
			<div>
				<ComboBox
					invalid={$errors.organization != null}
					invalidText={$errors.organization}
					direction="top"
					name="organization"
					titleText="Organization"
					placeholder="Choose Organization"
					bind:selectedId={$data.organization}
					items={organizationsList}
				/>
			</div>
			<div>
				<ComboBox
					invalid={$errors.source_of_fund != null}
					invalidText={$errors.source_of_fund}
					direction="top"
					name="source_of_fund"
					titleText="Source Of Fund"
					placeholder="Choose Source Of Fund"
					bind:selectedId={$data.source_of_fund}
					items={sourceOfFundList}
				/>
			</div>
			<div>
				<ComboBox
					invalid={$errors.training_course_schedule != null}
					invalidText={$errors.training_course_schedule}
					direction="top"
					name="training_course_schedule"
					titleText="Training Schedule"
					placeholder="Choose Schedule"
					bind:selectedId={$data.training_course_schedule}
					items={trainingScheduleList}
				/>
			</div>
			<!-- <p>{JSON.stringify($errors)}</p> -->
			<!-- <p>{JSON.stringify($data)}</p> -->
		</div>
	</form>
</Modal>
