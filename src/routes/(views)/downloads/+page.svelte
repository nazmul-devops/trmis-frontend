<script>
	import { httpWeb } from '$lib/service/auth';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { courseCategories } from '$lib/store/courseCategory';
	import { getTrainingCourses } from '$lib/service/trainingCourse';
	import PageTitle from '$lib/PageTitle.svelte';
	import { onMount } from 'svelte';
	import DownloadCard from '$lib/DownloadCard.svelte';

	let categories = [];
	let courseMaterials = [];
	let courses = [];
	let dropdown = false;

	$: categories = $courseCategories.data;
	$: courses = $trainingCourses.data;
	
	async function getCourseMaterials(id) {
		let { data } = await httpWeb.get(`training-course/course-material/`, {
			params: { training_course_id: id }
		});
		courseMaterials = data;
	}

	function getFileType(name) {
		let fileType = name.split('.').pop();
		return fileType;
	}
	const handledropdownClick = () => (dropdown = !dropdown);

	let searchTerm = '';
	let filteredDownloads = [];

	const searchDownload = () => {
		return (filteredDownloads = categories.filter((course) => {
			let courseTitle = course.title.toLowerCase();
			return courseTitle.includes(searchTerm.toLowerCase());
		}));
	};

	onMount(() => {
		trainingCourses.getTrainingCourses()
		courseCategories.getCourseCategories();
		getCourseMaterials();
	});
</script>

<div class="sm:t-relative md:t-block">
	<PageTitle
		Title="Downloads"
		desc="To download the content, simply click on the download button after selecting the training course from the sidebar."
	/>
	<div class="md:t-container sm:t-px-4 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-32">
		<div
			class="t-grid sm:t-grid-cols-1 lg:t-grid-cols-4 lg:t-gap-4 sm:t-gap-0 sm:t-bg-white lg:t-bg-transparent"
		>
			<div class="sm:t-col-span-1">
				<div
					class={` sm:t-bg-white lg:t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] t-rounded-md t-pt-1 t-shadow-lg  lg:t-relative sm:t-absolute lg:t-block sm:t-inset-0  ${
						dropdown ? 't-block' : 't-hidden'
					}`}
				>
					<div class="t-bg-white t-mt-20 lg:t-mt-0 lg:t-mb-4">
						<div class="t-relative t-py-2 t-px-8 lg:t-px-3 t-block">
							<span class="t-absolute t-inset-y-0 t-left-8 lg:t-left-5 t-flex t-items-center t-pl-2">
								<i
									class="las la-search t-text-xl t-text-gray-400 -t-rotate-90"
								/>
							</span>
							<input
									class="placeholder:t-italic placeholder:t-text-slate-400 t-block t-bg-white t-w-full t-border t-border-slate-300 t-rounded-md t-py-2 t-pl-11 t-pr-3 t-shadow-sm focus:t-outline-none focus:t-border-sky-500 focus:t-ring-sky-500 focus:t-ring-1 sm:t-text-sm"
									type="text"
									name="searchField"
									id="searchField"
									placeholder="Search Term..."
									autocomplete="off"
									bind:value={searchTerm}
									on:input={searchDownload}
								/>
						</div>
						<p class="t-px-4 t-py-2 t-border-b-[1px] t-border-solid t-border-b-[#44835C] ">Training categories</p>
						<ul
							class={`t-leading-normal t-overflow-y-auto lg:t-max-h-[65vh] sm:t-py-8 lg:t-py-0 sm:t-px-6 lg:t-px-0`}
						>
							{#if searchTerm && filteredDownloads.length === 0}
								<p class="t-px-3 t-py-5"><strong>No Result</strong> try again!</p>
							{:else if filteredDownloads.length > 0}
								{#each filteredDownloads as filteredDownload}
									<div on:click={() => (dropdown = false)} on:keypress={() => (dropdown = false)}>
										<li
											on:click={() => getCourseMaterials(filteredDownload.id)}
											on:keypress={() => getCourseMaterials(filteredDownload.id)}
											class="t-py-5 t-px-4"
										>
											<a class="t-flex t-justify-between t-items-center t-text-black" href={`/downloads/${filteredDownload.id}/training-courses`}>
												{filteredDownload.title}
											<span class="t-ml-5 t-font-semibold t-text-transparent t-text-xl t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] hover:t-scale-110">
												<i class="las la-angle-right t-text-2xl" />
											</span>
											</a>
										</li>
										<hr />
									</div>
								{/each}
							{:else}
								{#each categories as category}
									<div on:click={() => (dropdown = false)} on:keypress={() => (dropdown = false)} class="">
										<li
											on:click={() => getCourseMaterials(category.id)}
											on:keypress={() => getCourseMaterials(category.id)}
											class="t-py-5 t-px-4 t-cursor-pointer"
										>
										<a class="t-flex t-justify-between t-items-center t-text-black" href={`/downloads/${category.id}/training-courses`}>
										{category.title}
										<span class="t-ml-5 t-font-semibold t-text-transparent t-text-xl t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] hover:t-scale-110">
											<i class="las la-angle-right t-text-2xl" />
										</span>
										</a>
										</li>
										<hr />
									</div>
								{/each}
							{/if}
						</ul>
					</div>
				</div>
				<div
					class={`  sm:t-block lg:t-hidden t-py-6 t-px-4 t-mb-2 t-rounded-md ${
						dropdown ? 't-absolute t-top-0 t-left-2' : 't-relative t-bg-white t-shadow-lg'
					}`}
					on:click={handledropdownClick}
					on:keypress={handledropdownClick}
				>
					<div class="t-z-50">
						{#if dropdown}
							<button class="t-border t-border-green-500">
								<i
									class="las la-times t-bg-clip-text t-text-transparent t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] t-text-3xl t-font-bold"
								/>
							</button>
						{:else}
							<div class="t-flex t-justify-between t-items-center">
								<div
									class="t-bg-clip-text t-text-transparent t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] t-text-3xl t-font-bold"
								>
									Select Course
								</div>
								<img src="/assets/nav-icon.svg" alt="" class="t-h-5 t-w-5" />
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="sm:t-col-span-1 md:t-col-span-3">
				<div>
					{#each courseMaterials as materials}
						<DownloadCard
							materialTitle={materials.title}
							desc={materials.description}
							fileType={getFileType(materials.title)}
							link={materials.files}
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
