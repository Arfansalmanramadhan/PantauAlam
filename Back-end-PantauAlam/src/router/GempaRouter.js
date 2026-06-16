import express  from 'express';
import { getGempa, getGempaTerkini, getGempaTerkiniKoordinat, getGempaDirasakan }  from '../controller/GempaController.js'
const router = express.Router()

router.get('/', getGempa);
router.get('/gempaterkini/', getGempaTerkini);
router.get('/gempaterkini/:Coordinates', getGempaTerkiniKoordinat);
router.get('/gempadirasakan/', getGempaDirasakan);
export default router;