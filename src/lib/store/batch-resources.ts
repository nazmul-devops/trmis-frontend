import { writable } from "svelte/store";
import * as batchResourcesService from "../service/batch-resources";

function createBatchResourceStore(){
    const { subscribe, set, update } = writable ({
        loading: true,
        data: []
    });

    function setLoading(){
        update(prev =>({
            ...prev,
            loading: true
        }))
    }

    async function getBatchResources(id: number){
        setLoading();
        const resp = await batchResourcesService.getBatchResources(id);
        set({
            loading: false,
            data: resp.data
        });
    }

    async function deleteBatchResource(batchId: number, participantId: number){
        setLoading()
        await batchResourcesService.deleteBatchResource(batchId, participantId);
        await getBatchResources(batchId)
    }

    async function createBatchResource(batchId: number, payload){
        setLoading();
        await batchResourcesService.createBatchResource(batchId, payload);
        await getBatchResources(batchId)
    }

    return {
        subscribe,
        getBatchResources,
        deleteBatchResource,
        createBatchResource
    }
}

export const batchResources = createBatchResourceStore()