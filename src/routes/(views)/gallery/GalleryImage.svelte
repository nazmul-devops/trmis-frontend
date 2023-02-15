<script lang="ts">
	import { Lightbox, LightboxGallery, GalleryThumbnail, GalleryImage } from 'svelte-lightbox';

	export let images = [];
</script>

<div>
	<div>
		<div class="t-container t-mx-auto t-columns-4 t-gap-0 t-py-12">
			{#each images as item}
				<div>
					<Lightbox description={item.title}>
						<img src={item.file} alt={item.title} class="t-w-100" />
					</Lightbox>
				</div>
			{/each}
		</div>
	</div>
</div>
