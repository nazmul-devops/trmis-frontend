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
		ComboBox,
		NumberInput
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { createEvent } from '$lib/service/event';
	import { goto } from '$app/navigation';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	const schema = yup.object({
		status: yup.number().required('Status is required.'),
		name: yup.string().required('Name is required.'),
		number_of_participants: yup
			.number()
			.required()
			.typeError('Number of participants is required.'),
		participants: yup.array().min(1),
		description: yup.string().required('Description is required.'),
		budget: yup.number().required().typeError('Budget is required.'),
		type: yup.number().required('Type is required.'),
		organization: yup.number().required('Organization is required.'),
		coordinator: yup.number().required('Coordinator is required.'),
		schedule: yup.number().required('Schedule is required.'),
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
			goto('/admin/event/event-list');
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
		<div>
			<TextInput
				labelText="Name"
				invalid={$errors.name != null}
				name="name"
				placeholder="Enter Event Name"
			/>
			{#if $errors.name}
				<p class="t-text-red-500">{$errors.name}</p>
			{/if}
		</div>
		<div>
			<TextInput
				labelText="Number Of Participants"
				invalid={$errors.number_of_participants != null}
				name="number_of_participants"
				placeholder="Number Of Participants"
			/>
			{#if $errors.number_of_participants}
				<p class="t-text-red-500">{$errors.number_of_participants}</p>
			{/if}
		</div>
		<div>
			<TextArea
				labelText="Description"
				invalid={$errors.description != null}
				name="description"
				placeholder="Enter a description..."
			/>
			{#if $errors.description}
				<p class="t-text-red-500">{$errors.description}</p>
			{/if}
		</div>
		<div>
			<TextInput labelText="Budget" invalid={$errors.budget} name="budget" placeholder="Budget" />
			{#if $errors.budget}
				<p class="t-text-red-500">{$errors.budget}</p>
			{/if}
		</div>
		<div>
			<ComboBox
				invalid={$errors.source_of_fund != null}
				bind:selectedId={$data.source_of_fund}
				titleText="Source Of Fund"
				placeholder="Choose Source Of Fund"
				items={sourceFunds}
				{shouldFilterItem}
			/>
			{#if $errors.source_of_fund}
				<p class="t-text-red-500">{$errors.source_of_fund}</p>
			{/if}
		</div>
		<div>
			<TextInput
				type="number"
				labelText="Expenditure"
				invalid={$errors.expenditure != null}
				name="expenditure"
				placeholder="Enter Expendoiture"
			/>
			{#if $errors.expenditure}
				<p class="t-text-red-500">{$errors.expenditure}</p>
			{/if}
		</div>
		<div>
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
			{#if $errors.status}
				<p class="t-text-red-500">{$errors.status}</p>
			{/if}
		</div>
		<div>
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
			{#if $errors.type}
				<p class="t-text-red-500">{$errors.type}</p>
			{/if}
		</div>
		<div>
			<ComboBox
				invalid={$errors.organization != null}
				bind:selectedId={$data.organization}
				titleText="Organization"
				placeholder="Choose Organnization"
				items={organizationsList}
				{shouldFilterItem}
			/>
			{#if $errors.organization}
				<p class="t-text-red-500">{$errors.organization}</p>
			{/if}
		</div>
		<div>
			<ComboBox
				invalid={$errors.coordinator != null}
				bind:selectedId={$data.coordinator}
				titleText="Coordinator"
				placeholder="Choode Coordinator"
				items={coordinatorList}
				{shouldFilterItem}
			/>
			{#if $errors.coordinator}
				<p class="t-text-red-500">{$errors.coordinator}</p>
			{/if}
		</div>
		<div>
			<ComboBox
				invalid={$errors.schedule != null}
				bind:selectedId={$data.schedule}
				titleText="Schedule"
				placeholder="Choose Schedule"
				items={schedules}
				{shouldFilterItem}
			/>
			{#if $errors.schedule}
				<p class="t-text-red-500">{$errors.schedule}</p>
			{/if}
		</div>
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

		<div class=" t-my-3">
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

<div>
	<MultiSelect
		bind:selectedIds={facilators}
		invalid={$errors.facilators}
		direction="top"
		titleText="Facilators"
		placeholder="Select Facilators..."
		filterable={true}
		items={$trainers.data.map((item) => ({
			...item,
			text: item.name
		}))}
	/>
</div>

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
