import express from 'express';
import { updatePreferences, getUserPreferences } from '../controllers/user.controller.js';

const router = express.Router();

// Define routes
router.post('/preferences', updatePreferences);
router.get('/preferences/:userId', getUserPreferences);

export default router;