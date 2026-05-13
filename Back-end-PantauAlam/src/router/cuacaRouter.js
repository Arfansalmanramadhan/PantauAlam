import express  from 'express';
import { getCuaca, getCuacaByID }  from '../controller/CuacaController.js'
const router = express.Router()

router.get('/cuaca', getCuaca);
router.get('/cuaca/', getCuacaByID);

export default router;