<script>
	import PageTitle from '$lib/PageTitle.svelte';

	import ContactInfo from './ContactInfo.svelte';
	import ContactForm from './ContactForm.svelte';
</script>

<div>
	<div>
		<div>
			<PageTitle
				Title="Contact Us"
				desc="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
							sit  "
			/>

			<div class=" t-py-32 lg:py-[120px] t-overflow-hidden t-relative z-10">
				<div class="t-container t-mx-auto">
					<div class=" t-flex t-mx-4">
						<div class="t-w-full lg:w-1/2 xl:w-6/12 t-px-4">
							<div class=" t-mb-12 lg:mb-0">
								<h2
									class="
										t-text-dark
										t-mb-6
										t-uppercase
										t-font-bold
										t-text-[32px]
										sm:text-[40px]
										lg:text-[36px]
										xl:text-[40px]
                  					"
								>
									GET IN TOUCH WITH US
								</h2>
								<p class="t-text-base t-text-body-color t-leading-relaxed t-mb-9">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius tempor
									incididunt ut labore et dolore magna aliqua. Ut enim adiqua minim veniam quis
									nostrud exercitation ullamco
								</p>

								<ContactInfo
									title={'Our Location'}
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
									iconClass={'las la-home'}
								/>

								<ContactInfo
									title={'Phone Number'}
									description={'(+00)00 000 000 0000'}
									iconClass={'las la-phone-volume'}
								/>
								<ContactInfo
									title={'Email Address'}
									description={'info@inneed.cloud'}
									iconClass={'lar la-envelope'}
								/>
							</div>
						</div>
						<div class="t-w-full lg:w-1/2 xl:w-5/12 t-px-4">
							<ContactForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
