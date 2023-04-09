<script lang="ts">
	import { courseCategories } from '$lib/store/courseCategory';
	import PageTitle from '$lib/PageTitle.svelte';
	import { onMount } from 'svelte';
	import TrainingCard from '$lib/TrainingCard.svelte';

	let trainingData = [];

	$: {
		trainingData = $courseCategories.data
	}
	
	onMount(async () => {
		courseCategories.getCourseCategories();
	});
</script>

<div>
	<div>
		<PageTitle
			Title="Training Category"
			desc="Explore our list of training courses to find the one that best suits your needs and interests. "
		/>
		<div
			class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-32 t-transition t-ease-in-out t-delay-150  t-hover:-translate-y-1 t-hover:scale-110 t-hover:bg-indigo-500 t-duration-300"
		>
			<div class="t-grid md:t-grid-cols-2 sm:t-grid-cols-1 t-gap-4">
				{#each trainingData as { title, id }}
					<a 
						href={`/training-category/${id}/training-course`} 
						class="t-text-gray-500" 
					> 
						<TrainingCard 
							course={title} 
						/>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
