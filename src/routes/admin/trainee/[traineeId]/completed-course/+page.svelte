<script lang="ts">
	import { completedCourses } from '$lib/store/completedCourse';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		DataTableSkeleton
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let filteredRowIds = [];
	let headers = [
		{ key: 'batch_name', value: 'Batch' },
		{ key: 'training_course_name', value: 'Training' },
		{ key: 'training_center_name', value: 'Training Venue' },
		{ key: 'start_date', value: 'Start Date' },
		{ key: 'end_date', value: 'End Date' },
		{ key: 'org_name', value: 'Organization' }
	];

	onMount(async () => {
		completedCourses.getCompletedCourses($page.params.traineeId);
	});

	$: {
		console.log($completedCourses.data);
	}
</script>

{#if $completedCourses.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		id="training_course_id"
		size="short"
		title={`Training completed by ${$completedCourses.trainee.name}`}
		description=""
		{headers}
		rows={$completedCourses.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
			</ToolbarContent>
		</Toolbar>
	</DataTable>
{/if}

<!-- rows={$completedCourses.data} -->
