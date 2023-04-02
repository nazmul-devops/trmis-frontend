<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { organizations } from '$lib/store/organization';
	import { coordinators } from '$lib/store/coordinators';
	import { trainers } from '$lib/store/trainer';
	import { sourceOfFounds } from '$lib/store/source-of-found';
	import { getEventSchedules } from '$lib/service/schedule-events';
	import {
		TextInput,
		TextArea,
		DataTable,
		Button,
		MultiSelect,
		ComboBox
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { createEvent } from '$lib/service/event';
	import { goto } from '$app/navigation';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	const schema = yup.object({
		status: yup.number().required(),
		name: yup.string().required(),
		number_of_participants: yup.number().required(),
		participants: yup.array().min(1),
		description: yup.string().required(),
		source_of_fund: yup.number().required(),
		expenditure: yup.number().nullable(),
		budget: yup.number().required(),
		type: yup.number().required(),
		organization: yup.number().required(),
		coordinator: yup.number().required(),
		schedule: yup.number().required(),
		facilitator: yup.array().min(1)
	});

	const { form, reset, createSubmitHandler, setFields, errors, data, setData } = createForm({
		initialValues: { facilitator: [] },
		transform: (values: any) => {
			return {
				...values,
				number_of_participants: values.number_of_participants
					? parseInt(values.number_of_participants)
					: null,
				budget: values.budget ? parseInt(values.budget) : null,
				status: parseInt(values.status),
				type: parseInt(values.type),
				organization: parseInt(values.organization),
				coordinator: parseInt(values.coordinator),
				schedule: parseInt(values.schedule),
				expenditure: values.expenditure ? parseInt(values.expenditure) : null
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await createEvent({ ...data });
			goto('/admin/event');
		}
	});

	let participantsList = [];
	let participantsName: any;
	let participantsPhone: any;
	let participantsEmail: any;

	function addParticipants() {
		participantsList = [
			...participantsList,
			{
				id: participantsList.length + 1,
				name: participantsName,
				phone: participantsPhone,
				email: participantsEmail
			}
		];
		participantsName = '';
		participantsPhone = '';
		participantsEmail = '';
		// participantsList = event.participants;
	}

	function deleteParticipants(id) {
		participantsList = participantsList.filter((item) => item.id != id);
	}

	$: {
		console.log(participantsList);
	}

	$: {
		setData('participants', participantsList);
	}

	let facilators = [];

	$: {
		setData('facilitator', facilators);
		console.log(facilators);
	}

	let eventSchedule = [];

	$: organizationsList = $organizations.data.map((item) => ({ ...item, text: item.name }));
	$: coordinatorList = $coordinators.data.map((item) => ({ ...item, text: item.name }));
	$: schedules = eventSchedule.map((item) => ({ ...item, text: item.event_venue_name }));
	$: sourceFunds = $sourceOfFounds.data.map((item) => ({ ...item, text: item.name }));

	onMount(async () => {
		organizations.getOrganizations();
		coordinators.getCoordinators();
		trainers.getTrainers();
		sourceOfFounds.getSourceOfFounds();
		const { data } = await getEventSchedules();
		eventSchedule = data;
	});
</script>

<h4 class="t-pb-4">Create Event</h4>
<form use:form>
	<div class="t-grid t-grid-cols-2 t-gap-4">
		<TextInput labelText="Name" name="name" placeholder="Enter Event Name" />
		<TextInput
			labelText="Number Of Participants"
			name="number_of_participants"
			placeholder="Number Of Participants"
		/>
		<TextInput labelText="Budget" name="budget" placeholder="Budget" />
		<ComboBox
			invalid={$errors.status != null}
			bind:selectedId={$data.status}
			titleText="Status"
			placeholder="Select Status"
			items={[
				{ id: 1, text: 'Pending' },
				{ id: 2, text: 'In progress' },
				{ id: 3, text: 'Completed' }
			]}
			{shouldFilterItem}
		/>

		<ComboBox
			invalid={$errors.type != null}
			bind:selectedId={$data.type}
			titleText="Type"
			placeholder="Choose Type"
			items={[
				{ id: 1, text: 'Meeting' },
				{ id: 2, text: 'Workshop' },
				{ id: 3, text: 'Orientation' },
				{ id: 4, text: 'Sensitization' }
			]}
			{shouldFilterItem}
		/>

		<ComboBox
			invalid={$errors.organization != null}
			bind:selectedId={$data.organization}
			titleText="Organization"
			placeholder="Choose Organnization"
			items={organizationsList}
			{shouldFilterItem}
		/>
		<ComboBox
			invalid={$errors.coordinator != null}
			bind:selectedId={$data.coordinator}
			titleText="Coordinator"
			placeholder="Choose Coordinator"
			items={coordinatorList}
			{shouldFilterItem}
		/>
		<ComboBox
			invalid={$errors.schedule != null}
			bind:selectedId={$data.schedule}
			titleText="Schedule"
			placeholder="Choose Schedule"
			items={schedules}
			{shouldFilterItem}
		/>
		<ComboBox
			invalid={$errors.source_of_fund != null}
			bind:selectedId={$data.source_of_fund}
			titleText="Source Of Funds"
			placeholder="Choose Source Of Fund"
			items={sourceFunds}
			{shouldFilterItem}
		/>
		<TextInput labelText="Expenditure" name="expenditure" placeholder="Enter Expenditure" />
		<TextArea labelText="Description" name="description" placeholder="Enter a description..." />
	</div>
	<div class=" t-my-5 customDataTable">
		<DataTable
			headers={[
				{
					key: 'name',
					value: 'Name'
				},
				{
					key: 'phone',
					value: 'Phone'
				},
				{
					key: 'email',
					value: 'Email'
				},
				{
					key: 'delete',
					value: 'Delete'
				}
			]}
			rows={participantsList}
		>
			<svelte:fragment slot="cell" let:cell let:row>
				{#if cell.key === 'delete'}
					<Button on:click={() => deleteParticipants(row.id)}>
						<i class="las la-times" />
					</Button>
				{:else}{cell.value}{/if}
			</svelte:fragment>
		</DataTable>

		<div class=" t-my-3 ">
			<h4>Participants Details</h4>
			<div class="t-grid t-grid-cols-3 t-gap-3 t-mb-3">
				<TextInput labelText="Name" placeholder="Enter Name" bind:value={participantsName} />
				<TextInput labelText="Phone" placeholder="Enter Phone" bind:value={participantsPhone} />
				<TextInput labelText="Email" placeholder="Enter Email" bind:value={participantsEmail} />
			</div>
			<Button on:click={() => addParticipants()}>ADD</Button>
		</div>
	</div>
</form>

<MultiSelect
	bind:selectedIds={facilators}
	direction="top"
	titleText="Facilators"
	placeholder="Select Facilators..."
	filterable={true}
	items={$trainers.data.map((item) => ({
		...item,
		text: item.name
	}))}
/>

<div class=" t-flex t-gap-3 t-my-5">
	<div>
		<Button on:click={submitHandler}>Submit</Button>
	</div>
	<div>
		<Button kind="danger">Cancel</Button>
	</div>
</div>

<p>{JSON.stringify($errors)}</p>
<!-- <p>{JSON.stringify($data)}</p> -->
<!-- </Modal> -->
