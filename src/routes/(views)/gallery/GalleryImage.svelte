<script lang="ts">
	import { Lightbox, LightboxGallery, GalleryThumbnail, GalleryImage } from 'svelte-lightbox';
	import type { Images } from './models';

	export let images: Array<Images>;
</script>

<div class="">
	<div>
		<div class="t-container t-mx-auto t-columns-4 t-gap-0 t-py-12">
			{#each images as item}
				<div>
					<Lightbox>
						<img src={item.url} alt={item.name} class="t-w-100" />
					</Lightbox>
				</div>
			{/each}
		</div>
	</div>
</div>
