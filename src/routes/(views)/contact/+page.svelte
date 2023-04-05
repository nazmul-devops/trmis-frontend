<script>
	import PageTitle from '$lib/PageTitle.svelte';

	import ContactInfo from './ContactInfo.svelte';
	import ContactForm from './ContactForm.svelte';
</script>

<div>
	<PageTitle
		Title="Contact Us"
		desc="If you have any questions or concerns, please feel free to contact us using the information provided below."
	/>

	<div class=" t-py-32 t-overflow-hidden t-z-10 ">
		<div
			class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-grid lg:t-grid-cols-4 t-gap-4 t-place-items-center"
		>
			<div class=" t-mb-12 lg:t-mb-0 t-col-span-2 t-px-4">
				<h2
					class="
						t-text-dark
						t-mb-6
						t-uppercase
						t-font-bold
						t-text-[32px]
						sm:t-text-[40px]
						lg:t-text-[36px]
						xl:t-text-[40px]
					  "
				>
					GET IN TOUCH WITH US
				</h2>
				<p class="t-text-base t-text-body-color t-leading-relaxed t-mb-9">
					If you would like to get in touch, please feel free to send us a message via our contact
					form
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
			<div class=" t-px-4 t-col-span-2 t-w-full">
				<ContactForm />
			</div>
		</div>
	</div>
</div>
