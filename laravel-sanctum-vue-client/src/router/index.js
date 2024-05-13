import { createRouter, createWebHistory } from 'vue-router'
import redirectIfGuest from "../middleware/redirectIfGuest.js";
import middlewarePipeline from "./processMiddleware.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/Dashboard.vue'),
            meta: {
                middleware: [redirectIfGuest]
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }

    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next
    }

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router
