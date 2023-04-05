<script>
	export let selected = '';
	export let categories = [];
	const filterSelect = (id) => {
		selected = id;
	};
</script>

<div id="myBtnContainer" class="t-flex t-justify-between">
	{#each categories as category}
		<div class="t-mr-3 last-of-type:t-mr-0">
			<button
				class:active={selected === category.id}
				class=" t-px-4 t-py-2"
				on:click={() => filterSelect(category.id)}
			>
				{category.title}
			</button>
			<div 
				class:activated={selected === category.id}
			/>
		</div>
	{/each}
</div>

<!-- [&.active]:t-border-b-4 [&.active]:t-border-[#44835C] -->

<style>
	.active {
		color: #44835C;
	}
	.activated {
		height: 4px;
		width: 100%;
		border-radius: 10px;
		background: #44835C;
		}
</style>
