import Job from "../models/Job.js"
import JobApplication from "../models/jobApplication.js"
import User from "../models/user.js"
import {v2 as cloudinary} from 'cloudinary'
import { getAuth } from "@clerk/express";

//Get user data
export const getUserData = async (req, res) => {

    return res.json({
        success: true,
        message: "user route working"
    })

}

//Apply for a job
export const applyForJob = async(req,res) => {
    const {jobId} = req.body
    const { userId } = getAuth(req);

    try {
        const isAlreadyApplied = await JobApplication.find({jobId, userId})
        if( isAlreadyApplied.length > 0){
            return res.json({success:false, message:'Already Applied'})
        }

        const jobData = await Job.findById(jobId)

        if(!jobData){
            return res.json({success:false, message:'Job Not Found'})
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        return res.json({success:true, message:'Applied Successfully'})

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

//Get user applied applications
export const getUserJobApplications = async(req,res) => {
    try {
        const { userId } = getAuth(req);
        const applications = await JobApplication.find({userId})
        .populate('companyId', 'name email image')
        .populate('jobId','title description location category level salary')
        .exec() 

        if(!applications){
            return res.json({success:false, message:'No Job Applications Found'})
        }

        return res.json({success:true, applications})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

//Update user Profile (resume)
export const updateUserResume = async(req,res) => {
    try {
        const { userId } = getAuth(req);
        const resumeFile = req.file
        const userData = await User.findById(userId)

        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }
        await userData.save()

        return res.json({success:true, message:'Resume Updated'})

    } catch (error) {
        res.json({success:false, message:error.message})
    }

}