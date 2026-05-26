import express  from 'express';
import { getGempa }  from '../controller/GempaController.js'
const router = express.Router()

router.get('/gempaHome/', getGempa);
export default router;