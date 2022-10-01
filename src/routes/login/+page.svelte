<script>
	import { TextInput } from 'carbon-components-svelte';
	import { PasswordInput } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';

    let username;
    let password;

    function login(){
        console.log(username, password)
    }
</script>

<form style="width: 600px; margin: auto;">
	<TextInput labelText="User name" placeholder="Enter user name..." bind:value={username} />
	<PasswordInput labelText="Password" placeholder="Enter password..." bind:value={password} />
	<Button on:click={login}>Login</Button>
</form>
