import { apiHandler, citaRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const citas = await citaRepo.getAll();
    return res.status(200).json(citas);
}
