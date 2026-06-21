import express  from 'express';
import { getGempa, getGempaTerkini, getGempaTerkiniKoordinat, getGempaDirasakan, getGempaDirasakanKoordinat }  from '../controller/GempaController.js'
const router = express.Router()

router.get('/', getGempa);
router.get('/gempaterkini/', getGempaTerkini);
router.get('/gempaterkini/:Coordinates', getGempaTerkiniKoordinat);
router.get('/gempadirasakan/', getGempaDirasakan);
router.get('/gempadirasakan/:Coordinates', getGempaDirasakanKoordinat);
export default router;