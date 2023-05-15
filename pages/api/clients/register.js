import { apiHandler, clientsRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

async function register(req, res) {
    await clientsRepo.create(req.body);
    return res.status(200).json({});
}
