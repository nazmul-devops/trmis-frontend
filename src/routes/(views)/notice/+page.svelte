<script>
	import { httpWeb } from '$lib/service/auth';
	import PageTitle from '$lib/PageTitle.svelte';
	import { onMount } from 'svelte';
	let noticeData = [];

	async function getNotice() {
		let { data } = await httpWeb.get('notice/');
		noticeData = data;
	}

	onMount(() => {
		getNotice();
	});
</script>

<div>
	<div>
		<PageTitle Title="Notice" desc="Checkout all the notices..." />
	</div>
	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-24">
		{#each noticeData as { title, description, date, files }}
			<a href={files} class="t-text-gray-500" target="_blank" rel="noreferrer">
				<div
					class="t-relative t-p-8 t-overflow-hidden t-border t-bg-white t-border-slate-100 t-rounded-lg t-mt-4 t-shadow-lg"
				>
					<span
						class="t-absolute t-inset-x-0 t-bottom-0 t-h-2 t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]"
					/>

					<div class="t-justify-between t-sm:flex">
						<div>
							<h5 class="t-text-xl t-font-bold t-text-slate-900">{title}</h5>
						</div>
					</div>

					<div class="t-mt-4 t-sm:pr-8">
						<p class="t-text-sm t- text-slate-500 t-pb-6">
							{description}
						</p>
						<a
							href={files}
							class="t-text-xl t-font-bold  t-text-[#44835C] t-flex t-justify-center t-items-center"
							target="_blank"
							rel="noreferrer"
						>
							Download Now! <i class="las la-arrow-right t-text-[#F94646] t-ml-3 t-font-bold t-text-2xl" />
						</a>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
