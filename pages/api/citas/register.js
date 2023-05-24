import { apiHandler, citaRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

async function register(req, res) {
    await citaRepo.create(req.body);
    return res.status(200).json({});
}
