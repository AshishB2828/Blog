import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({id,title, summary, imageURL, content, createdAt,createdByName}) => {
  return (
    <div className="post">
        <div className="image post-image">
            <img src={imageURL} alt="" />
        </div>
        <div className="texts">
        <h2 className='post-title'><Link to={`/post/${id}`}>
            {title.length < 10 ? title : <>{title.substring(0,15)}....</>}
          </Link></h2>
          <p className="info">
            <a href="" className="author">{createdByName}</a>
            <time>{createdAt}</time>
          </p>
        <p className="summary">{summary.length <450 ? <>{summary}</> 
                              : <>{ String(summary).substring(0, 500)}.........</> }</p>
        </div>
        </div>
  )
}

export default Post