<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import {
		TextInput,
		TextArea,
		DataTable,
		Button,
		ComboBox,
		MultiSelect
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { organizations } from '$lib/store/organization';
	import { coordinators } from '$lib/store/coordinators';
	import { trainers } from '$lib/store/trainer';
	import { scheduleEventsLists } from '$lib/store/schedule-events';
	import { getEvent, updateEvent } from '$lib/service/event';
	import { sourceOfFounds } from '$lib/store/source-of-found';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	$: {
		setData('status', eventDetails?.status);
		setData('name', eventDetails?.name);
		setData('number_of_participants', eventDetails?.number_of_participants);
		setData('description', eventDetails?.description);
		setData('budget', eventDetails?.budget);
		setData('type', eventDetails?.type);
		setData('organization', eventDetails?.organization);
		setData('coordinator', eventDetails?.coordinator);
		setData('schedule', eventDetails?.schedule);
		setData('expenditure', eventDetails?.expenditure);
		setData('source_of_fund', eventDetails?.source_of_fund);
		setData('facilitator', eventDetails?.facilitator);
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
		source_of_fund: yup.number().required('Source Of fund is require'),
		expenditure: yup.number().typeError('Expenditure is required'),
		type: yup.number().required('Type is required.'),
		organization: yup.number().required('Organization is required.'),
		coordinator: yup.number().required('Coordinator is required.'),
		schedule: yup.number().required('Schedule is required.'),
		facilitator: yup.array().min(1)
	});

	const { form, createSubmitHandler, errors, data, setData } = createForm({
		initialValues: { facilitator: [] },
		transform: (values: any) => {
			return {
				...values,
				number_of_participants: values.number_of_participants
					? parseInt(values.number_of_participants)
					: null
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await updateEvent({ ...data, id: eventDetails.id });
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
	}

	function deleteParticipants(id) {
		participantsList = participantsList.filter((item) => item.id != id);
	}

	$: {
		setData('participants', participantsList);
	}

	$: {
		getEvent($page.params.eventId).then((resp) => {
			eventDetails = resp.data;
		});
	}

	$: {
		participantsList = eventDetails?.participants;
	}


	let eventDetails;

	$: organizationsList = $organizations.data.map((item) => ({ ...item, text: item.name }));
	$: coordinatorList = $coordinators.data.map((item) => ({ ...item, text: item.name }));
	$: schedules = $scheduleEventsLists.data.map((item) => ({ ...item, text: item.event_venue_name }));
	$: sourceFunds = $sourceOfFounds.data.map((item) => ({ ...item, text: item.name }));

	onMount(async () => {
		trainers.getTrainers();
		organizations.getOrganizations();
		coordinators.getCoordinators();
		sourceOfFounds.getSourceOfFounds();
		scheduleEventsLists.getEventSchedules();
	});
</script>

<h4 class="t-pb-4">Edit Event</h4>
<form use:form>
	<div class="t-grid t-grid-cols-2 t-gap-4">
		<div>
			<TextInput
				labelText="Name"
				invalid={$errors.name != null}
				bind:value={$data.name}
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
				bind:value={$data.number_of_participants}
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
				bind:value={$data.description}
				invalid={$errors.description != null}
				name="description"
				placeholder="Enter a description..."
			/>
			{#if $errors.description}
				<p class="t-text-red-500">{$errors.description}</p>
			{/if}
		</div>
		<div>
			<TextInput
				labelText="Budget"
				bind:value={$data.budget}
				invalid={$errors.budget}
				name="budget"
				placeholder="Budget"
			/>
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
				bind:value={$data.expenditure}
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
	<div class="t-my-5 customDataTable">
		<DataTable
			size="short"
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
	bind:selectedIds={$data.facilitator}
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
		<Button kind="danger">Cancel</Button>
	</div>
	<div>
		<Button on:click={submitHandler}>Submit</Button>
	</div>
</div>

<!-- <p>{JSON.stringify($errors)}</p> -->
<!-- <p>{JSON.stringify($data)}</p> -->
