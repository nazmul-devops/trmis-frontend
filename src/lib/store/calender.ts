import { writable } from 'svelte/store';
import * as calenderService from '../service/calendar';


function createCalenderStore(){
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


    async function getCalenders(trainingCenter, division, district, subDistrict, year, month){
        setLoading();
        const resp = await calenderService.getCalenders(trainingCenter, division, district, subDistrict, year, month)
        set({
            loading: false,
            data: resp.data
        })
    }

    return {
        subscribe,
        getCalenders
    }
}

export const calendar = createCalenderStore()