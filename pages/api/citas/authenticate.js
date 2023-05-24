import { apiHandler, citaRepo } from 'helpers/api';

export default apiHandler({
    post: authenticate
});

async function authenticate(req, res) {
    const client = await citaRepo.authenticate(req.body);
    return res.status(200).json(client);
}
