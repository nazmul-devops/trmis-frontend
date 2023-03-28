<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import {
		Select,
		SelectItem,
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
	import { getEventSchedules } from '$lib/service/schedule-events';
	import { getEvent, updateEvent } from '$lib/service/event';
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

		setData('facilitator', eventDetails?.facilitator);
	}

	const schema = yup.object({
		status: yup.number().required(),
		name: yup.string().required(),
		number_of_participants: yup.number().required(),
		participants: yup.array().min(1),
		description: yup.string().required(),
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
				schedule: parseInt(values.schedule)
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await updateEvent({ ...data, id: eventDetails.id });
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

	let eventSchedule = [];

	let eventDetails;

	$: organizationsList = $organizations.data.map((item) => ({ ...item, text: item.name }));
	$: coordinatorList = $coordinators.data.map((item) => ({ ...item, text: item.name }));
	$: schedules = eventSchedule.map((item) => ({ ...item, text: item.event_venue_name }));

	onMount(async () => {
		trainers.getTrainers();
		organizations.getOrganizations();
		coordinators.getCoordinators();
		const resp = await getEventSchedules();
		eventSchedule = resp.data;
	});
</script>

<!-- <Modal
	bind:open
	modalHeading="Create Event"
	primaryButtonText="ADD"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
> -->
<h4 class="t-pb-4">Edit Event</h4>
<form use:form>
	<div class="t-grid t-grid-cols-2 t-gap-4">
		<TextInput
			bind:value={$data.name}
			labelText="Name"
			name="name"
			placeholder="Enter Event Name"
		/>
		<TextInput
			bind:value={$data.number_of_participants}
			labelText="Number Of Participants"
			name="number_of_participants"
			placeholder="Number Of Participants"
		/>
		<TextArea
			labelText="Description"
			bind:value={$data.description}
			name="description"
			placeholder="Enter a description..."
		/>
		<TextInput labelText="Budget" bind:value={$data.budget} name="budget" placeholder="Budget" />
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
			placeholder="Choode Coordinator"
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
	direction='top'
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
		<Button on:click={submitHandler}>submit</Button>
	</div>
</div>

<!-- <p>{JSON.stringify($errors)}</p> -->
<!-- <p>{JSON.stringify($data)}</p> -->
<!-- </Modal> -->
