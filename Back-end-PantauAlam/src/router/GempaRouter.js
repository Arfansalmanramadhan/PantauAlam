import express  from 'express';
import { getGempa, getGempaTerkini, getGempaDirasakan }  from '../controller/GempaController.js'
const router = express.Router()

router.get('/', getGempa);
router.get('/gempaterkini/', getGempaTerkini);
router.get('/gempadirasakan/', getGempaDirasakan);
export default router;