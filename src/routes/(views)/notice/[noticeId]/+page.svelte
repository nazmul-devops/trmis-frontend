<script>
	import axios from "axios";
	import { onMount } from "svelte";
    import { page } from '$app/stores';
   


</script>


<p>{JSON.stringify($page.params)}</p>

