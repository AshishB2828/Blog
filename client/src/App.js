import './App.css';
import { Route, Routes } from "react-router-dom"
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPage from './pages/EditPage';
import PageNotFound from './pages/PageNotFound';
import MyPosts from './pages/MyPosts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authAction } from './store/authSlice';
import RequireAuth from './components/RequireAuth';
import PublicRoute from './components/PublicRoute';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
      if(localStorage.getItem("user")){
        let user = JSON.parse(localStorage.getItem("user"));
         dispatch(authAction.login({user: user, token: user.token}))
      }
    }, [dispatch])
    const isLoggedIn = useSelector(state => state.isLoggedIn);
  return (
      <Routes>
        <Route path='/' element={<Layout />}>     
          <Route element={<PublicRoute />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route> 
          <Route element={<RequireAuth/>}>
            <Route index element ={ <IndexPage/>}/>
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/my-posts' element={<MyPosts />} />
            <Route path='/post/:id' element={<PostPage />} />
            <Route path='/edit/:id' element={<EditPage />} />
          </Route>
          
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
  );
}

export default App;
