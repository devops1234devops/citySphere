import express from 'express';
import * as leadController from '../controllers/lead.controller.js';

const router = express.Router();

router.post('/', leadController.createLead);
router.get('/', leadController.getAllLeads);

export default router;
