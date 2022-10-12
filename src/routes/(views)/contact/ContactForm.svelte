<script>
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import axios from 'axios';

	let message = null;

	const schema = yup.object({
		name: yup.string().required(),
		email: yup.string().email().required()
	});

	const { form, errors, reset } = createForm({
		extend: validator({ schema }),
		async onSubmit(value) {
			message = 'Sending...';

			try {
				const resp = await axios.post('https://jsonplaceholder.typicode.com/todos/', value);
				message = 'Message Sent';
			} catch (err) {
				message = 'Some error ...';
			} finally {
				reset();
				setTimeout(() => {
					message = null;
				}, 3000);
			}
		}
	});
</script>

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

		{#if message}
			<p>{message}</p>
		{/if}
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
