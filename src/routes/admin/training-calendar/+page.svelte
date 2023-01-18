<script>
	import Calender from "./Calender.svelte";
		const today = new Date;
</script>

<Calender {today} year={2022} />