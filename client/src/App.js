import './App.css';
import Header from './components/Header';
import Post from './components/Post';
import { Route, Routes } from "react-router-dom"
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContext, UserContextProvider } from './context/UserContetx';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPage from './pages/EditPage';
import PageNotFound from './pages/PageNotFound';
import MyPosts from './pages/MyPosts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authAction } from './store/authSlice';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
      if(localStorage.getItem("user")){
        dispatch(authAction.login())
      }
    }, [dispatch])
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    console.log(isLoggedIn)
  return (
      <Routes>
        <Route path='/' element={<Layout />}>
              
          {isLoggedIn && <Route index element ={ <IndexPage/>}/>}
          {!isLoggedIn ? 
            <>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
            </>:
            <>
              <Route path='/create-post' element={<CreatePost />} />
              <Route path='/my-posts' element={<MyPosts />} />
              <Route path='/post/:id' element={<PostPage />} />
              <Route path='/edit/:id' element={<EditPage />} />
            </>}
          
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
  );
}

export default App;
