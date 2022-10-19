import home from "../views/home.vue"
import {createRouter, createWebHistory} from "vue-router"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: home
        }
    ]
})