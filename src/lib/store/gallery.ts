import { writable } from "svelte/store";
import * as galleryService from '../service/gallery';

function createGalleryStore(){
    const { subscribe, set, update } = writable({
        loading: true,
        data: []
    });

    function setLoading(){
        update(prev =>({
            ...prev,
            loading: true  
        }));
    }

    async function getImages() {
        setLoading();
        const resp = await galleryService.getImages()
        set({
            loading: false,
            data: resp.data
        });
    }

    async function getImage(id:number) {
        setLoading();
        const resp = await galleryService.getImage(id);
        set({
            loading: false,
            data: resp.data
        })
    }

    async function deleteImage(id: number) {
        setLoading();
        await galleryService.deleteImage(id)

        await getImages()
    }

    async function updateImage(payload) {
        setLoading();
        await galleryService.updateImage(payload)
        await getImages()
    }

    async function createImage(payload) {
        setLoading();
        await galleryService.createImage(payload);
        await getImages()
    }

    return {
        subscribe,
        getImage,
        getImages,
        deleteImage,
        updateImage,
        createImage
    }
}

export const gallery = createGalleryStore()