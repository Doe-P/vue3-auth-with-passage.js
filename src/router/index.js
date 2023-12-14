import {createRouter, createWebHistory} from "vue-router";
import auth from "../middleware/auth.js";
import log from "../middleware/log.js";

const routes = [
    {
        path:'/',
        name: 'home',
        component: () => import(/* webpackChunkName: "Home" */ '../view/Home.vue'),
        meta:{
            middleware: auth,
        }
    },
    {
        path:'/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Sign In" */ '../view/Login.vue'),
        meta: {
            middleware: log,
        }
    },
    {
        path:'/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "Sign Up" */ '../view/Register.vue'),
        meta: {
            middleware: log,
        }
    },
]

export const router = createRouter({
    routes: routes,
    history: createWebHistory(),
});
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        context.next(...parameters);
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}
router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({ ...context, next: nextMiddleware });
    }

    return next();
});

