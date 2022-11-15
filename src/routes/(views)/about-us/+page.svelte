<script>
	import PageTitle from '$lib/PageTitle.svelte';
</script>

<div>
	<div>
		<div>
			<PageTitle
				Title="About Us"
				desc="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
							sit  "
			/>
			<div
				class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-32 t-grid md:t-grid-cols-2 "
			>
				<div
					class="t-bg-[#44835C]  t-text-white t-text-center t-flex t-justify-center t-flex-col t-col-span-1 t-justify-center t-items-center t-py-4"
				>
					<h4 class="t-text-xl t-uppercase t-font-light  t-mb-1">hello</h4>
					<p class="t-font-display t-text-xl sm:t-text-left md:t-text-justify t-px-8">
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
						laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
						architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
						sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
						voluptatem sequi nesciunt.
					</p>
				</div>
				<div class="t-col-span-1">
					<img src="/assets/bg-img.jpg" alt="" class="t-h-full" />
				</div>
			</div>
		</div>
	</div>
</div>
