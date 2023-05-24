import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';


const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/citas`;
console.log(baseUrl)
const citaSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('cita')));

export const citaService = {
    cita: citaSubject.asObservable(),
    get citaValue() { return citaSubject.value },

    register,
    getAll,
    getById,
    getCitaByClientId, 
    update,
    delete: _delete
};


async function register(cita) {
    await fetchWrapper.post(`${baseUrl}/register`, cita);
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function getCitaByClientId(clientId) {
    console.log(`${baseUrl}/${clientId}`)
    return await fetchWrapper.get(`${baseUrl}/${clientId}`); 
  }

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    // update stored user if the logged in user updated their own record
    if (id === citaSubject.value.id) {
        // update local storage
        const cita = { ...citaSubject.value, ...params };
        localStorage.setItem('cita', JSON.stringify(cita));

        // publish updated user to subscribers
        citaSubject.next(cita);
    }
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);

    // auto logout if the logged in user deleted their own record
    if (id === citaSubject.value.id) {
        logout();
    }
} 
