<script>
	import { Button, PasswordInput, TextInput } from 'carbon-components-svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import axios from 'axios';

	let message = null;

	const schema = yup.object({
		username: yup.string().required(),
		password: yup.string().required()
	});

	const { form, errors, reset } = createForm({
		extend: validator({ schema }),
		async onSubmit(value) {
			message = 'Sending...';

			try {
				const { data } = await axios.post('http://localhost:3000/users');
				return {
					status: 201,
					data
				};
				message = 'Message Sent';
			} catch (err) {
				return Promise.resolve({
					status: 403
				});
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

<div>
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
		<Button type="submit">Submit</Button>
		{#if message}
			<p class=" t-text-red-600 ">{message}</p>
		{/if}
	</form>
</div>
