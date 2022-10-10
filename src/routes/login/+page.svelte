<script>
	import { TextInput } from 'carbon-components-svelte';
	import { PasswordInput } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';
	import * as yup from 'yup';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import { login } from '$lib/service/auth';
	import { goto } from '$app/navigation';
	import { setAccessToken } from '$lib/store/auth';
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
				goto('/admin')
			} else {
				console.log('bad ...');
				goto('/login')
			}
		},
		extend: validator({ schema })
	});
</script>

<form style="width: 600px; margin: auto;" use:form>
	<TextInput
		name="username"
		labelText="User name"
		placeholder="Enter user name..."
		invalid={$errors.username}
		bind:invalidText={$errors.username}
	/>
	<PasswordInput
		name="password"
		labelText="Password"
		placeholder="Enter password..."
		invalid={$errors.password}
		bind:invalidText={$errors.password}
	/>
	<Button type="submit">Login</Button>
</form>
