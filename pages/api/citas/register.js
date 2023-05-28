import { apiHandler, citaRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

async function register(req, res) {
    await citaRepo.createCita(req.body);
    return res.status(200).json({});
}
