import { writable } from 'svelte/store';
import * as batchParticipants from '../service/batch-participants';


function createBatchParticipantStore() {
    const { subscribe, set, update} = writable({ 
        loading : true, 
        data: []
    });

    function setLoading() {
        update(prev => ({
            ...prev,
            loading: true
        }));
    }

    async function getBatchParticipants(id: number) {
        setLoading();
        const res = await batchParticipants.getBatchParticipants(id)
        set({ 
            loading: false, 
            data: res.data 
        })
    }

    async function deleteBatchParticipant(batchId: number, participantId: number) {
        setLoading();
        await batchParticipants.deleteBatchParticipant(batchId, participantId);
        await getBatchParticipants(batchId)
    }

    async function createBatchParticipant(batchId: number, payload){
        setLoading();
        await batchParticipants.createBatchParticipant(batchId, payload);
        await getBatchParticipants(batchId)
    }

    return {
        subscribe,
        getBatchParticipants,
        deleteBatchParticipant,
        createBatchParticipant
    };
}

export const batchParticipantsList = createBatchParticipantStore();