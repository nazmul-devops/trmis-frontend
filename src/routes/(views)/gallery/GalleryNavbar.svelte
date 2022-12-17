<script>
	export let selected = 'All';
	let categories = ['All', 'Meeting', 'Event', 'Cultural'];
	const filterSelect = (e) => {
		selected = e.target.dataset.name;
	};
</script>

<div id="myBtnContainer">
	{#each categories as category}
		<button
			class:active={selected === category}
			class=" t-mx-4 t-py-2 [&.active]:t-border-b-4 [&.active]:t-border-[#44835C]"
			data-name={category}
			on:click={filterSelect}
		>
			{category}
		</button>
	{/each}
</div>
