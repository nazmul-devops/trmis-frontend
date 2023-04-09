import { writable } from "svelte/store";
import * as scheduleEvents from "../service/schedule-events";


function createEventScheduleStore(){
    const { subscribe, set , update } = writable({
        loading: true,
        data: []
    })

    function setLoading(){
        update(prev =>({
            ...prev,
            loading: true
        }));
    }

    async function getEventSchedules() {
        setLoading();

        const res = await scheduleEvents.getEventSchedules();
        set({
            loading: false,
            data: res.data
        });
    }

    async function deleteEventSchedule (id: any){
        setLoading();

        await scheduleEvents.deleteEventSchedule(id);
        await getEventSchedules()
    }

    async function updateEventSchedule(payload){
        setLoading();

        await scheduleEvents.updateEventSchedule(payload);
        await getEventSchedules();
    }

    async function createEventSchedule(payload){
        setLoading();

        await scheduleEvents.createEventSchedule(payload);
        await getEventSchedules();
    }

    return {
        subscribe,
        getEventSchedules,
        deleteEventSchedule,
        updateEventSchedule,
        createEventSchedule
    };
}

export const scheduleEventsLists = createEventScheduleStore();