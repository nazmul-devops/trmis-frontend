<script lang="ts">
	export let course;
</script>

<div>
	<div
		class="t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] t-h-24 t-rounded-md t-pt-1 t-shadow-lg"
	>
		<div class=" t-flex t-rounded-md t-h-full  t-justify-between t-items-center t-bg-white t-px-4 ">
			<div class="t-flex t-items-center t-gap-2">
				<div>
					<img src="/assets/trainingCategoryIcon.svg" alt="course" class="t-h-12 t-w-12 t-mr-4" />
				</div>
				<div><p>{course}</p></div>
			</div>
			<div
				class="t-rounded-full  t-h-20 t-w-20 t-text-gray-900  t-justify-center t-items-center t-flex"
			>
				<div
					class="t-text-align-center t-text-transparent t-text-2xl t-bg-clip-text  t-bg-black hover:t-bg-[#44835C] hover:t-scale-110"
				>
					<i class="las la-angle-right" />
				</div>
			</div>
		</div>
	</div>
</div>
