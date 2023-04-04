<script>
	import { httpWeb } from '$lib/service/auth';
	import { onMount } from 'svelte';

	let noticeData = [];

	async function getNotice() {
		let { data } = await httpWeb.get('notice/home-page-notice/');
		noticeData = data;
	}

	onMount(() => {
		getNotice();
	});
</script>

<div class="">
	{#each noticeData as { title, description, files }}
		<a href={files} class="t-text-gray-500" target="_blank" rel="noreferrer">
			<div class="t-mt-4">
				<div class="">
					<div>
						<h5 class="t-text-sm lg:t-text-xl t-font-bold t-text-[#44835C]">{title}</h5>
					</div>
				</div>
				<div class="t-mt-4 t-sm:pr-8 t-mb-4">
					<!-- <p class="t-text-sm t- text-slate-500 t-pb-6">
                        {description}
                    </p> -->
					<a href={files} target="_blank" rel="noreferrer">
						<button
							class="t-bg-[#2A332F] t-text-white t-text-xs t-px-4 t-py-2 t-rounded t-shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
						>
							Continue Reading
						</button>
					</a>
				</div>
				<hr class="t-border-t-[#DDDDDD]" />
			</div>
		</a>
	{/each}
</div>
