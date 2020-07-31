import VueRouter from 'vue-router'
import Auth from '../pages/auth/Auth.vue'
import Cidades from '../pages/cidades/Cidades.vue'
import Estados from '../pages/estados/Estados.vue'
import Usuarios from '../pages/usuarios/Usuarios.vue'
import auth from './middleware/auth'

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/', component: Auth },
    { name: 'cidades', path: '/cidades', meta: { middleware: auth }, component: Cidades },
    { name: 'estados', path: '/estados', meta: { middleware: auth }, component: Estados },
    { name: 'usuarios', path: '/usuarios', meta: { middleware: auth }, component: Usuarios }
  ],
  mode: 'history'
})

function nextFactory(contexto, middleware, index) {
  const subsequentMiddleware = middleware[index]

  if (!subsequentMiddleware) return contexto.next

  return (...parameters) => {
    contexto.next(...parameters)

    const nextMiddleware = nextFactory(contexto, middleware, index, 1)
    subsequentMiddleware({ ...contexto, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const contexto = {
      from,
      next,
      router,
      to,
    }

    const nextMiddleware = nextFactory(contexto, middleware, 1)

    return middleware[0]({ ...contexto, next: nextMiddleware })
  }

  return next()
})

export default router