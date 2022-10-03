<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<div class="t-container t-items-center">
	<Header />
	<main class=" t-min-h-[100vh] t-container t-flex t-justify-center">
		<slot />
	</main>
	<Footer />
</div>
