<script>
	import PageTitle from '$lib/PageTitle.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import DownloadCard from './DownloadCard.svelte';

	let courses = [];
	let courseMaterials = [];

	async function getcourses() {
		let { data } = await axios.get('http://localhost:3333/courses');
		courses = data;
		getCourseMaterials(1);
	}

	async function getCourseMaterials(courseId) {
		let { data } = await axios.get(`http://localhost:3333/courseMaterials?courseId=${courseId}`);
		courseMaterials = data;
	}

	function getFileType(name) {
		let fileType = name.split('.').pop();
		return fileType;
	}

	onMount(() => {
		getcourses();
	});
</script>

<div>
	<PageTitle
		Title="Downloads"
		desc="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
    architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
    sit"
	/>
	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-pt-32  ">
		<div class="t-grid t-grid-cols-4 t-gap-4">
			<div class="t-col-span-1">
				<div
					class="t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] t-rounded-md t-pt-1 t-shadow-lg "
				>
					<div class="  t-rounded-md t-bg-white ">
						<ul class="t-leading-normal t-overflow-y-scroll t-h-screen">
							{#each courses as course}
								<div>
									<li
										on:click={() => getCourseMaterials(course.id)}
										class=" t-py-5 t-px-4 t-cursor-pointer "
									>
										{course.name}
									</li>
									<hr />
								</div>
							{/each}
						</ul>
					</div>
				</div>
			</div>

			<div class="t-col-span-3">
				<div class="">
					{#each courseMaterials as materials}
						<DownloadCard
							materialTitle={materials.title}
							desc={materials.description}
							fileType={getFileType(materials.title)}
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
