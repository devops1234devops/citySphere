import express from 'express';
import * as eventController from '../controllers/event.controller.js';

const router = express.Router();

router.get('/', eventController.getAllEvents);
router.patch('/:id/status', eventController.updateEventStatus);

export default router;
