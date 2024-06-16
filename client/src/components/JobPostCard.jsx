import React from 'react'
import {Link} from 'react-router-dom'

const JobPostCard = ({jobPosts}) => {
  return (
    <div className='card m-2'>
      <div className='card-body'>
        <h5 className='card-title'>{jobPosts.title}</h5>
        <h6 className='card-text'>{jobPosts.company}</h6>
        <p className='card-text'>{jobPosts.description}</p>
        <p>Experience: {jobPosts.experience}</p>
        <div className='align-items-end'>
          <Link to={`/application/${jobPosts._id}`} className='btn btn-primary me-2'>
            Apply Now
          </Link>
          <Link to={`/${jobPosts._id}`} className='btn btn-primary'>
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default JobPostCard
