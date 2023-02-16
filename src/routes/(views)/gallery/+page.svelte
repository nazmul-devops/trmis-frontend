<script lang="ts">
	import PageTitle from '$lib/PageTitle.svelte';
	import { getImages } from '$lib/service/gallery';
	import { onMount } from 'svelte';
	import GalleryImages from './GalleryImage.svelte';
	import GalleryNavbar from './GalleryNavbar.svelte';

	let selected = '';

	let images: Array<any>;
	let categories: [];
	let allData = [];

	$: {
		let index = allData.findIndex((item) => item.id == selected);
		if (index >= 0) {
			images = allData[index].images;
		}
	}

	onMount(async () => {
		const { data } = await getImages();
		categories = data.map((item) => ({
			id: item.id,
			title: item.title
		}));
		selected = data[0]?.id;
		images = data[0].images;
		allData = data;
	});
</script>

<div>
	<div>
		<div>
			<PageTitle
				Title="Gallery"
				desc="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
							laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
							architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
							sit  "
			/>
		</div>
	</div>
	<div class="t-container t-py-32">
		<div class="t-flex t-justify-center t-text-xl t-font-bold">
			<GalleryNavbar bind:selected bind:categories />
		</div>
		<div>
			<GalleryImages bind:images />
		</div>
	</div>
</div>
