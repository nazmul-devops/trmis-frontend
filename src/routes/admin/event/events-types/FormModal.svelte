<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { createEventDispatcher } from 'svelte';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { createEventType, updateEventType } from '$lib/service/event-type';
	export let open = true;
	export let eventType = {
		id: null,
		name: null
	};

	function formDetails() {
		setFields('name', eventType.name);
	}

	$: {
		if (eventType.id != null) {
			formDetails();
		} else {
			reset();
		}
	}

	const schema = yup.object({
		name: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		extend: validator({ schema })
	});

	const dispatch = createEventDispatcher();

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (eventType.id) {
				await updateEventType({ ...data, id: eventType.id });
			} else {
				await createEventType({ ...data });
			}
			open = false;
			dispatch('update-list');
			reset();
		}
	});
</script>

<Modal
	bind:open
	modalHeading="Create Schedule"
	primaryButtonText="ADD"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput
			labelText="Name"
			name="name"
			placeholder="Enter Name..."
			invalid={$errors.name != null}
		/>
	</form>
</Modal>
