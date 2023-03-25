import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Post from '../components/Post'
import blogApis from '../utils/blogAPI'
import { useNavigate } from 'react-router-dom'
import { isTokenExist } from '../utils/getToken'


const IndexPage = () => {

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if(isTokenExist()) {
      GetAllBlogs();
    }else{
      navigate("/login")
    }
  }, [])

  async function GetAllBlogs() {
    try {
      setLoading(true);
      const allPosts = await blogApis.Blog.all();
      setBlogs(allPosts ?? []);
      setLoading(false);
      // console.log(allPosts)
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  if(loading) return <div>Loading....</div>
  return (
    <>
      {/* <Link className='postCreateBtn' to={"/create-post"}>New Post</Link> */}
      {
        blogs.length && blogs.map(blog => {
          return <Post key={blog.id} {...blog} />
        })
      }
    
    </>
  )
}

export default IndexPage