<script lang="ts">
	import { coursePrerequisites } from '$lib/store/coursePrerequisite';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Button,
		DataTableSkeleton,
		Loading,
		OverflowMenu,
		OverflowMenuItem
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';

	let filteredRowIds = [];
	let headers = [
		{ key: 'id', value: 'ID' },
		{ key: 'course_id', value: 'Course Name' },
		{ key: 'prerequisite_course_id', value: 'Prerequisite' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let coursePrerequisite;

	function openModalForm(row) {
		open = true;
		coursePrerequisite = row;
	}

	async function doDelete() {
		await coursePrerequisites.deleteCoursePrerequisite(coursePrerequisite.id);
		deleteModal = false;
	}

	onMount(async () => {
		coursePrerequisites.getCoursePrerequisites();
	});
</script>

{#if $coursePrerequisites.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title="Course Prerequisite"
		description=""
		{headers}
		rows={$coursePrerequisites.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Prerequisite</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="View" />
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							coursePrerequisite = { ...row };
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

<FormModal bind:open bind:coursePrerequisite />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
