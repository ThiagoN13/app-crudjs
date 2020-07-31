import axios from 'axios'
import router from '../../router'

axios.defaults.baseURL = 'http://localhost:3000/api';

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if (error.response.status === 401) {
    localStorage.removeItem('jwt')
    router.replace('/')
  }

  window.notify({ text: error.response.data.errorMsg, type: 'danger' })

  return Promise.reject(error);
});