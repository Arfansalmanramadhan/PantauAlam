import express  from 'express';
import { getGempa, getGempaTerkini, getGempaTerkiniTanggal, getGempaDirasakan }  from '../controller/GempaController.js'
const router = express.Router()

router.get('/', getGempa);
router.get('/gempaterkini/', getGempaTerkini);
router.get('/gempaterkini/:Tanggal', getGempaTerkiniTanggal);
router.get('/gempadirasakan/', getGempaDirasakan);
export default router;