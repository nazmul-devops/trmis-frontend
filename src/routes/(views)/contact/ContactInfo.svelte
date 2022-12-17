<script>
	export let title;
	export let description;
	export let iconClass;
</script>

<div class="t-flex t-mb-8 t-max-w-[370px] t-w-full">
	<div
		class="
            t-max-w-[60px]
            sm:t-max-w-[70px]
            t-w-full
            t-h-[60px]
            sm:t-h-[70px]
            t-flex
            t-items-center
            t-justify-center
            t-mr-6
            t-overflow-hidden
            t-bg-[#b6f3c9] 
            t-text-primary
            t-rounded
            t-text-2xl
        "
	>
		<i class={iconClass} />
	</div>
	<div class="t-w-full">
		<h4 class="t-font-bold t-text-dark t-text-xl t-mb-1">{title}</h4>
		<p class="t-text-base t-text-body-color">
			{description}
		</p>
	</div>
</div>
