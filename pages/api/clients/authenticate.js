import { apiHandler, clientsRepo } from 'helpers/api';

export default apiHandler({
    post: authenticate
});

async function authenticate(req, res) {
    const client = await clientsRepo.authenticate(req.body);
    return res.status(200).json(client);
}
