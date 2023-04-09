import { writable } from "svelte/store";
import * as trainerServices from "../service/service";

function createServiceStore(){
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

    async function getTrainers() {
        setLoading();
        const resp = await trainerServices.getTrainers();
        set({
            loading: false,
            data: resp.data
        })
    }

    async function getTrainer(id: number) {
        setLoading();
        const resp = await trainerServices.getTrainer(id);
        set({
            loading: false,
            data: resp.data
        })
    }

    return {
        subscribe,
        getTrainer,
        getTrainers
    }
}

export const service = createServiceStore()