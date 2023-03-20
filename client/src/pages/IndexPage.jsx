import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Post from '../components/Post'
import blogApis from '../utils/blogAPI'
import { UserContext } from '../context/UserContetx'
import { Link, useNavigate } from 'react-router-dom'
import { isTokenExist } from '../utils/getToken'


const IndexPage = () => {

  const [blogs, setBlogs] = useState([])
  const {userInfo} = useContext(UserContext);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  useEffect(() => {
    if(isTokenExist()) {
      GetAllBlogs();
    }else{
      navigate("/login")
    }
  }, [page])

  async function GetAllBlogs() {
    try {
      setLoading(true);
      const allPosts = await blogApis.Blog.all(page);
  
      setBlogs(allPosts ?? []);
      setLoading(false);
      // console.log(allPosts)
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  function LoadMorePosts() {
    setPage(page+1);
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
      <button onClick={LoadMorePosts} className='loadmore'>Load more</button>
    </>
  )
}

export default IndexPage