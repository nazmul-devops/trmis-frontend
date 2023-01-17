<script lang="ts">
	import { trainingCourses } from '$lib/store/trainingCourse';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Button,
		DataTableSkeleton,
		OverflowMenu,
		OverflowMenuItem
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';
	import { courseCategories } from '$lib/store/courseCategory';

	let filteredRowIds = [];
	let headers = [
		{ key: 'id', value: 'ID' },
		{ key: 'title', value: 'Title' },
		{ key: 'description', value: 'Description' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let courseCategory;

	function openModalForm(row) {
		open = true;
		courseCategory = row;
	}

	async function doDelete() {
		await courseCategories.deleteCourseCategory(courseCategory.id);
		deleteModal = false;
	}

	onMount(async () => {
		courseCategories.getCourseCategories();
	});
</script>

{#if $courseCategories.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Degrees" description="" {headers} rows={$courseCategories.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<ToolbarMenu>
					<ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
					<ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service"
						>API documentation</ToolbarMenuItem
					>
					<ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
				</ToolbarMenu>
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add trainer</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="View" />
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							courseCategory = { ...row };
							deleteModal = true;
						}}
						danger
						text="Delete"
					/>
				</OverflowMenu>
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:courseCategory />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
