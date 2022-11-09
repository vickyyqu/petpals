
<template>
    <div class="row">
        <div class="navbar-header" id="navbar-header">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-sm ">
                    <img src="../img/logo2.png" style="width: 80px">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-between text-center"
                        id="navbarSupportedContent">

                        <ul class="navbar-nav ms-2">

                            <li class="nav-item px-3 my-2">
                                <router-link to="/" style="color:rgb(195, 82, 82)" v-on:click='logOut()'>Log Out
                                </router-link>
                            </li>

                            <li class="nav-item px-3 my-2">
                                <router-link to="/profilelisting">Add a Listing</router-link>
                            </li>

                            <li class="nav-item px-3 my-2">
                                <router-link to="/bookingsProvider">Requests & Bookings</router-link>
                            </li>

                            <li class="nav-item px-3 my-2">
                                <router-link to="/chat">Chats</router-link>
                                <!-- if there is an unread chat -->
                                <img v-if="unread" src="../img/green-circle-icon.png" style="width:8px;" class="ms-1">
                            </li>

                        </ul>

                        <ul class="navbar-nav my-2">
                            <li class="nav-item active">
                                <img v-bind:src="photoURL" class="rounded rounded-circle ms-1 me-3" style="width:40px;">
                                <router-link to="/petserviceprofile">{{ username }}</router-link>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAS74F4gerXVK8OW-RBq3rSGNEoHuqLQ0A",
    authDomain: "petpals-623e3.firebaseapp.com",
    projectId: "petpals-623e3",
    storageBucket: "petpals-623e3.appspot.com",
    messagingSenderId: "949038254831",
    appId: "1:949038254831:web:82d399649bb06e8389e91a",
    databaseURL: "https://petpals-623e3-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();


export default {
    data() {
        return {
            username: "",
            photoURL: "",
            unread: false
        }
    },
    methods: {
        logOut() {
            const auth = getAuth();
            signOut(auth).then(() => {
                window.location.href = `/`;
            }).catch((error) => {
                console.log('o no')
            });
        },

    },
    getProfile() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                onValue(ref(db, `users/${user.uid}`), (snapshot) => {
                    this.username = snapshot.val().username
                    this.photoURL = snapshot.val().profilepic
                });
            }
        });
    },
    mounted() {
        this.getProfile()
    }
}

</script>