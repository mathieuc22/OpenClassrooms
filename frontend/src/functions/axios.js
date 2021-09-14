import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

const postAxios = axios.create({
  baseURL: 'http://localhost:3000/api/posts'
});

const authAxios = axios.create({
  baseURL: 'http://localhost:3000/api/auth'
});

export {
  postAxios,
  authAxios
};