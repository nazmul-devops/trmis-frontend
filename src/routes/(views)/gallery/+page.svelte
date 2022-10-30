<script lang="ts">
	import PageTitle from '$lib/PageTitle.svelte';
	import GalleryImages from './GalleryImage.svelte';
	import GalleryNavbar from './GalleryNavbar.svelte';
	import type { Images } from './models';

	let selected = 'All';

	let images: Array<Images> = [
		{
			url: 'assets/photo1.jpg',
			name: 'all',
			key: 'Meeting'
		},
		{
			url: 'assets/photo2.jpg',
			name: 'all',
			key: 'Event'
		},
		{
			url: 'assets/photo3.jpg',
			name: 'Cultural',
			key: 'Cultural'
		},
		{
			url: 'assets/photo4.jpg',
			name: 'all',
			key: 'Cultural'
		},
		{
			url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQle0ohP4I57j0FK5n4WdNkv_K_Rp2hWZeSTc9p6_n-ke96fEX6LoiYp9L2RFlvncOTZU0&usqp=CAU',
			name: 'all',
			key: 'Meeting'
		},
		{
			url: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
			name: 'all',
			key: 'Meeting'
		},
		{
			url: 'https://static.vecteezy.com/packs/media/vectors/term-bg-1-666de2d9.jpg',
			name: 'all',
			key: 'Meeting'
		}
	];

	let activeImages = [...images];

	$: {
		if (selected == 'All') {
			activeImages = [...images];
		} else {
			activeImages = images.filter((image) => image.key == selected);
		}
		console.log(activeImages);
	}
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
			<GalleryNavbar bind:selected />
		</div>
		<div>
			<GalleryImages bind:images={activeImages} />
		</div>
	</div>
</div>
