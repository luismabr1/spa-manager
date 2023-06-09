import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();
const Client = db.Client;
const Cita = db.Cita;

export const citaRepo = {
    getAll,
    getById,
    search,
    create,
    createCita,
    getCitaByClientId,
    getClientIdByCita,
    getCitaByDate,
    update,
    delete: _delete
};

async function getAll() {
    return await Cita.find();
}
async function getCitaByDate(citaDate) {
  console.log('veo que llega a getCitaByDate',citaDate)
  const cita = await Cita.findOne({ cita: citaDate }).exec();
  
/*   if (!cita) {
    throw 'No se encontró ninguna cita para la fecha proporcionada';
  } */
  
  return cita.clientId;
}

async function getById(id) {
    return await Cita.findById(id);
}

async function getCitaByClientId(clientId) {
  const client = await Client.findById(clientId);
  
  if (!client) {
    throw 'Cliente no encontrado';
  }

  const cita = await Cita.findOne({ clientId }).exec();
  
 
  return cita.cita;
}

async function getClientIdByCita(date) {
  const cita = await Cita.findOne({ cita: date });
  if (cita) {
    return cita.clientId;
  } else {
    return null;
  }
}


async function search(searchTerm) {
    return await Client.find({
      $or: [
/*         { username: { $regex: searchTerm, $options: 'i' } }, */
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
         { id_number: { $regex: searchTerm, $options: 'i' } } 
      ]
    });
  }

async function create(params) {
    // validate
/*     if (await Cita.findOne({ cita: params.clienId })) {
        throw 'Cita "' + params.clientId + '" is already taken';
    } */
/*     console.log(params) */
    const cita = new Cita(params);

    // hash password
/*     if (params.password) {
      cita.hash = bcrypt.hashSync(params.password, 10);
    }
 */
    // save cliente
    await cita.save();
}

async function createCita(params){

  const cita = new Cita(params)

  await cita.save()
}



async function update(id, params) {
    const cliente = await Client.findById(id);

    // validate
    if (!cliente) throw 'Client not found';

    Object.assign(cliente, params);

    await cliente.save();
}

async function _delete(id) {
    await Client.findByIdAndRemove(id);
}


