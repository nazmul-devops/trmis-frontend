<script>
	import { httpWeb } from '$lib/service/auth';
	import PageTitle from '$lib/PageTitle.svelte';
	import { onMount } from 'svelte';
	import DownloadCard from './DownloadCard.svelte';

	let courses = [];
	let courseMaterials = [];
	let dropdown = false;

	async function getCourses() {
		let { data } = await httpWeb.get('training-course/');
		courses = data;
		getCourseMaterials();
	}

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
	
	let searchTerm = "";
	let filteredDownloads = [];


	const searchDownload = () =>{
		return filteredDownloads = courses.filter(course =>{
			let courseTitle = course.title.toLowerCase();
			return courseTitle.includes(searchTerm.toLowerCase());
		}) 
	}

	onMount(() => {
		getCourses();
		getCourseMaterials();
	});
</script>

<div class="sm:t-relative md:t-block">
	<PageTitle
		Title="Downloads"
		desc="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
    architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
    sit"
	/>
	<div class="md:t-container sm:t-px-4  md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-32">
		<div class="t-w-full t-mb-3">
			<input 
				class="t-px-3 t-py-2" 
				type="text" 
				name="searchField" 
				id="searchField" 
				placeholder="Enter Search Term"
				autocomplete="off"
				bind:value={searchTerm}
				on:input={searchDownload}
			/>
		</div>
		<div class="t-grid sm:t-grid-cols-1 lg:t-grid-cols-4 lg:t-gap-4 sm:t-gap-0 ">
			<div class="sm:t-col-span-1">
				<div
					class={`t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] t-rounded-md t-pt-1 t-shadow-lg  lg:t-relative sm:t-absolute lg:t-block sm:t-inset-0  ${
						dropdown ? 't-block' : 't-hidden'
					}`}
				>
					<div class="t-rounded-md t-bg-white ">
						<ul
							class={`t-leading-normal t-overflow-y-scroll scrollbar lg:t-max-h-[65vh] sm:t-py-11 lg:t-py-0`}
						>

						{#if searchTerm && filteredDownloads.length === 0}
							<p><strong>No Result</strong>try again!</p>
						{:else if filteredDownloads.length > 0}
							{#each filteredDownloads as filteredDownload}
								<div on:click={() => (dropdown = false)} on:keypress={() => (dropdown = false)}>
									<li
										on:click={() => getCourseMaterials(filteredDownload.id)}
										on:keypress={() => getCourseMaterials(filteredDownload.id)}
										class="t-py-5 t-px-4 t-cursor-pointer "
									>
										{filteredDownload.title}
									</li>
									<hr />
								</div>
							{/each}
						{:else}
							{#each courses as course}
								<div on:click={() => (dropdown = false)} on:keypress={() => (dropdown = false)}>
									<li
										on:click={() => getCourseMaterials(course.id)}
										on:keypress={() => getCourseMaterials(course.id)}
										class="t-py-5 t-px-4 t-cursor-pointer "
									>
										{course.title}
									</li>
									<hr />
								</div>
							{/each}
						{/if}
							<!-- {#each courses as course}
								<div on:click={() => (dropdown = false)} on:keypress={() => (dropdown = false)}>
									<li
										on:click={() => getCourseMaterials(course.id)}
										on:keypress={() => getCourseMaterials(course.id)}
										class="t-py-5 t-px-4 t-cursor-pointer "
									>
										{course.title}
									</li>
									<hr />
								</div>
							{/each} -->
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
