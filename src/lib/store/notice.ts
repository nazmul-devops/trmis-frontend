import { writable } from "svelte/store";
import * as noticeServices from '../service/notice';

function createNoticeStore(){
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

    async function getNotices() {
        setLoading();
        const resp = await noticeServices.getNotices()

        set({
            loading: false,
            data: resp.data
        })
    }

    async function getNotice(id: number) {
        setLoading();
        const resp = await noticeServices.getNotice(id)

        set({
            loading: false,
            data: resp.data
        })
    }

    async function deleteNotice(id:number) {
        setLoading();
        await noticeServices.deleteNotice(id);
        await getNotices();
    }

    async function updateNotice(payload) {
        setLoading();
        await noticeServices.updateNotice(payload);
        await getNotices()
    }

    async function createNotice(payload) {
        setLoading()
        await noticeServices.createNotice(payload);
    }

    return {
        subscribe,
        getNotice,
        getNotices,
        updateNotice,
        deleteNotice,
        createNotice
    }
}

export const notice = createNoticeStore()