<script lang="ts">
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { getCourseCategory } from '$lib/service/courseCategory';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		Button,
		DataTableSkeleton,
		OverflowMenu,
		OverflowMenuItem
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	interface Category {
		title?: string;
	}

	$: {
		console.log(singleCategory);
	}

	let singleCategory: Category = {};
	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'title', value: 'Title' },
		{ key: 'code', value: 'Course Code' },
		{ key: 'course_category_name', value: 'Course Category' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let trainingCourse;

	function openModalForm(row) {
		open = true;
		trainingCourse = row;
	}

	async function doDelete() {
		await trainingCourses.deleteTrainingCourse(trainingCourse.id);
		deleteModal = false;
	}

	$: TrainingCourse = $trainingCourses.data;

	onMount(async () => {
		trainingCourses.getTrainingCourses($page.params.coursesId);
		getCourseCategory($page.params.coursesId).then((resp) => {
			singleCategory = resp.data;
		});
	});
</script>

{#if $trainingCourses.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title={`Training Course By ${singleCategory?.title}`}
		description=""
		{headers}
		rows={TrainingCourse}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Course</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction="top">
					<OverflowMenuItem
						on:click={() => goto(`training-course/${row.id}/training-material`)}
						text="Training Material"
					/>
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							trainingCourse = { ...row };
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

<FormModal bind:open bind:trainingCourse />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'training'} />
