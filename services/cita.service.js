import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
/* import Router from 'next/router'; */

import { fetchWrapper } from 'helpers';
import { alertService } from './alert.service'; 

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/citas`;
const citaSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('cita')));

export const citaService = {
    client: citaSubject.asObservable(),
    get citaValue() { return citaSubject.value },
/*     login,
    logout, */
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

/* async function login(username, password) {
    const client = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });

    // publish user to subscribers and store in local storage to stay logged in between page refreshes
    userSubject.next(user);
    localStorage.setItem('client', JSON.stringify(user));
}

async function login2(username, password) {
    const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });

    // publish user to subscribers and store in local storage to stay logged in between page refreshes
    userSubject.next(user);
    localStorage.setItem('client', JSON.stringify(client));
}

function logout() {
    alertService.clear();
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
} */

async function register(cita) {
    await fetchWrapper.post(`${baseUrl}/register`, cita);
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
