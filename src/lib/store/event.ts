import { writable } from "svelte/store";
import * as eventServices from "../service/event";

function createEventStore(){
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

    async function getEvents() {
        setLoading();
        const resp = await eventServices.getEvents();
        set({
            loading: false,
            data: resp.data
        });
    }

    async function getEvent(id : number) {
        setLoading();
        const resp = await eventServices.getEvent(id);
        set({
            loading: false,
            data: resp.data
        });
    }

    async function deleteEvent(id:number) {
        setLoading();
        await eventServices.deleteEvent(id)
        getEvents()
    }

    async function updateEvent(payload) {
        setLoading();
        await eventServices.updateEvent(payload);
        await getEvents();
    }

    async function createEvent(payload) {
        setLoading();
        await eventServices.createEvent(payload);
        await getEvents()
    }

    return {
        subscribe,
        getEvent,
        getEvents,
        deleteEvent,
        updateEvent,
        createEvent
    }
}

export const event = createEventStore()