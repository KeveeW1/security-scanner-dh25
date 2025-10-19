import express from 'express';
import { analyzecode, getScan, getAllScans, chatWithAI } from '../controllers/scanController.js';

const router = express.Router();

router.post('/analyze', analyzecode);
router.get('/scans', getAllScans);
router.get('/scans/:id', getScan);
router.post('/chat', chatWithAI);

export default router;
