import { writable } from "svelte/store";
import * as eventTypeServieces from "../service/event-type"


function createEventTypeStore(){
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

    async function getEventTypes() {
        setLoading();
        const resp = await eventTypeServieces.getEventTypes();
        set({
            loading: false,
            data: resp.data
        });
    }

    async function deleteEventType(id : number) {
        setLoading();
        await eventTypeServieces.deleteEventType(id);
        await getEventTypes()
    }

    async function updateEventType(payload) {
        setLoading();
        await eventTypeServieces.updateEventType(payload);

        await getEventTypes()
    }

    async function createEventType(payload) {
        setLoading();
        await eventTypeServieces.createEventType(payload);
        getEventTypes()
    }

    return {
        subscribe,
        getEventTypes,
        deleteEventType,
        updateEventType,
        createEventType
    }
}

export const eventType = createEventTypeStore()