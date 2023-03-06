import { writable } from 'svelte/store';
import * as batchSessionsService from "../service/batch-sessions-detail";


function createBatchSessionStore(){
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

    async function getBatchSessions(id: number){
        setLoading()
        const resp = await batchSessionsService.getBatchSessions(id);

        set({
            loading: false,
            data: resp.data
        });
    }

    async function deleteBatchSession(batchId: number, sessionId: number){
        setLoading();
        await batchSessionsService.deleteBatchSession(batchId, sessionId);
        await getBatchSessions(batchId)
    }

    async function updateBatchSession( batchId: number, payload){
        setLoading();
        await batchSessionsService.updateBatchSession(batchId, payload);
        await getBatchSessions(batchId);
    }

    async function createBatchSession(batchId: number, payload){
        setLoading();
        await batchSessionsService.createBatchSession(batchId, payload);
        await getBatchSessions(batchId)
    }

    return {
        subscribe,
        getBatchSessions,
        deleteBatchSession,
        updateBatchSession,
        createBatchSession
    }

}

export const batchSession = createBatchSessionStore()