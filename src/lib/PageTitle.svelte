<script>
	export let Title;
	export let desc;
</script>

<div class="t-py-12 t-text-center t-bg-[#2C2C2C] ">
	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-text-left">
		<h2 class={`t-text-6xl t-text-white t-mb-4 ${$$props.class} `}>{Title}</h2>
		<p class=" t-text-lg t-leading-relaxed t-text-white t-mt-2 md:t-w-[62%] ">{desc}</p>
	</div>
</div>
