import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Editor from '../components/Editor'
import blogApis from '../utils/blogAPI';

const EditPage = () => {


    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        GetBlogById(id)
      }, []);

      async function GetBlogById(id) {
        try {
            const blog = await blogApis.Blog.blogById(id)
            setTitle(blog.title);
            setContent(blog.content);
            setSummary(blog.summary);
            console.log(blog)
        } catch (error) {
            console.log(error)
        }
    }
    async function updatePost(ev) {
        ev.preventDefault();
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
            setRedirect(true);
        } catch (error) {
            console.log(error)
        }
      }
    if (redirect) {
        return <Navigate to={'/post/'+id} />
      }
  return (
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{marginTop:'5px'}}>Update post</button>
    </form>
  )
}

export default EditPage