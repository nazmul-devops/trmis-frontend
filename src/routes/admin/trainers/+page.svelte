<script lang="ts">
	import { trainers } from '$lib/store/trainer';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Button,
		DataTableSkeleton,
		Loading
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';

	let headers = [
		{ key: 'id', value: 'id' },
		{ key: 'name', value: 'name' },
		{ key: 'designation', value: 'designation' },
		{ key: 'organization', value: 'organization' },
		{ key: 'phone', value: 'phone' },
		{ key: 'emergencyPhone', value: 'emergencyPhone' },
		{ key: 'nid', value: 'nid' },
		{ key: 'email', value: 'email' },
		{ key: 'gender', value: 'gender' }
	];

	onMount(async () => {
		trainers.getTrainers();
	});
</script>

{#if $trainers.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Trainers" description="" {headers} rows={$trainers.data}>
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
				<a href="/admin/trainers/create">
					<Button>Add trainer</Button>
				</a>
			</ToolbarContent>
		</Toolbar>

		<svelte:fragment slot="cell" let:row let:cell>
			{#if cell.key === 'name'}
				<a href={`/admin/trainers/${row.id}`}>{cell.value}</a>
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}
