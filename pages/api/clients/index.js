import { apiHandler, clientsRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const clients = await clientsRepo.getAll();
    return res.status(200).json(clients);
}
