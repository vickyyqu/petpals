import home from "../views/home.vue"
import chat from "../views/chat.vue"
import search from "../views/search.vue"
import profile from "../views/profile.vue"
import bookingsOwner from "../views/bookingsOwner.vue"
import bookingsProvider from "../views/bookingsProvider.vue"
import profilelisting from "../views/profilelisting.vue"
import petownerprofile from "../views/petownerprofile.vue"
import petserviceprofile from "../views/petserviceprofile.vue"

import registerowner from "../views/registerowner.vue"
import registerprovider from "../views/registerprovider.vue"
import database from "../views/database.vue"

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
            path: "/bookingsOwner",
            name: "bookingsOwner",
            component: bookingsOwner
        },
        {
            path: "/bookingsProvider",
            name: "bookingsProvider",
            component: bookingsProvider
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
         },
         {
            path: "/database",
            name: "database",
            component: database
        },
        {
            path: "/profilelisting",
            name: "profilelisting",
            component: profilelisting
        },
        {
            path: "/petownerprofile",
            name: "petownerprofile",
            component: petownerprofile
        },
        {
            path: "/petserviceprofile",
            name: "petserviceprofile",
            component: petserviceprofile
        },
    ]
})