<script>
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<div>
	<Header />
	<main class=" t-min-h-[50vh] ">
		<slot />
	</main>
	<Footer />
</div>
