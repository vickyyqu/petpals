import home from "../views/home.vue"
import chat from "../views/chat.vue"
import search from "../views/search.vue"
import profile from "../views/profile.vue"
import bookings from "../views/bookings.vue"
import registerowner from "../views/registerowner.vue"
import registerprovider from "../views/registerprovider.vue"
import {createRouter, createWebHistory} from "vue-router"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: home
        },
        {
            path: "/chat",
            name: "chat",
            component: chat
        },
        {
            path: "/search",
            name: "search",
            component: search
        },
        {
            path: "/bookings",
            name: "bookings",
            component: bookings
        },
        {
            path: "/profile",
            name: "profile",
            component: profile
        },
        {
            path: "/registerowner",
            name: "registerowner",
            component: registerowner
        },
        {
            path: "/registerprovider",
            name: "registerprovider",
            component: registerprovider
        }

    ]
})