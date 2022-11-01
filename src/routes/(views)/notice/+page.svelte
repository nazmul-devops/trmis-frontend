<script>
	import PageTitle from '$lib/PageTitle.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	let noticeData = [];

	async function getNotice() {
		let { data } = await axios.get('http://localhost:3333/notice');
		noticeData = data;
	}

	onMount(() => {
		getNotice();
	});
</script>

<div>
	<div>
		<PageTitle
			Title="Notice"
			desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis at natus quibusdam earum blanditiis aliquam!"
		/>
	</div>
	<div class="t-container t-py-24">
		{#each noticeData as { title, description, date }}
			<div
				class="t-relative t-p-8 t-overflow-hidden t-border t-bg-white t-border-slate-100 t-rounded-lg t-mt-4 t-shadow-lg"
			>
				<span
					class="t-absolute t-inset-x-0 t-bottom-0 t-h-2 t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]"
				/>

				<div class="t-justify-between t-sm:flex">
					<div>
						<h5 class="t-text-xl t-font-bold t-text-slate-900">{title}</h5>
						<p class="t-mt-1 t-text-xs t-font-medium t-text-slate-600">{date}</p>
					</div>
				</div>

				<div class="t-mt-4 t-sm:pr-8">
					<p class="t-text-smt- text-slate-500">
						{description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>
