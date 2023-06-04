import 'react-quill/dist/quill.snow.css';
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Editor from '../components/Editor';
import blogApis from "../utils/blogAPI";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../store/authSlice';

const CreatePost = () => {

    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);


    async function createNewPost(event){
        event.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        // console.log(data)
        try {
            const response = await blogApis.Blog.create(data);
            // console.log(response)
            setRedirect(true)
        } catch (error) {
            console.log(error)
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
      }
  return (
    <form onSubmit={createNewPost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <textarea type="summary"
                rows={5}
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} >

             </textarea>
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  )
}

export default CreatePost