import express from 'express';
import appLinksController from '../controllers/appLinksController.js';
import { authentication, authorization } from '../middleware/auth.js';

const router = express.Router();

// Create AppLinks
// Public routes - no authentication required
router.get('/get-app-links', appLinksController.getAllAppLinks);
router.get('/get-app-link/:id', appLinksController.getAppLinksById);

// Private routes - authentication required
router.post('/create-app-link', authentication, authorization([1]), appLinksController.createApp );
router.put('/update-app-link/:id', authentication, authorization([1]), appLinksController.updateAppLinks);
router.delete('/delete-app-link/:id', authentication, authorization([1]), appLinksController.deleteApp);

export default router;