import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/loading'

const ViewApplications = () => {
    const { backendUrl, companyToken } = useContext(AppContext)

    const [applicants, setApplicants] = useState(false)

    // Fetch company job applications
    const fetchCompanyJobApplications = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/company/applicants',
                {
                    headers: { token: companyToken }
                }
            )

            if (data.success) {
                setApplicants(data.applications.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) { 
            toast.error(error.message)
        }
    }

    //Fn to Update job Application Status
    const changeJobApplicationStatus = async(id, status) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/company/change-status',
                {id,status},
                {headers:{token:companyToken}}
            )
            if (data.success) {
                fetchCompanyJobApplications()
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (companyToken) {
            fetchCompanyJobApplications()
        }
    }, [companyToken])

    if (applicants === null) {
        return <Loading />
    }

    return applicants ? applicants.length === 0 ? (
    <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl '>No Applications Available!!</p>
    </div>
    ) : (
        <div className='container mx-auto p-4'>
            <table className='w-full table-auto bg-white border border-gray-200 max-sm:text-sm'>
                <thead>
                    <tr className='border-b'>
                        <th className='px-4 py-2 text-center'>#</th>
                        <th className='px-4 py-2 text-left'>User Name</th>
                        <th className='px-4 py-2 text-left max-sm:hidden'>Job Title</th>
                        <th className='px-4 py-2 text-left max-sm:hidden'>Location</th>
                        <th className='px-4 py-2 text-left'>Resume</th>
                        <th className='px-4 py-2 text-left'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {applicants
                        .filter(item => item.jobId && item.userId)
                        .map((applicant, index) => (
                            <tr key={index} className='text-gray-700'>
                                <td className='px-4 py-2 border-b text-center'>
                                    {index + 1}
                                </td>

                                <td className="px-4 py-2 border-b w-64">
                                 <div className="flex items-center gap-3">
                                 <img className="w-10 h-10 rounded-full shrink-0" src={applicant.userId.image} alt=""/>
                                 <span className="font-medium"> {applicant.userId.name}
                            </span>
                        </div>
                    </td>

                                <td className='px-4 py-2 border-b w-64 max-sm:hidden'>
                                    {applicant.jobId.title}
                                </td>

                                <td className='px-4 py-2 border-b max-sm:hidden'>
                                    {applicant.jobId.location}
                                </td>

                                <td className='px-4 py-2 border-b'>
                                    <a
                                        href={applicant.userId.resume}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center'
                                    >
                                        Resume
                                        <img
                                            src={assets.resume_download_icon}
                                            alt=""
                                        />
                                    </a>
                                </td>

                                <td className='px-4 py-2 border-b relative'>
                                    {applicant.status === "Pending" 
                                    ? <div className='relative inline-block text-left group'>
                                        <button className='text-gray-500 action-button'>
                                            ...
                                        </button>

                                        <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                                            <button onClick={()=> changeJobApplicationStatus(applicant._id, 'Accepted')} className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>
                                                Accept
                                            </button>

                                            <button onClick={()=> changeJobApplicationStatus(applicant._id, 'Rejected')} className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                    : <div>{applicant.status}</div>
                                    }
                                    
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    ) : <Loading />
}

export default ViewApplications