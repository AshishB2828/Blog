import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({id,title, summary, imageURL, content, createdAt,createdByName}) => {
  return (
    <div className="post">
        <div className="image">
        <img src={imageURL} alt="" />
        </div>
        <div className="texts">
        <h2><Link to={`post/${id}`}>{title}</Link></h2>
          <p className="info">
            <a href="" className="author">{createdByName}</a>
            <time>{createdAt}</time>
          </p>
        <p className="summary">{summary}</p>
        </div>
        </div>
  )
}

export default Post