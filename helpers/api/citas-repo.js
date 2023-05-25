import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();
const Client = db.Client;
const Cita = db.Cita;

export const citaRepo = {
    authenticate,
    getAll,
    getById,
    search,
    create,
    createCita,
    getCitaByClientId,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const cliente = await Client.findOne({ username });

    if (!(cliente || bcrypt.compareSync(password, cliente.hash))) {
        throw 'Username or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: cliente.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    return {
        ...cliente.toJSON(),
        token
    };
}

async function getAll() {
    return await Cita.find();
}

async function getById(id) {
    return await Cita.findById(id);
}

/* async function getCLientWithCitaById(id){
  cita = await Cita.findById(id)

  return cita.clientId
} */

async function getCitaByClientId(clientId) {
  
/*   const cita = await Cita.findOne({ clientId }); */
  const cita = await Client.findOne({ clientId }).exec() 
  if (!cita) {
    throw 'No se encontró ninguna cita para el cliente proporcionado';
  }
  return cita;
}

async function search(searchTerm) {
    return await Client.find({
      $or: [
        { username: { $regex: searchTerm, $options: 'i' } },
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } }
      ]
    });
  }

async function create(params) {
    // validate
/*     if (await Cita.findOne({ cita: params.clienId })) {
        throw 'Cita "' + params.clientId + '" is already taken';
    } */
    console.log(params)
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

async function getCitasByClientId(id){
  return await Cita.findById(id);
}



async function update(id, params) {
    const cliente = await Client.findById(id);

    // validate
    if (!cliente) throw 'Client not found';
    if (cliente.username !== params.username && await Client.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // copy params properties to user
    Object.assign(cliente, params);

    await cliente.save();
}

async function _delete(id) {
    await Client.findByIdAndRemove(id);
}
