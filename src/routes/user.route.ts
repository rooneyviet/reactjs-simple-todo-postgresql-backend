import express from 'express';
import { getMeHandler } from '../controllers/user.controller';
const router = express.Router();



// Get currently logged in user
router.get('/me', getMeHandler);

export default router;