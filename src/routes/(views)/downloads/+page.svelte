<script lang="ts">
	import { httpWeb } from '$lib/service/auth';
	import PageTitle from '$lib/PageTitle.svelte';
	import { onMount } from 'svelte';
	import DownloadCard from '$lib/DownloadCard.svelte';
	import NotFound from './NotFound.svelte';

	let courseMaterials = [];
	let dropdown = false;
	let groupedCourses = [];
	let selectedCategoryId = null;

	type View = 'category' | 'course';
	let view: View = 'category';

	function groupBy(items, key) {
		return items.reduce(
			(result, item) => ({
				...result,
				[item[key]]: [...(result[item[key]] || []), item]
			}),
			{}
		);
	}

	let searchTermCategory = '';
	let searchTermCourse = '';

	$: groupedCoursesFiltered = groupedCourses.filter((item) =>
		item.title.toLowerCase().includes(searchTermCategory.toLowerCase())
	);

	$: courses =
		groupedCourses.filter((item) => item.id == selectedCategoryId).length > 0
			? groupedCourses.filter((item) => item.id == selectedCategoryId)[0].courses
			: [];

	$: coursesFiltered = courses.filter((item) =>
		item.title.toLowerCase().includes(searchTermCourse.toLowerCase())
	);

	async function getCourses() {
		let { data } = await httpWeb.get('training-course/');
		courses = data;
		groupedCourses = Object.entries(groupBy(data, 'course_category')).map((item) => ({
			id: item[0],
			courses: item[1],
			title: item[1][0].course_category_name
		}));
		getCourseMaterials();
	}

	let seclectedCourseId;

	async function getCourseMaterials(id = null) {
		seclectedCourseId = id;
		let { data } = await httpWeb.get(`training-course/course-material/`, {
			params: { training_course_id: id }
		});
		courseMaterials = data;
	}

	function categoryClickHandler(categoryId) {
		view = 'course';
		selectedCategoryId = categoryId;
		searchTermCategory = ''
	}

	function backButtonClickHandler() {
		view = 'category';
		getCourseMaterials();
		searchTermCourse = ''	
	}

	function getFileType(name) {
		let fileType = name.split('.').pop();
		return fileType;
	}
	const handledropdownClick = () => (dropdown = !dropdown);

	let filteredDownloads = [];

	onMount(() => {
		getCourses();
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
					<div class="t-bg-white t-mt-24 lg:t-mt-0 lg:t-mb-4">
						<div class="t-relative t-py-2 t-px-3 t-block">
							<span class="t-absolute t-inset-y-0 t-left-5 t-flex t-items-center t-pl-2">
								<i class="las la-search t-text-xl t-text-gray-400 -t-rotate-90" />
							</span>

							{#if view == 'category'}
								<input
									class="placeholder:t-italic placeholder:t-text-slate-400 t-block t-bg-white t-w-full t-border t-border-slate-300 t-rounded-md t-py-2 t-pl-11 t-pr-3 t-shadow-sm focus:t-outline-none focus:t-border-sky-500 focus:t-ring-sky-500 focus:t-ring-1 sm:t-text-sm"
									type="text"
									name="searchField"
									id="searchField"
									placeholder="Search Term..."
									autocomplete="off"
									bind:value={searchTermCategory}
								/>
							{:else}
								<input
									class="placeholder:t-italic placeholder:t-text-slate-400 t-block t-bg-white t-w-full t-border t-border-slate-300 t-rounded-md t-py-2 t-pl-11 t-pr-3 t-shadow-sm focus:t-outline-none focus:t-border-sky-500 focus:t-ring-sky-500 focus:t-ring-1 sm:t-text-sm"
									type="text"
									name="searchField"
									id="searchField"
									placeholder="Search Term..."
									autocomplete="off"
									bind:value={searchTermCourse}
								/>
							{/if}
						</div>
						{#if view == 'course'}
							<div class="">
								<button
									class="t-mx-3 t-flex t-my-3 t-py-2 t-items-center t-cursor-pointer t-bg-[#44835C] t-rounded t-px-4 hover:t-bg-[#2A332F]"
									on:click={backButtonClickHandler}
									on:keypress={backButtonClickHandler}
								>
									<span
										class=" t-font-semibold t-text-transparent t-bg-clip-text t-bg-white hover:t-scale-110"
									>
										<i class="las la-angle-left t-text-2xl" />
									</span>
									<p class="t-text-white t-px-2">Back</p>
								</button>
							</div>
							<div class="t-my-4 t-border-b-[1px] t-border-solid t-border-b-[#44835C]">
								<p class="t-text-[#5E856E] t-px-3">Training Course</p>
							</div>
							{:else}
							<div class="t-my-3 t-px-2 t-border-b-[1px] t-border-solid t-border-b-[#44835C]">
								<p class="t-text-[#5E856E] t-px-1 t-py-2">Training Category</p>
							</div>
						{/if}
						<ul
							class={`t-leading-normal t-overflow-y-auto lg:t-max-h-[65vh] sm:t-py-6 lg:t-py-0 sm:t-px-6 lg:t-px-0`}
						>
							{#if view == 'category'}
								{#if groupedCoursesFiltered.length > 0}
									{#each groupedCoursesFiltered as categroy}
										<div
											on:click={() => (dropdown = false)}
											on:keypress={() => (dropdown = false)}
											class="t-overflow-x-hidden"
										>
											<li
												class="t-py-5 t-px-4 t-cursor-pointer t-flex t-justify-between t-items-center t-text-sm"
												on:click={() => categoryClickHandler(categroy.id)}
												on:keypress={() => categoryClickHandler(categroy.id)}
											>
												{categroy.title}
												<span
													class="t-ml-5 t-font-semibold t-text-transparent t-text-xl t-bg-clip-text t-bg-black hover:t-scale-110"
												>
													<i class="las la-angle-right t-text-xl" />
												</span>
											</li>
											<hr />
										</div>
									{/each}
								{:else}
									<p class="t-py-5 t-px-4 t-text-center">No Data Found</p>
								{/if}
							{:else if coursesFiltered.length > 0}
								{#each coursesFiltered as course}
									<div
										on:click={() => (dropdown = false)}
										on:keypress={() => (dropdown = false)}
										class="t-overflow-x-hidden"
									>
										<li
											class="t-py-5 t-px-4 t-cursor-pointer t-flex t-justify-between t-items-center t-text-sm"
											on:click={() => getCourseMaterials(course.id)}
											on:keypress={() => getCourseMaterials(course.id)}
											class:active={course.id === seclectedCourseId}
										>
											{course.title}
										</li>
										<hr />
									</div>
								{/each}
							{:else}
								<p class="t-py-5 t-px-4 t-text-center">No Data Found</p>
							{/if}
						</ul>
					</div>
				</div>
				<div
					class={`  sm:t-block lg:t-hidden t-py-6 t-px-4 t-mb-2 t-rounded-md ${
						dropdown ? 't-absolute t-top-0 t-right-5' : 't-relative t-bg-white t-shadow-lg'
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
					{#if courseMaterials.length > 0}
						{#each courseMaterials as materials}
							<DownloadCard
								materialTitle={materials.title}
								desc={materials.description}
								fileType={getFileType(materials.title)}
								link={materials.files}
							/>
						{/each}
					{:else}
						<NotFound />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.active {
		color: rgb(13, 145, 30);
	}
</style>
