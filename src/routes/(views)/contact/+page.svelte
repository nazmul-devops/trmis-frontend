<script>
	import Email from 'carbon-icons-svelte/lib/Email.svelte';
	import Store from 'carbon-icons-svelte/lib/Store.svelte';

	import PageTitle from '$lib/PageTitle.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';

	const schema = yup.object({
		name: yup.string().required(),
		email: yup.string().email().required()
	});

	const { form, errors, reset } = createForm({
		extend: validator({ schema }),
		onSubmit(value) {
			console.log(value);
			setTimeout(() => {
				reset();
			}, 1500);
		}
	});
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
								<div class="t-flex t-mb-8 t-max-w-[370px] t-w-full">
									<div
										class="
											t-max-w-[60px]
											sm:max-w-[70px]
											t-w-full
											t-h-[60px]
											sm:h-[70px]
											t-flex
											t-items-center
											t-justify-center
											t-mr-6
											t-overflow-hidden
											t-bg-[#b6f3c9] 
											t-text-primary
											t-rounded
										"
									>
										<Store />
									</div>
									<div class="t-w-full">
										<h4 class="t-font-bold t-text-dark t-text-xl t-mb-1">Our Location</h4>
										<p class="t-text-base t-text-body-color">
											Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, unde.
										</p>
									</div>
								</div>

								<div class="t-flex t-mb-8 t-max-w-[370px] t-w-full">
									<div
										class="
											t-max-w-[60px]
											sm:max-w-[70px]
											t-w-full
											t-h-[60px]
											sm:h-[70px]
											t-flex
											t-items-center
											t-justify-center
											t-mr-6
											t-overflow-hidden
											t-bg-[#b6f3c9] 
											t-text-primary
											t-rounded
										"
									>
										<img src="assets/phone-svg.svg" alt="" />
									</div>
									<div class="t-w-full">
										<h4 class="t-font-bold t-text-dark t-text-xl t-mb-1">Phone Number</h4>
										<p class="t-text-base t-text-body-color">(+00)00 000 000 0000</p>
									</div>
								</div>
								<div class="t-flex t-mb-8 t-max-w-[370px] t-w-full">
									<div
										class="
											t-max-w-[60px]
											sm:max-w-[70px]
											t-w-full
											t-h-[60px]
											sm:h-[70px]
											t-flex
											t-items-center
											t-justify-center
											t-mr-6
											t-overflow-hidden
											t-bg-[#b6f3c9] 
											t-text-primary
											t-rounded
										"
									>
										<Email />
									</div>
									<div class="t-w-full">
										<h4 class="t-font-bold t-text-dark t-text-xl t-mb-1">Email Address</h4>
										<p class="t-text-base t-text-body-color">info@inneed.cloud</p>
									</div>
								</div>
							</div>
						</div>
						<div class="t-w-full lg:w-1/2 xl:w-5/12 t-px-4">
							<div class="t-bg-white  t-rounded-lg t-p-8 sm:p-12 t-shadow-lg">
								<form use:form>
									<div class="t-mb-6">
										<input
											name="name"
											type="text"
											placeholder="Your Name"
											class="
												t-w-full
												t-rounded
												t-py-3
												t-px-[14px]
												t-text-body-color t-text-base
												t-border t-border-[f0f0f0]
												t-outline-none
												t-focus-visible:t-shadow-none
												t-focus:t-border-primary
											"
										/>
										{#if $errors.name}
											<p>{$errors.name}</p>
										{/if}
									</div>
									<div class="t-mb-6">
										<input
											name="email"
											type="email"
											placeholder="Your Email"
											class="
												t-w-full
												t-rounded
												t-py-3
												t-px-[14px]
												t-text-body-color t-text-base
												t-border t-border-[f0f0f0]
												t-outline-none
												t-focus-visible:shadow-none
												t-focus:border-primary
											"
										/>
										{#if $errors.email}
											<p>{$errors.email}</p>
										{/if}
									</div>
									<div class="t-mb-6">
										<input
											name="phone"
											type="text"
											placeholder="Your Phone"
											class="
												t-w-full
												t-rounded
												t-py-3
												t-px-[14px]
												t-text-body-color t-text-base
												t-border t-border-[f0f0f0]
												t-outline-none
												t-focus-visible:shadow-none
												t-focus:border-primary
											"
										/>
									</div>
									<div class="t-mb-6">
										<textarea
											name="message"
											rows="6"
											placeholder="Your Message"
											class="
												t-w-full
												t-rounded
												t-py-3
												t-px-[14px]
												t-text-body-color t-text-base
												t-border t-border-[f0f0f0]
												t-resize-none
												t-outline-none
												t-focus-visible:shadow-none
												t-focus:border-primary
											"
										/>
									</div>
									<div>
										<button
											type="submit"
											class="
												t-w-full
												t-text-white
												t-bg-[#44835C]
												t-rounded
												t-border t-border-primary
												t-p-3
												t-transition
												t-hover:bg-opacity-90
											"
										>
											Send Message
										</button>
									</div>
								</form>
								<div>
									<span class="t-absolute t--top-10 t--right-9 t-z-[-1]">
										<img src="/assets/dot-img.svg" alt="" />
									</span>
									<span class="t-absolute t--right-10 t-top-[90px] t-z-[-1]">
										<img src="/assets/dot.svg" alt="" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
