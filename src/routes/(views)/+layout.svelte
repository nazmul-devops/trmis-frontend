<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<Header />
<main class="t-bg-[#ECFDF1]">
	<div class=" t-min-h-[100vh]   ">
		<slot />
	</div>
</main>
<Footer />
