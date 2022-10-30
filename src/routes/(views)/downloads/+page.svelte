<script>
	import PageTitle from '$lib/PageTitle.svelte';
	import DownloadCard from './DownloadCard.svelte';
</script>

<div>
	<PageTitle
		Title="Downloads"
		desc="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
    architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
    sit"
	/>
	<div class="t-container t-py-32 ">
		<div class="t-grid t-grid-cols-4 t-gap-4">
					<div class="t-col-span-1">
						<div
							class="t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] t-rounded-md t-pt-1 t-shadow-lg "
						>
							<div
								class="  t-rounded-md t-bg-white "
							>
								<ul class="t-leading-normal">
										<div>
											<li class=" t-py-5 t-px-4">Lorem ipsum dolor sit amet</li>
										<hr >
										</div>
										<div>
											<li class=" t-py-5 t-px-4">Lorem ipsum dolor sit amet</li>
										<hr >
										</div>
										<div>
											<li class=" t-py-5 t-px-4">Lorem ipsum dolor sit amet</li>
										<hr >
										</div>
										<div>
											<li class=" t-py-5 t-px-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nobis architecto eos officiis possimus nam.</li>
										<hr >
										</div>
								</ul>
							</div>
						</div>
					</div>
		
					<div class="t-col-span-3">
						<div class="">
							<DownloadCard Icon="las la-file-download" />
							<DownloadCard Icon="las la-file-powerpoint" />
							<DownloadCard Icon="las la-video" />
						</div>
					</div>
		</div>
	</div>

</div>
