<script lang="ts">
	interface CountNum {
		numOfResource: string;
		title: string;
	}
	let countNum: Array<CountNum> = [
		{
			numOfResource: '10',
			title: 'Number Of Male'
		},
		{
			numOfResource: '20',
			title: 'Number Of Female'
		},
		{
			numOfResource: '30',
			title: 'Number Of Resource'
		},
		{
			numOfResource: '40',
			title: 'Number Of Traineer'
		}
	];
</script>

<div class="t-grid t-grid-cols-4 t-gap-4">
	{#each countNum as count}
		<div class="t-py-2">
			<div class="t-bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] t-py-10">
				<div class="t-text-center t-font-semibold">
					<span class="t-text-4xl">{count.numOfResource}</span>
				</div>
				<div class="t-text-center t-font-semibold">
					<span class="t-text-2xl">{count.title}</span>
				</div>
			</div>
		</div>
	{/each}
</div>
