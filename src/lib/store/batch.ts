import { writable } from 'svelte/store';
import * as batchServieces from '../service/batch';

function createBatchStore(){
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

    async function getBatches(){
        setLoading()
        const resp = await batchServieces.getBatches();
        set({
            loading: false,
            data: resp.data
        });
    }

    // async function getBatch(id: number){
    //     setLoading();
    //     await batchServieces.getBatch(id)
    // }

    async function deleteBatch(id: number){
        setLoading();
        await batchServieces.deleteBatch(id)
        getBatches()
    }

    async function updateBatch(payload){
        setLoading();
        await batchServieces.updateBatch(payload);
        getBatches()
    }

    async function createBatch(payload){
        setLoading();
        await batchServieces.createBatch(payload)
        getBatches();
    }

    return {
        subscribe,
        getBatches,
        deleteBatch,
        updateBatch,
        createBatch
    }
}

export const batchs = createBatchStore()