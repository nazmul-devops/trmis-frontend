<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { organizations } from '$lib/store/organization';
	import { coordinators } from '$lib/store/coordinators';
	import { trainers } from '$lib/store/trainer';
	import { getEventSchedules } from '$lib/service/schedule-events';
	import { createEventDispatcher } from 'svelte';
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
	import { createEvent, updateEvent } from '$lib/service/event';
	export let open = true;
	export let event = {
		id: null,
		status: null,
		name: null,
		number_of_participants: null,
		participants: [],
		description: null,
		budget: null,
		type: null,
		organization: null,
		coordinator: null,
		schedule: null,
		facilitator: []
	};

	function formDetails() {
		setFields('status', event.status);
		setFields('name', event.name);
		setFields('number_of_participants', event.number_of_participants);
		setFields('participants', event.participants);
		setFields('description', event.description);
		setFields('budget', event.budget);
		setFields('type', event.type);
		setFields('organization', event.organization);
		setFields('coordinator', event.coordinator);
		setFields('schedule', event.schedule);
	}

	$: {
		if (event.id != null) {
			formDetails();
		} else {
			reset();
		}
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
		facilitator: yup.object().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
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
				facilitator: parseInt(values.facilitator)
			};
		},
		extend: validator({ schema })
	});

	const dispatch = createEventDispatcher();

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (event.id) {
				await updateEvent({ ...data, id: event.id });
			} else {
				await createEvent({ ...data });
			}
			open = false;
			dispatch('update-list');
			reset();
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

	let facilators = [];

	let eventSchedule = [];

	onMount(async () => {
		organizations.getOrganizations();
		coordinators.getCoordinators();
		trainers.getTrainers();
		const { data } = await getEventSchedules();
		eventSchedule = data;
	});
</script>

<Modal
	bind:open
	modalHeading="Create Event"
	primaryButtonText="ADD"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput labelText="Name" name="name" placeholder="Enter Event Name" />
		<TextInput
			labelText="Number Of Participants"
			name="number_of_participants"
			placeholder="Number Of Participants"
		/>

		<div>
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
					}
				]}
				rows={participantsList}
			/>

			<div>
				<h4>Participants Details</h4>
				<TextInput labelText="Name" placeholder="Enter Name" bind:value={participantsName} />
				<TextInput labelText="Phone" placeholder="Enter Phone" bind:value={participantsPhone} />
				<TextInput labelText="Email" placeholder="Enter Email" bind:value={participantsEmail} />
				<Button on:click={() => addParticipants()}>ADD</Button>
			</div>
		</div>

		<TextArea labelText="Description" name="description" placeholder="Enter a description..." />
		<TextInput labelText="Budget" name="budget" placeholder="Budget" />
		<Select invalid={$errors.status != null} name="status" labelText="Status">
			<SelectItem text="choose Status" value="" />
			<SelectItem text="Pending" value="1" />
			<SelectItem text="Complete" value="2" />
			<SelectItem text="In progress" value="3" />
		</Select>

		<Select invalid={$errors.type != null} name="type" labelText="Type">
			<SelectItem text="choose Type" value="" />
			<SelectItem text="Meeting" value="1" />
			<SelectItem text="Workshop" value="2" />
			<SelectItem text="Orientation" value="3" />
			<SelectItem text="Sensitization" value="4" />
		</Select>

		<Select invalid={$errors.organization != null} name="organization" labelText="Organizations">
			<SelectItem text="choose Organization" value="" />
			{#each $organizations.data as item}
				<SelectItem text={item.title} value={item.id} />
			{/each}
		</Select>
		<Select invalid={$errors.coordinator != null} name="coordinator" labelText="Coordinator">
			<SelectItem text="choose Coordinator" value="" />
			{#each $coordinators.data as item}
				<SelectItem text={item.title} value={item.id} />
			{/each}
		</Select>
		<Select invalid={$errors.schedule != null} name="schedule" labelText="Schedule">
			<SelectItem text="choose Organization" value="" />
			{#each eventSchedule as item}
				<SelectItem text={item.name} value={item.id} />
			{/each}
		</Select>
		<MultiSelect
			selectedIds={facilators}
			titleText="Prerequisite"
			label="Select Prerequisite..."
			items={$trainers.data.map((item) => ({ ...item, text: item.name }))}
			on:select={(e) => setFields('facilitator', e.detail.selectedIds)}
		/>

		<!-- <p>{JSON.stringify($errors)}</p> -->
		<!-- <p>{JSON.stringify($data)}</p> -->
	</form>
</Modal>
