import express  from 'express';
import { getCuaca, getCuacaByID }  from '../controller/CuacaController.js'
const router = express.Router()

router.get('/', getCuaca);
router.get('/cuacaID/:id_wilayah', getCuacaByID);

export default router;