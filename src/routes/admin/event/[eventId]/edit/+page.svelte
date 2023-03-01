<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import {
		Modal,
		Select,
		SelectItem,
		TextInput,
		TextArea,
		DataTable,
		Button,
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

	$: {
		setFields('status', eventDetails?.status);
		setFields('name', eventDetails?.name);
		setFields('number_of_participants', eventDetails?.number_of_participants);
		setFields('description', eventDetails?.description);
		setFields('budget', eventDetails?.budget);
		setFields('type', eventDetails?.type);
		setFields('organization', eventDetails?.organization);
		setFields('coordinator', eventDetails?.coordinator);
		setFields('schedule', eventDetails?.schedule);

		facilators = eventDetails?.facilitator;
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

	let facilators = [];

	$: {
		setData('facilitator', facilators);
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
<form use:form>
	<div class="t-grid t-grid-cols-2 t-gap-4">
		<TextInput labelText="Name" name="name" placeholder="Enter Event Name" />
		<TextInput
			labelText="Number Of Participants"
			name="number_of_participants"
			placeholder="Number Of Participants"
		/>
		<TextArea labelText="Description" name="description" placeholder="Enter a description..." />
		<TextInput labelText="Budget" name="budget" placeholder="Budget" />
		<Select invalid={$errors.status != null} name="status" labelText="Status">
			<SelectItem text="Choose Status" value="" />
			<SelectItem text="Pending" value="1" />
			<SelectItem text="Complete" value="2" />
			<SelectItem text="In progress" value="3" />
		</Select>

		<Select invalid={$errors.type != null} name="type" labelText="Type">
			<SelectItem text="Choose Type" value="" />
			<SelectItem text="Meeting" value="1" />
			<SelectItem text="Workshop" value="2" />
			<SelectItem text="Orientation" value="3" />
			<SelectItem text="Sensitization" value="4" />
		</Select>

		<Select invalid={$errors.organization != null} name="organization" labelText="Organizations">
			<SelectItem text="Choose Organization" value="" />
			{#each $organizations.data as item}
				<SelectItem text={item.name} value={item.id} />
			{/each}
		</Select>
		<Select invalid={$errors.coordinator != null} name="coordinator" labelText="Coordinator">
			<SelectItem text="Choose Coordinator" value="" />
			{#each $coordinators.data as item}
				<SelectItem text={item.name} value={item.id} />
			{/each}
		</Select>
		<Select invalid={$errors.schedule != null} name="schedule" labelText="Schedule">
			<SelectItem text="Choose schedule" value="" />
			{#each eventSchedule as item}
				<SelectItem text={item.name} value={item.id} />
			{/each}
		</Select>
	</div>
	<div class="t-my-5 ">
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
	bind:selectedIds={facilators}
	titleText="Facilators"
	placeholder="Select Facilators..."
	filterable={true}
	items={$trainers.data.map((item) => ({
		...item,
		text: item.name,
		id: item.phone
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
<p>{JSON.stringify($data)}</p>
<!-- </Modal> -->
