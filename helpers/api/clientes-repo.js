import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();
const Client = db.Client;
const Cita = db.Cita;

export const clientsRepo = {
/*     authenticate, */
    getAll,
    getById,
    search,
    create,
    createCita,
    getCitasByClientId,
    update,
    delete: _delete
};
 async function getAll() {
    return await Client.find();
} 

async function getById(id) {
/*   console.log('busco el cliente', id) */
    return await Client.findById(id);
}

async function search(searchTerm) {
    return await Client.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
        { id_number: { $regex: searchTerm, $options: 'i' } } 
      ]
    });
  }

async function create(params) {
    // validate
/*     console.log('params de create', params) */
/*      if (await Client.findOne({ id_number: params.id_number })) {
        throw 'Client "' + params.id_number + '" is already register';
    }  */

    const cliente = new Client(params);

    // save cliente
    await cliente.save();
}

async function createCita(params){

  const cita = new Cita(params)

  await cita.save()
}

async function getCitasByClientId(id){
  return await Cita.findById(id);
}



async function update(id, params) {
    const cliente = await Client.findById(id);

    // validate
    if (!cliente) throw 'Client not found';
/*     if (cliente.username !== params.username && await Client.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    } */

/*     // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    } */

    // copy params properties to user
    Object.assign(cliente, params);

    await cliente.save();
}

async function _delete(id) {
    await Client.findByIdAndRemove(id);
}
