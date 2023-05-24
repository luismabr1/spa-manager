import { apiHandler, clientsRepo, citaRepo } from 'helpers/api';

export default apiHandler({
    get: getById,
    post: createCita,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const client = await clientsRepo.getById(req.query.id);

    if (!client) throw 'Client Not Found';

    return res.status(200).json(client);
}

async function getCLientWithCitaById(req, res) {
    const client = await clientsRepo.getById(req.query.id);

    if (!client) throw 'Client Not Found';

    return res.status(200).json(client);
}


async function createCita(req, res){
    cita = await citaRepo.create(req.query.clientId, req.query.citas);
    console.log(cita)
    console.log(req)
    if (!cita) throw 'Cita no pudo crearse';

    return res.status(200).json(cita);
}

async function update(req, res) {
    await clientsRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await clientsRepo.delete(req.query.id);
    return res.status(200).json({});
}
