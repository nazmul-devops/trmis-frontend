<script lang="ts">
	export let course;
	export let studentCount;

</script>

<div>
	<div class="t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] t-h-24 t-rounded-md t-pt-1 t-shadow-lg">
		<div class=" t-flex t-rounded-md t-h-full  t-justify-between t-items-center t-bg-white t-px-4 ">
			<div class="t-flex t-items-center t-gap-2">
				<div>
					<img src="/assets/course-icon.svg" alt="course" class="t-h-12 t-w-12" />
				</div>
				<div><p>{course}</p>
				</div>
			</div>
			<div class="t-rounded-full  t-h-20 t-w-20 t-text-gray-900  t-justify-center t-items-center t-flex">
				<p class="t-text-align-center t-font-semibold t-text-transparent t-text-5xl t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] ">{studentCount}</p>
			</div>
		</div>
	</div>
</div>
