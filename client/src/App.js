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

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route  index element ={ <IndexPage/>}/>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
