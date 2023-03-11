<script lang="ts">
	import { deleteImage, getImages } from '$lib/service/gallery';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Button,
		DataTableSkeleton,
		Loading,
		OverflowMenu,
		OverflowMenuItem,
		Toggle
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';

	let filteredRowIds = [];
	let headers = [
		{ key: 'title', value: 'Tilte' },
		{ key: 'description', value: 'Description' },
		{ key: 'images', value: 'Image Url' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let Images: any = [];

	let image: any;

	function openModalForm(row) {
		open = true;
		image = row;
	}

	async function doDelete() {
		await deleteImage(image.id);
		deleteModal = false;
		getImageList();
	}

	async function getImageList() {
		const { data } = await getImages();
		Images = data;
	}

	onMount(async () => {
		getImageList();
	});
</script>

{#if Images.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Gallery" description="" {headers} rows={Images}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Gallery</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<!-- <OverflowMenuItem text="View" /> -->
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							image = { ...row };
							deleteModal = true;
						}}
						danger
						text="Delete"
					/>
				</OverflowMenu>
			{:else if cell.key === 'images'}
				{#each cell.value as item}
					<li>{item.file}</li>
				{/each}
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:image on:update-list={getImageList} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={"gallery"}/>
