import axios from 'axios'

export default function auth({ next, router }) {
  if (!localStorage.getItem('jwt') || localStorage.getItem('jwt') === 'undefined' || localStorage.getItem('jwt') === 'null') {
    localStorage.removeItem('jwt')

    return router.push({ name: 'login' });
  }

  axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');

  return next();
}