<script lang="ts">
	import { courseTopics } from '$lib/store/courseTopic';
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
	import { page } from '$app/stores';

	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'title', value: 'Title' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let courseTopic;

	function openModalForm(row) {
		open = true;
		courseTopic = row;
	}

	async function doDelete() {
		await courseTopics.deleteCourseTopic(courseTopic.id);
		deleteModal = false;
	}

	onMount(async () => {
		courseTopics.getCourseTopics($page.params.courseId);
	});
</script>

{#if $courseTopics.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Training Topic" description="" {headers} rows={$courseTopics.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Topic</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction='top'>
					<!-- <OverflowMenuItem text="View" /> -->
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							courseTopic = { ...row };
							deleteModal = true;
						}}
						danger
						text="Delete"
					/>
				</OverflowMenu>
			{:else if cell.key === 'rowNumber'}
				{rowIndex + 1}
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:courseTopic />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'training topic'} />
