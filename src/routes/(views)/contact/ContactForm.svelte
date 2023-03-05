<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { createContact } from '$lib/service/contact';
	import { ToastNotification } from 'carbon-components-svelte';

	let message = null;

	const schema = yup.object({
		first_name: yup.string().required(),
		last_name: yup.string().required(),
		email: yup.string().email().required(),
		phone: yup.number().required(),
		company_name: yup.string().required(),
		message: yup.string().required()
	});

	const { form, errors, createSubmitHandler, reset } = createForm({
		transform: (values: any) => {
			return {
				...values,
				phone: values.phone ? parseInt(values.phone) : null
			};
		},
		extend: validator({ schema })
	});
	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await createContact({ ...data });
			message = 'Message Sent Successfully';
			setTimeout(() => {
				message = '';
			}, 2000);
			reset();
		}
	});
</script>

<div class="t-bg-white  t-rounded-lg t-p-8 sm:p-12 t-shadow-lg">
	<form use:form on:submit={submitHandler}>
		{#if message}
			<p class="t-text-[#44835C] t-mb-5 ">{message}</p>
		{/if}
		<div class="t-grid t-grid-cols-2 t-gap-2">
			<div class="t-mb-4">
				<input
					name="first_name"
					type="text"
					placeholder="First Name"
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
				{#if $errors.first_name}
					<p>First name is required</p>
				{/if}
			</div>
			<div class="t-mb-4">
				<input
					name="last_name"
					type="text"
					placeholder="Last Name"
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
				{#if $errors.last_name}
					<p>Last name is required</p>
				{/if}
			</div>
			<div class="t-mb-4">
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
			<div class="t-mb-4">
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
				{#if $errors.phone}
					<p>Please enter a 11 digit valid phone number</p>
				{/if}
			</div>
			<div class="t-mb-4">
				<input
					name="company_name"
					type="text"
					placeholder="Your Institution"
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
				{#if $errors.company_name}
					<p>Company name is required</p>
				{/if}
			</div>
			<div class="t-mb-4 t-col-span-2">
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
				{#if $errors.message}
					<p>Message can't be empty</p>
				{/if}
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
		</div>
	</form>
</div>
