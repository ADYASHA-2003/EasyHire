import React, { useEffect, useState } from 'react'
import ApplicantActionsApiService from '../../apiService/ApplicantActionsApiService'
import JobPostCard from '../../components/JobPostCard'

const JobPostsDisplay = () => {
  const [allJobPosts, setAllJobPosts] = useState([])

    async function getData(){
      let res = await ApplicantActionsApiService.getAllJobPosts()
      console.log(res);
      if(res.status){
        setAllJobPosts(res.data)
      }
    }

    useEffect(()=>{
      getData()
    },[])

    //Early return
    if(!allJobPosts) return

  return (
    <div className='container'>
      <h3 className='mt-4 mb-4 text-center text-decoration-underline'>JOB POSTS</h3>
      <div className='row'>
        {
          allJobPosts.map(jobPosts => <JobPostCard key={jobPosts._id} jobPosts={jobPosts}/>)
        }
      </div>
    </div>
  )
}

export default JobPostsDisplay
