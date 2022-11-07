<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PageTitle from '$lib/PageTitle.svelte';
	import axios from 'axios';

	let title;
	let batchesByYear = [];

	async function getCourseDetails(courseId) {
		let { data } = await axios.get(
			`http://localhost:3333/pageTrainingDetails/${courseId}?_expand=course`
		);
		console.log(data);
		title = data.course.name;
		batchesByYear = data.batchesByYear;
	}

	// function next(){
	//     let id = parseInt( $page.params.courseId) + 1
	//     goto(`/training/${id}`)
	// }

	$: {
		if ($page.params) {
			getCourseDetails($page.params.courseId);
		}
	}
</script>

<div>
	<div>
		<PageTitle Title={title} desc="" />
	</div>
	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-pt-32 ">
		<div class="t-grid t-grid-cols-3  md:t-gap-4 sm:t-gap-1 t-py-5 t-items-center">
			<div class="t-col-span-1">
				<span
					class="t-font-semibold t-text-transparent t-text-2xl t-text-left t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]"
				>
					Year
				</span>
			</div>
			<!-- <div class="lg:t-col-span-5 sm:t-col-span-2 sm:t-gap-4"> -->
				<!-- <div class="t-grid lg:t-grid-cols-5 md:t-cols-1 t-py-2 sm:t-gap-8 "> -->
					<div class="t-col-span-1  ">
						<span
							class="t-font-semibold t-text-transparent t-text-2xl t-text-left t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]"
						>
							Batch
						</span>
					</div>
					<div class="t-col-span-1 t-text-right ">
						<span
							class="t-font-semibold t-text-transparent t-text-2xl t-text-right t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]"
						>
							Participant
						</span>
					</div>
				<!-- </div> -->
			<!-- </div> -->
		</div>
	</div>
	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-pb-5">
		<div
			class="t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]  t-rounded-md t-pt-1 t-shadow-lg"
		>
			<div class="t-grid lg:t-grid-cols-6 md:t-grid-cols-1 t-gap-4 t-py-5 t-bg-white t-rounded-md t-px-4">
				{#each batchesByYear as item}
					<div class="t-col-span-1 t-text-2xl">
						<span class="t-flex t-items-center">
							<i
								class="las la-calendar t-px-2 t-font-bold t-text-transparent t-text-3xl t-text-right t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]"
							/>
							{item.year}
						</span>
					</div>
					<div class="lg:t-col-span-5 md:t-col-1 t-text-center">
						{#each item.batches as batch}
							<div class="t-grid t-grid-cols-5 t-py-2 ">
								<div class="t-col-span-4  t-text-left">{batch.name}</div>
								<div class="t-col-span-1  t-text-right t-text-2xl t-font-semibold t-text-[#44835C]">
									{batch.trainees}
								</div>
							</div>
						{/each}

						<hr />
					</div>
				{/each}
			</div>
		</div>
	</div>
	<!-- <div>
        <button on:click={next}>Click</button>
    </div> -->
</div>
