<script>
	import { Button } from 'carbon-components-svelte';
	import ResetPassModal from './ResetPassModal.svelte';
	import { onMount } from 'svelte';
	import EditInfoModal from './EditInfoModal.svelte';
	import { getProfileInfo } from './service';
	let resetPassModal = false;
	let open = false;
	let profileData = {};
	function openResetPassModal() {
		resetPassModal = true;
	}
	function openEditInfoModal() {
		open = true;
	}

	async function getUserProfile() {
		let { data } = await getProfileInfo();
		profileData = data;
	}

	onMount(() => {
		getUserProfile();
	});
</script>

<div>
	<h1>{profileData.userName}</h1>
	<h1>{profileData.firstName}</h1>
	<h1>{profileData.lastName}</h1>
	<div />
	<Button on:click={() => openResetPassModal()}>Edit Password</Button>
	<Button on:click={() => openEditInfoModal()}>Edit Profile</Button>
	<ResetPassModal bind:open={resetPassModal} />
	<EditInfoModal bind:open on:updateDone={getUserProfile} />
</div>
