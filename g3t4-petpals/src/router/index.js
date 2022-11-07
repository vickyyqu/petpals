import home from "../views/home.vue"
import chat from "../views/chat.vue"
import search from "../views/search.vue"
import profilelisting from "../views/profilelisting.vue"

import bookingsOwner from "../views/bookingsOwner.vue"
import bookingsProvider from "../views/bookingsProvider.vue"

import petownerprofile from "../views/petownerprofile.vue"
import petserviceprofile from "../views/petserviceprofile.vue"

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
            path: "/petserviceprofile",
            name: "petserviceprofile",
            component: petserviceprofile
        },
        {
            path: "/petownerprofile",
            name: "petownerprofile",
            component: petownerprofile
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
            path: "/profilelisting",
            name: "profilelisting",
            component: profilelisting
        },
    ]
})