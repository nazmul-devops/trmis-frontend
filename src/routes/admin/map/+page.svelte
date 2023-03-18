<script>
	import { ComboBox } from 'carbon-components-svelte';
	import { organizations } from '$lib/store/organization';
	import Map from '$lib/map.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { onMount } from 'svelte';
	import { getLocations } from '$lib/service/locations';
	import { divisions } from '$lib/store/division';
	let zilaOptions = [];
	let upazilaOptions = [];
	let locations = [];

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}
	$: organizationsList = $organizations.data.map((item) => ({ ...item, text: item.name }));
	$: {
		getLocations().then((resp) => {
			locations = resp.data;
		});
	}
	$: {
		if ($data.division) {
			let index = locations.findIndex((item) => item.id === $data.division);
			if (index >= 0) {
				zilaOptions = locations[index]?.zilas;
			} else {
				zilaOptions = [];
			}
		} else {
			zilaOptions = [];
		}
	}

	$: {
		if ($data.district) {
			let index = zilaOptions.findIndex((item) => item.id === $data.district);
			if (index >= 0) {
				upazilaOptions = zilaOptions[index]?.upazilas;
			} else {
				upazilaOptions = [];
			}
		} else {
			upazilaOptions = [];
		}
	}

	const schema = yup.object({
		organization: yup.number().required().typeError('Select Organization'),
		division: yup.number().required().typeError('Select Division'),
		district: yup.number().required().typeError('Select District')
	});
	const { form, reset, createSubmitHandler, setFields, setData, errors, data } = createForm({
		extend: validator({ schema })
	});

	onMount(async () => {
		organizations.getOrganizations();
	});
</script>

<div>
	<div class="t-grid t-grid-cols-5 t-gap-4 t-mb-4 ">
		<ComboBox
			invalid={$errors.organization != null}
			invalidText={$errors.organization}
			name="organization"
			titleText="Organization"
			placeholder="Choose Organization"
			bind:selectedId={$data.organization}
			items={organizationsList}
			{shouldFilterItem}
		/>
		<ComboBox
			bind:selectedId={$data.division}
			titleText="Division"
			placeholder="Select Division"
			items={locations}
			{shouldFilterItem}
		/>
		<ComboBox
			disabled={!$data.division}
			bind:selectedId={$data.district}
			titleText="Zila"
			placeholder="Select Zila"
			items={zilaOptions}
			{shouldFilterItem}
		/>
		<ComboBox
			disabled={!$data.district}
			bind:selectedId={$data.sub_district}
			titleText="Upazila"
			placeholder="Select Upazila"
			items={upazilaOptions}
			{shouldFilterItem}
		/>
		<ComboBox
			titleText="Map View"		
			placeholder="Select Map View"
			items={[
				{ id: '0', text: 'Batch View' },
				{ id: '1', text: 'Training Center View' }
			]}
		/>
	</div>

	<Map
		bind:district={$data.district}
		bind:division={$data.division}
		bind:subDistrict={$data.sub_district}
		bind:organization={$data.organization}
	/>
</div>
