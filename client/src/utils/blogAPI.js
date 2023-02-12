import axios from "axios";


axios.defaults.baseURL = "https://localhost:7019/api"

axios.interceptors.request.use(config => {

    let token = JSON.parse(window.localStorage.getItem("token"));
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;

});

const responseBody = (response) => response.data;
const Account = {
    profile: () => requests.get('/account/Profile'),
    login: (user) => requests.post('/account/login', user),
    register: (user) => requests.post('/account/register', user)
}

const Blog = {
    all: () => requests.get('/blog/all'),
    create: (blogData) => requests.post('/blog/create', blogData),
    update: (blogData) => requests.post('/blog/update', blogData),
    blogById:(id) => requests.get(`/blog/get/${id}`)
}

const requests = {
    get:(url) => axios.get(url).then(responseBody),
    post:  (url, body) => axios.post(url, body).then(responseBody).catch(err => console.log(err)),
    put:  (url, body) => {
        console.log(body)
        return axios.put(url, body).then(responseBody)},
    del:  (url) => axios.delete(url).then(responseBody),
}


const blogApis = {
  
    Account, Blog
}

export default blogApis;
