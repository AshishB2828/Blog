import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useContext, useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Editor from '../components/Editor';
import blogApis from "../utils/blogAPI";
import { UserContext } from "../context/UserContetx";
import { isTokenExist } from "../utils/getToken";

const CreatePost = () => {

    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate()
    const {userInfo} = useContext(UserContext);


    useEffect(() => {
        if(!isTokenExist()){
          navigate("/login")
        }
    }, [])


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
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  )
}

export default CreatePost