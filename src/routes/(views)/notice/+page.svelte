<script>
	import PageTitle from '$lib/PageTitle.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	let noticeData = [];

	async function getNotice() {
		let { data } = await axios.get('http://localhost:3333/notice');
		noticeData = data;
		// console.log(noticeData[0]);
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
	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-24">
		{#each noticeData as { title, description, date ,fileURL}}
		     <a href={fileURL} class="t-text-gray-500" target="_blank">
			<div class="t-relative t-p-8 t-overflow-hidden t-border t-bg-white t-border-slate-100 t-rounded-lg t-mt-4 t-shadow-lg">
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
					<p class="t-text-sm t- text-slate-500 t-pb-6">
						{description}
					</p>
					<a  href={fileURL} class="t-text-xl t-font-bold  t-text-[#44835C]" target="_blank">
						Open here! <span><i class="las la-arrow-right t-text-[#F94646] t-font-bold t-text-2xl"></i></span>
					</a>
				</div>
			</div>
		</a>
		{/each}
	</div>
</div>
