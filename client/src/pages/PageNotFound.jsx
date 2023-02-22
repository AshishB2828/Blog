import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='flex-center'>
        <div>404 | Page not found!</div>
        <Link to={"/"}>Go Back</Link>
    </div>
  )
}

export default PageNotFound