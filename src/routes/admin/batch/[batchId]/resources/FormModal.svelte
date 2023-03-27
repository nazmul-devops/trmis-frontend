<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { createBatchParticipant } from '$lib/service/batch-participants';
	import { trainers } from '$lib/store/trainer';
	import { createEventDispatcher } from 'svelte';
	import { Modal, TextInput, Select, SelectItem, ComboBox } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { createBatchResource } from '$lib/service/batch-resources';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	export let open = true;
	export let resource = {
		trainer: null
	};

	$: {
		setFields('trainer', resource.trainer);
	}

	const schema = yup.object({
		trainer: yup.number().required().typeError('Resources are required')
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				trainer: parseInt(values.trainer)
			};
		},
		extend: validator({ schema })
	});

	const dispatch = createEventDispatcher();

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await createBatchResource($page.params.batchId, { ...data });
			open = false;
			reset();
			dispatch('update-list');
		}
	});

	$: resourcesList = $trainers.data.map((item) => ({ ...item, text: item.name }));

	onMount(async () => {
		trainers.getTrainers();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Participant"
	primaryButtonText="ADD"
	secondaryButtonText="Cancel"
	preventCloseOnClickOutside
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div>
			<ComboBox
				invalid={$errors.trainer != null}
				invalidText={$errors.trainer}
				name="trainer"
				titleText="Resources"
				placeholder="Choose Resources"
				bind:selectedId={$data.trainer}
				items={resourcesList}
				{shouldFilterItem}
			/>
		</div>
		<!-- <p>{JSON.stringify($errors)}</p>
		<p>{JSON.stringify($data)}</p> -->
	</form>
</Modal>
