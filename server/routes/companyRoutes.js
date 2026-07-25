import express from 'express'
import upload from '../config/multer.js'
import { changeJobApplicationsStatus, changeVisibility, registerCompany, loginCompany, getCompanyData, postJob, getCompanyJobApplicants, getCompanyPostedJobs } from '../controllers/companyController.js'
import { protectCompany } from '../middlewares/authMiddlewares.js'

const router = express.Router()

//Register a company
router.post('/register', upload.single('image'), registerCompany)

//Company login
router.post('/login', loginCompany)

//Get company data
router.get('/company', protectCompany, getCompanyData)

//Post a job
router.post('/post-job', protectCompany, postJob)

//Get applicants data of company
router.get('/applicants', protectCompany, getCompanyJobApplicants)

//Get company job list
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)

//Change application status
router.post('/change-status', protectCompany, changeJobApplicationsStatus)

//Change applications visibility
router.post('/change-visibility', protectCompany, changeVisibility)

export default router






