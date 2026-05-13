import express  from 'express';
import { getCuaca }  from '../controller/CuacaController.js'
const router = express.Router()

router.get('/cuaca', getCuaca);

export default router;