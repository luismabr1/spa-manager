import { apiHandler, citaRepo } from 'helpers/api';

export default apiHandler({
    get: getById, //esto esta raro pide algo por id, pide una cita no un usuario con una cita
    post: createCita,
/*     put: update,
    delete: _delete, */
    get: getCitaByClientId,
});

 async function getById(req, res) {
    const client = await citaRepo.getById(req.query.id);

    if (!client) throw 'Client Not Found';

    return res.status(200).json(client);
}

/* async function getCitaByClientId(req, res) {
    const client = await clientsRepo.getById(req.query.id);

    if (!client) throw 'Client Not Found';

    return res.status(200).json(client);
} */
async function getCitaByClientId(req, res) {
/*     console.log('estoy en api/id', req.query) */
    const cita = await citaRepo.getCitaByClientId(req.query.id);
  
    if (!cita) throw 'Cita Not Found';
  
    return res.status(200).json(cita);
  }


async function createCita(req, res){
    cita = await citaRepo.create(req.query.clientId, req.query.citas);
    if (!cita) throw 'Cita no pudo crearse';

    return res.status(200).json(cita);
}

/* async function update(req, res) {
    await clientsRepo.update(req.query.id, req.body);
    return res.status(200).json({});
} */

/* async function _delete(req, res) {
    await clientsRepo.delete(req.query.id);
    return res.status(200).json({});
} */
