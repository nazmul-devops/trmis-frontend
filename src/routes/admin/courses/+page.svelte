<script lang="ts">
	import { courses } from '$lib/store/course';
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
	import { get } from 'svelte/store';

	onMount(async () => {
		if (get(courses).length == 0) {
			courses.getCourses();
		}
	});
</script>

<DataTable
	size="short"
	title="Load balancers"
	description="Your organization's active load balancers."
	headers={[
		{ key: 'id', value: 'id' },
		{ key: 'name', value: 'name' },
		{ key: 'description', value: 'descriptione' },
		{ key: 'category', value: 'category' }
	]}
	rows={$courses}
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
