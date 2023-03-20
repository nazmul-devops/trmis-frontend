<script lang="ts">
	export let course;
    export let link;
</script>

<div>
	<div
		class="t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]  t-rounded-md t-pt-1 t-shadow-lg"
	>
		<div class=" t-rounded-md t-h-full t-bg-white t-px-4 t-py-6 ">
			<div class="t-flex t-flex-col t-justify-center t-items-center">
                <img class="t-h-[120px] t-w-[120px]" src={link} alt="Event Icon">
                <!-- <div
                    class="t-rounded-full  t-h-20 t-w-20 t-text-gray-900  t-justify-center t-items-center t-flex"
                >
                    <div
                        class="t-text-align-center t-text-transparent t-text-3xl t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] "
                    >
                        
                    </div>
                </div> -->
				<div><p class="t-text-4xl t-text-[#44835C] t-font-semibold">{course}</p></div>
			</div>
		</div>
	</div>
</div>
