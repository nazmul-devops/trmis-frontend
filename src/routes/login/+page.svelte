<script>
	import { TextInput, ButtonSet } from 'carbon-components-svelte';
	import Login from 'carbon-icons-svelte/lib/Login.svelte';
	import { PasswordInput } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';
	import * as yup from 'yup';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import { login } from '$lib/service/auth';
	import { goto } from '$app/navigation';
	import { setAccessToken } from '$lib/store/auth';

	let message = null;
	const schema = yup.object({
		username: yup.string().required(),
		password: yup.string().required()
	});

	const { form, errors } = createForm({
		onSubmit: async (values) => {
			const { status, data } = await login(values.username, values.password);
			
			if (status == 200) {
				console.log('login');
				setAccessToken();
				goto('/admin');
			} else {
				message = 'Invalid Username Or Password';
				setTimeout(() => {
					message = null;
				}, 2000);
				goto('/login');
			}
		},
		extend: validator({ schema })
	});
</script>

<div class=" t-h-[100vh] t-flex t-items-center">
	<form class="t-p-5 t-shadow-xl" style="width: 600px; margin: auto;" use:form>
		<div class=" t-text-center t-text-transparent t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]  t-mb-5 ">
			<h2 class="t-font-bold t-text-2xl">TB Training Management Information System</h2>
			<h2 class="t-text-[#22c55e] t-font-bold t-text-2xl">Admin</h2>
		</div>
		<div class="t-mb-5">
			<TextInput
				name="username"
				labelText="User name"
				placeholder="Enter user name..."
				invalid={$errors.username}
				bind:invalidText={$errors.username}
			/>
		</div>

		<div class="t-mb-5">
			<PasswordInput
				name="password"
				labelText="Password"
				placeholder="Enter password..."
				invalid={$errors.password}
				bind:invalidText={$errors.password}
			/>
		</div>
		{#if message}
			<p class=" t-text-red-500 ">{message}</p>
		{/if}
		<div class=" t-flex t-mb-4 ">
			<ButtonSet stacked>
				<Button type="submit" class="t-bg-[#22c55e]" icon={Login}>Log in</Button>
			</ButtonSet>
		</div>
		<div class=" w-full ">
			<ButtonSet stacked>
				<Button
					type="Button"
					on:click={() => goto('/trainee-registration')}
					class="t-bg-[#22c55e] w-full"
					icon={Login}>Participants Regirtration Form</Button
				>
			</ButtonSet>
		</div>
	</form>
</div>
