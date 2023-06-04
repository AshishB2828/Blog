import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Editor from '../components/Editor'
import blogApis from '../utils/blogAPI';

const EditPage = () => {


    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [img, setImg] = useState({})
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
      if(id) {
          GetBlogById(id);
      }
    },[id])
    async function GetBlogById(id) {
        try {
            setLoading(true)
            const blog = await blogApis.Blog.blogById(id)
            setTitle(blog.title);
            setContent(blog.content);
            setSummary(blog.summary);
            setImg(blog.imageURL)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    async function updatePost(ev) {
        ev.preventDefault();
        setLoading(true)

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
          data.set('file', files?.[0]);
        }
        try {
            const updatedBlog = await blogApis.Blog.update(data);
            setLoading(false)
            navigate('/post/'+id);
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
      }
    async function FileChange(ev){
      setFiles(ev.target.files);
      setImg(URL.createObjectURL(ev.target.files[0]))
    }
   
  if(loading){
    return <div>Loading....</div>
  }
  return (
    <form onSubmit={updatePost}>
      <label className='text-label' htmlFor="title">Title</label>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <label className='text-label' htmlFor="summary">Summary</label>
      <textarea type="summary"
            rows={5}
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} ></textarea>
      <label className='text-label' htmlFor="file">Image</label>
      
      <div>
        <img src={img} width='200' height='200'/>
      <input type="file"
             onChange={FileChange} />
      </div>
      <br/>
      <label className='text-label' htmlFor="content">Content</label>
      <Editor onChange={setContent} value={content} />
      <button style={{marginTop:'5px'}}>Update post</button>
    </form>
  )
}

export default EditPage