import express from 'express'
import { getJobById, getJobs } from '../controllers/jobControllers.js';

const router = express.Router()

//Routes to get all job data
router.get('/', getJobs)

//Routes to get single job by ID
router.get('/:id', getJobById)

export default router;