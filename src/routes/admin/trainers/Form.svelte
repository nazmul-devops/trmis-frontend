<script lang="ts">
	import {
		TextInput,
		Select,
		SelectItem,
		DatePicker,
		DatePickerInput,
		NumberInput,
		Button
	} from 'carbon-components-svelte';
	import * as yup from 'yup';
	import { createForm } from 'svelte-forms-lib';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	type FormType = 'edit' | 'create';

	const dispatch = createEventDispatcher();

	export let formType: FormType;
	export let initialData = {
		name: null,
		organization: null,
		gender: null,
		venue: null,
		date: null,
		duration: 4,
		subject: null,
		remarks: null
	};

	let trainer = {
		name: null,
		organization: null,
		gender: null,
		venue: null,
		date: null,
		duration: 4,
		subject: null,
		remarks: null
	};

	let ButtonName = {
		edit: 'Edit',
		Add: 'Add'
	};

	$: if (formType == 'edit') {
		trainer = initialData;
		$form = initialData;
	}

	const { form, errors, handleSubmit } = createForm({
		initialValues: trainer,
		validationSchema: yup.object().shape({
			name: yup.string().required(),
			organization: yup.string().required(),
			gender: yup.string().oneOf(['Male', 'Female']).required(),
			venue: yup.string().required(),
			date: yup.date().required(),
			duration: yup.number().required(),
			subject: yup.string().required(),
			remarks: yup.string().required()
		}),
		onSubmit: (values) => {
			console.log(values);
			if (formType == 'edit') {
				dispatch('edit', trainer);
			} else if (formType == 'create') {
				dispatch('create', trainer);
			}
		}
	});
</script>

<form on:submit={handleSubmit}>
	<div class="t-grid t-grid-cols-4 t-gap-4">
		<div>
			<TextInput bind:value={$form.name} labelText="User name" placeholder="Enter user name..." />
			{#if $errors.name}
				<small>{$errors.name}</small>
			{/if}
		</div>
		<div>
			<Select bind:selected={$form.organization} labelText="Organization">
				<SelectItem value="a" disabled hidden />
				<SelectItem value="b" />
				<SelectItem value="c" />
				<SelectItem value="d" />
				<SelectItem value="e" />
			</Select>
		</div>
		<div>
			<Select bind:selected={$form.gender} labelText="Gender">
				<SelectItem value="Male" />
				<SelectItem value="Female" />
			</Select>
		</div>
		<div>
			<Select bind:selected={$form.venue} labelText="Venue">
				<SelectItem value="Dhaka" />
				<SelectItem value="Noakhali" />
			</Select>
		</div>
		<div>
			<DatePicker bind:value={$form.date} datePickerType="single">
				<DatePickerInput labelText="Meeting date" placeholder="mm/dd/yyyy" />
			</DatePicker>
		</div>
		<div>
			<NumberInput
				bind:value={$form.duration}
				min={0}
				max={20}
				invalidText="Number must be between 4 and 20."
				helperText="Clusters provisioned in your region"
				label="Clusters (4 min, 20 max)"
			/>
		</div>
		<div>
			<TextInput bind:value={$form.subject} labelText="Subject" placeholder="Enter Subject..." />
		</div>
		<div>
			<TextInput bind:value={$form.remarks} labelText="Remarks" placeholder="Remarks..." />
		</div>
		<div>
			<Button type="submit">
				{#if formType == 'edit'}
					{ButtonName.edit}
				{:else}
					{ButtonName.Add}
				{/if}
			</Button>
		</div>
	</div>
</form>
<!-- { JSON.stringify($form = initialData )} -->
