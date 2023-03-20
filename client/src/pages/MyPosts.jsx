import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Post from '../components/Post'
import blogApis from '../utils/blogAPI'
import { UserContext } from '../context/UserContetx'
import { Link, useNavigate } from 'react-router-dom'
import { isTokenExist } from '../utils/getToken'


const MyPosts = () => {

  const [blogs, setBlogs] = useState([])
  const {userInfo} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    if(isTokenExist()) {
        GetMyBlogs();
    }else{
      navigate("/login")
    }
  }, [page])

  async function GetMyBlogs() {
    try {
      setLoading(true);
      const allPosts = await blogApis.Blog.currentUserBlogs(page);
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
      <button onClick={() => setPage(page+1)} className='loadmore'>Load more</button>
    
    </>
  )
}

export default MyPosts