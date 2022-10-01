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
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import { createEventDispatcher } from 'svelte';
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

	const schema = yup.object({
		name: yup.string().required(),
		oraganizations: yup.string().required()
	});

	const { form, errors } = createForm({
		initialValues: initialData,
		onSubmit: (values) => {
			console.log(values);
		},
		extend: validator({ schema })
	});

	let ButtonName = {
		edit: 'Edit',
		Add: 'Add'
	};
</script>

<form use:form>
	<div class="t-grid t-grid-cols-4 t-gap-4">
		<div>
			<TextInput
				name="name"
				labelText="User name"
				placeholder="Enter user name..."
				invalid={$errors.name != null}
				bind:invalidText={$errors.name}
			/>
		</div>
		<div>
			<Select name="organizations" labelText="Organization">
				<SelectItem value="a" disabled hidden />
				<SelectItem value="b" />
				<SelectItem value="c" />
				<SelectItem value="d" />
				<SelectItem value="e" />
			</Select>
		</div>
		<div>
			<Select name="gender" labelText="Gender">
				<SelectItem value="Male" />
				<SelectItem value="Female" />
			</Select>
		</div>
		<div>
			<Select name="venue" labelText="Venue">
				<SelectItem value="Dhaka" />
				<SelectItem value="Noakhali" />
			</Select>
		</div>
		<div>
			<DatePicker name="date" datePickerType="single">
				<DatePickerInput labelText="Meeting date" placeholder="mm/dd/yyyy" />
			</DatePicker>
		</div>
		<div>
			<NumberInput
				name="duration"
				invalidText="Number must be between 4 and 20."
				helperText="Clusters provisioned in your region"
				label="Clusters (4 min, 20 max)"
			/>
		</div>
		<div>
			<TextInput name="subject" labelText="Subject" placeholder="Enter Subject..." />
		</div>
		<div>
			<TextInput name="remarks" labelText="Remarks" placeholder="Remarks..." />
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
