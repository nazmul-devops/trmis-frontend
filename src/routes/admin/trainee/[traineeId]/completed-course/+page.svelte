<script lang="ts">
	import { completedCourses } from '$lib/store/completedCourse';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		Button,
		DataTableSkeleton,
		Loading,
		OverflowMenu,
		OverflowMenuItem
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	// import FormModal from './FormModal.svelte';
	// import DeleteModal from '$lib/DeleteModal.svelte';
	import { page } from '$app/stores';

	let filteredRowIds = [];
	let headers = [
		{ key: 'batch_name', value: 'Batch' },
		{ key: 'training_course_name', value: 'Training' },
		{ key: 'training_center_name', value: 'Training Venue' },
		{ key: 'start_date', value: 'Start Date' },
		{ key: 'end_date', value: 'End Date' },
		{ key: 'org_name', value: 'Organization' }
		// { key: 'action', value: 'Action' }
	];

	// let open = false;
	// let deleteModal = false;
	// let completedCourse;

	// function openModalForm(row) {
	// 	open = true;
	// 	completedCourse = row;
	// }

	// async function doDelete() {
	// 	// await completedCourses.deleteCompletedCourse(completedCourse.id);
	// 	deleteModal = false;
	// }

	onMount(async () => {
		completedCourses.getCompletedCourses($page.params.traineeId);
	});
</script>

{#if $completedCourses.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		id="training_course_id"
		size="short"
		title="Training completed by Participant's name"
		description=""
		{headers}
		rows={$completedCourses.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<!-- <Button>Add Completed Course</Button> -->
			</ToolbarContent>
		</Toolbar>
		<!-- <svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="View" />
					<OverflowMenuItem text="Edit" />
					<OverflowMenuItem danger text="Delete" />
				</OverflowMenu>
			{:else}{cell.value}{/if}
		</svelte:fragment> -->
	</DataTable>
{/if}

<!-- <FormModal bind:open bind:completedCourse /> -->
<!-- <DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'Completed Training'} /> -->
