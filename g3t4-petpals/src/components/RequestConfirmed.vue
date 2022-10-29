<template>

    <div class="card mb-3">
        <div class="d-flex align-items-center mt-3 mx-3" >

            <div class="d-flex justify-content-start align-items-center">
                <img class="mr-3 rounded-circle"
                    src="https://assets.codepen.io/460692/internal/avatars/users/default.png"
                    style="max-width:70px">
            </div>

            <div class="ms-2">
                <h6>{{name}} Laura Goh</h6>
                <small style="font-style:italic;">PetPals user since 2022</small>

                <div class="ratings">
                    <i v-if = 'ratings >= 1' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 2' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 3' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 4' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings == 5' class="bi bi-star-fill"></i>
                        <i v-if = '!Number.isInteger(ratings)' class="bi bi-star-half"></i>
                        <i v-else class="bi bi-star"></i>
                        <i v-if = 'ratings < 1' class="bi bi-star"></i>
                        <i v-if = 'ratings < 2' class="bi bi-star"></i>
                        <i v-if = 'ratings < 3' class="bi bi-star"></i>
                        <i v-if = 'ratings < 4' class="bi bi-star"></i>
                </div>

            </div>
            
        </div>
        <div class="card-body">
            <h6 class="card-title">Bio:</h6>
            <small class="card-text">{{desc}} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non atque unde tempora consectetur est libero modi iure molestias alias similique odit repudiandae minima ab iusto!</small>
        </div>
        <div class="card-footer">
            <div class="text-end">
                <small class="profile-details"><i class="bi bi-currency-dollar"></i> {{rates}} 20/h, </small>
                <small class="profile-details"><i class="bi bi-geo"></i> {{location}} Bukit Batok, </small>
                <small class="profile-details"><i class="bi bi-house-heart"></i> {{yrsOfExp}} 5 Years of Experience</small>
                
            
            </div>
        </div>

     
    </div>

    <div class="buttons m-2 d-flex justify-content-end">
        <button class="btn btn-select p-2 mx-2" @click='addChat'>Message Provider</button>
        <button class="btn btn-cancel p-2" @click="cfmBooking">Confirm Booking</button>
    </div>


</template>

<style>
.card {
    border: none;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
    background-color: rgb(251, 248, 248);

}

</style>

<script>
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, update, get, push} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";


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
        }

    },
    props: ['name', 'desc', 'rates', 'location', 'img', 'yrsOfExp', 'ratings','service', 'type', 'otherid'],
    methods: {
        cfmBooking(){

        },

        addChat(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(db, `users/${user.uid}/chat`), this.otherid)
                } else {
                    console.log('user is signed out')
                }
            });

        },
    },
                

}

</script>