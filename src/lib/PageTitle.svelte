<script>
	export let Title;
	export let desc;
</script>

<div class="t-py-12 t-text-center t-bg-[#b6f3c9]">
	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-text-left">
		<h2 class={`t-text-6xl t-text-gray-900 t-mb-4 ${$$props.class} `}>{Title}</h2>
		<p class="t-text-slate-700 t-break-normal  md:t-w-[62%] ">{desc}</p>
	</div>
</div>
