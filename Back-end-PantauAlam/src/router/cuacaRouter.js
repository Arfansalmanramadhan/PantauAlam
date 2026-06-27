import express  from 'express';
import { getCuacaRumah, getCuaca, getCuacaByID }  from '../controller/CuacaController.js'
const router = express.Router()

router.get('/', getCuacaRumah);
router.get('/cuaca', getCuaca);
router.get('/cuacaID/:id_wilayah', getCuacaByID);

export default router;