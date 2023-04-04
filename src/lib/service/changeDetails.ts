import { http } from "$lib/service/auth";

export async function getDetails() {
    try{
        const {data } = await http.get(`update-user-details/`);
        return {
            status: 204,
            data
        };
    }catch (err) {
        return Promise.resolve({
            status: 403,
            data: []
        });
    }
}

export async function changeDetails(payload) {
    try{
        const {data} = await http.put(`update-user-details/`, payload);
        return {
            status: 204,
            data
        };
    }catch (err) {
        return Promise.resolve({
            status: 403
        });
    }
}