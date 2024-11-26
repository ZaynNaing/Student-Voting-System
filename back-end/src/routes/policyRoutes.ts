import express from 'express';
import { getPolicies, addPolicy, upVotePolicy, downVotePolicy } from '../controllers/policyController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getPolicies);
router.post('/', authMiddleware, addPolicy);
router.put('/:id/upvote', authMiddleware, upVotePolicy);
router.put('/:id/downvote', authMiddleware, downVotePolicy);

export default router;
