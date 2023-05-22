/* import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();
const Client = db && db.Client;
const Cita = db && db.Cita;

export const usersRepo = {
  authenticate, 
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function authenticate({ username, password }) {
  const client = await Client.findOne({ username });
  
  if (!(client || bcrypt.compareSync(password, client.hash))) {
    throw 'Username or password is incorrect';
  }
  
  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: client.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });
  
    return {
        ...client.toJSON(),
        token
    };
  } 

async function getAll() {
    if (!Client) {
        throw new Error('Client model is not defined');
    }

    return await Client.find();
}

async function getById(id) {
    return await Client.findById(id);
}

async function create(params) {
    // validate
    if (await Client.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    const client = new Client(params);

    // hash password
    if (params.password) {
        client.hash = bcrypt.hashSync(params.password, 10);
      }
      
      // save user
    await client.save();
  }
  
  async function update(id, params) {
    const client = await Client.findById(id);
    
    // validate
    if (!client) throw 'client not found';
    if (client.username !== params.username && await Client.findOne({ username: params.username })) {
      throw 'Username "' + params.username + '" is already taken';
    }
    
    // hash password if it was entered
    if (params.password) {
      params.hash = bcrypt.hashSync(params.password, 10);
    }
    
    // copy params properties to user
    Object.assign(client, params);
    
    await client.save();
  }
  
  async function _delete(id) {
    await Client.findByIdAndRemove(id);
  } 
   */

import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();
const Client = db.Client;
const Cita = db.Cita;

export const clientsRepo = {
    authenticate,
    getAll,
    getById,
    search,
    create,
    createCita,
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
    return await Client.find();
}

async function getById(id) {
    return await Client.findById(id);
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
    if (await Client.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    const cliente = new Client(params);

    // hash password
    if (params.password) {
        cliente.hash = bcrypt.hashSync(params.password, 10);
    }

    // save cliente
    await cliente.save();
}

async function createCita(params){
  console.log(params)

  const cita = new Cita(params)

  await cita.save()
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
