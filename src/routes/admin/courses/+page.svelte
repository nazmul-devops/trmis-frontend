<script lang="ts">
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Button
	} from 'carbon-components-svelte';
	import EditOff from 'carbon-icons-svelte/lib/EditOff.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { onMount } from 'svelte';
	import { getTrainingCourses } from './service';

	let trainingCourses: Array<any> = [];

	onMount(async () => {
		let { status, data } = await getTrainingCourses();
		trainingCourses = data;
	});
</script>

<DataTable
	size="short"
	title="Load balancers"
	description="Your organization's active load balancers."
	headers={[
		{ key: 'id', value: 'id' },
		{ key: 'code', value: 'code' },
		{ key: 'shortName', value: 'Short Name' },
		{ key: 'name', value: 'Name' },
		{ key: 'sourceOfFund', value: 'Source Of Fund' },
		{ key: 'coordinator', value: 'Coordinator' },
		{ key: 'isActive', value: 'is Active' },
		{ key: 'action', value: 'Action' }
	]}
	rows={trainingCourses}
>
	<Toolbar size="sm">
		<ToolbarContent>
			<ToolbarSearch />
			<ToolbarMenu>
				<ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
				<ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service"
					>API documentation</ToolbarMenuItem
				>
				<ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
			</ToolbarMenu>
			<a href="/admin/courses/create">
				<Button>Add Course</Button>
			</a>
		</ToolbarContent>
	</Toolbar>

	<svelte:fragment slot="cell" let:row let:cell>
		{#if cell.key === 'name'}
			<a href={`/admin/courses/${row.id}`}>{cell.value}</a>
		{:else if cell.key === 'action'}
			<div class="t-flex">
				<EditOff class="t-cursor-pointer" size={24} />
				<TrashCan class="t-cursor-pointer" size={24} />
			</div>
		{:else}{cell.value}{/if}
	</svelte:fragment>
</DataTable>
