import React, { useEffect } from 'react'
import { useState } from 'react'
import Post from '../components/Post'
import blogApis from '../utils/blogAPI'

const IndexPage = () => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    GetAllBlogs()
  }, [])

  async function GetAllBlogs() {
    try {
      const allPosts = await blogApis.Blog.all();
      setBlogs(allPosts ?? []);
      console.log(allPosts)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
    
      {
        blogs.length && blogs.map(blog => {
          return <Post key={blog.id} {...blog} />
        })
      }
    
    </>
  )
}

export default IndexPage