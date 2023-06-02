import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
/* import Router from 'next/router'; */

import { fetchWrapper } from 'helpers';
import { alertService } from './alert.service'; 

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/clients`;
/* console.log('url base',baseUrl) */
const clientSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('client')));

export const clientService = {
    client: clientSubject.asObservable(),
    get clientValue() { return clientSubject.value },
/*     login,
    logout, */
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

async function register(client) {
/*     console.log(client) */
    await fetchWrapper.post(`${baseUrl}/register`, client);
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    // update stored user if the logged in user updated their own record
    if (id === clientSubject.value.id) {
        // update local storage
        const client = { ...clientSubject.value, ...params };
        localStorage.setItem('client', JSON.stringify(client));

        // publish updated user to subscribers
        clientSubject.next(client);
    }
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);

}
