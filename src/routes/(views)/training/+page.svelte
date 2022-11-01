<script>
	import PageTitle from '$lib/PageTitle.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import TrainingCard from './TrainingCard.svelte';

	let trainingData = [];

	async function getCourse() {
		let { data } = await axios.get(
			"http://localhost:3333/courses"
		);
		trainingData = data;
	}
	
	onMount(() => {
		getCourse();
	})
	


</script>

<div>
	<div>
		<PageTitle
			Title="Training"
			desc="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
        sit "
		/>
        <div class="t-container t-py-32 t-transition t-ease-in-out t-delay-150  t-hover:-translate-y-1 t-hover:scale-110 t-hover:bg-indigo-500 t-duration-300">
            <div class="t-grid t-grid-cols-2 t-gap-4">
                {#each trainingData as {name, id} }
                    <a href={`/training/${id}`} class="t-text-gray-500"><TrainingCard course ={name} /></a>
                {/each}
            </div>
        </div>
	</div>
</div>
