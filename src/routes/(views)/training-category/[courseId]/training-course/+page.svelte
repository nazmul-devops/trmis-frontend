<script lang="ts">
	import { page } from '$app/stores';
	import { SkeletonText } from 'carbon-components-svelte';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { getCourseCategory } from '$lib/service/courseCategory';
	import PageTitle from '$lib/PageTitle.svelte';
	import { onMount } from 'svelte';
	import TrainingCard from '$lib/TrainingCard.svelte';

	interface Category {
		title?: string;
        description?: string;
	}

	let singleCategory: Category = {};
	let trainingCategoryId = $page.params.courseId;
	let loading = false;


	$: TrainingCourse = $trainingCourses.data;

	onMount(async () => {
        loading = true;
		trainingCourses.getTrainingCourses($page.params.courseId);

		getCourseCategory($page.params.courseId).then((resp) => {
			singleCategory = resp.data;
            loading = false
		});
	});
</script>

<div>
	<div>
		<div>
			{#if loading}
				<div class="t-container t-mx-auto t-my-3">
					<SkeletonText paragraph lines={6} />
				</div>
			{:else}
				<PageTitle
					Title="Training Course By {singleCategory?.title}"
					desc="{singleCategory?.description}"
				/>
			{/if}
		</div>
		<div
			class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-32 t-transition t-ease-in-out t-delay-150 t-hover:-translate-y-1 t-hover:scale-110 t-hover:bg-indigo-500 t-duration-300"
		>
			<div class="t-grid md:t-grid-cols-2 sm:t-grid-cols-1 t-gap-4">
				{#each TrainingCourse as { title, id }}
					<a href={`/training-category/${trainingCategoryId}/training-course/${id}`} class="t-text-gray-500">
						<TrainingCard course={title} />
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
