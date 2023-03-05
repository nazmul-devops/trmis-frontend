import { writable } from "svelte/store";
import * as contactService from '../service/contact';

function createContactStore(){
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

    async function getContacts() {
        setLoading();
        const resp = await contactService.getContacts();
        set({
            loading: false,
            data: resp.data
        })
    }
    
    async function createContact(payload){
        setLoading();
        await contactService.createContact(payload);
        getContacts()
    }

    async function deleteContact(id: number){
        setLoading();
        await contactService.deleteContact(id);
        getContacts()
    }

    return {
        subscribe,
        getContacts,
        createContact,
        deleteContact
    }

}

export const contact = createContactStore()
