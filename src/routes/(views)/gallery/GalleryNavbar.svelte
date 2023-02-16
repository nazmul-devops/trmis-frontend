<script>
	export let selected = '';
	export let categories = [];
	const filterSelect = (id) => {
		selected = id;
	};
</script>

<div id="myBtnContainer">
	{#each categories as category}
		<button
			class:active={selected === category}
			class={`" t-px-4 t-py-2 ${
				selected == category.id ? ' t-text-red-600 t-bg-green-500' : '  '
			}"`}
			on:click={() => filterSelect(category.id)}
		>
			{category.title}
		</button>
	{/each}
</div>

<!-- [&.active]:t-border-b-4 [&.active]:t-border-[#44835C] -->
