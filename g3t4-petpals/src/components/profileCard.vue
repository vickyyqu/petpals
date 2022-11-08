<style>
.btn-cancel {
    background-color: #77686d;
    color: #f8f1ef;
}

.btn-cancel:hover {
    background-color: #58484e;
    color: #f8f1ef;
}
</style>

<template>
<div v-if="sent" class="col-xl-3 col-md-6 pt-3">
    <div class="card">
        <div class="d-flex align-items-center mt-3 mx-3">

            <div class="d-flex justify-content-start align-items-center">
                <img class="mr-3 rounded-circle" v-bind:src = 'img' style="max-width:70px">
            </div>

            <div class="ms-2">
                <h6>{{name}}</h6>
                <small style="font-style:italic;">{{service}}</small>

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
            <h6 class="card-title">Description:</h6>
            <small class="card-text">{{desc}}</small>
            <br/>
            <small class="card-text float-end"> &nbsp;{{dist}} km away</small>
        </div>
        <div class="card-footer">
            <div class="text-end">
                <small class="profile-details"><i class="bi bi-currency-dollar"></i>{{rates}}/<span v-if="service=='Pet Hotel'">day</span><span v-else>hr</span></small>
                <small class="profile-details"><i class="bi bi-geo"></i> {{location}} &nbsp;</small>
                <small class="profile-details"><i class="bi bi-house-heart"></i> {{yrsOfExp}} Yrs of experience </small>
            </div>
        </div>


    </div>

    <div class="d-flex justify-content-center">
        <button class="btn my-3 btn-select" @click="sendRequest();">Send Request</button>
    </div>
</div>

<div v-else class="col-xl-3 col-md-6 pt-3">
    <div class="card card-sent" style="background-color: #fcf6f4;">
        <div class="d-flex align-items-center mt-3 mx-3">

            <div class="d-flex justify-content-start align-items-center">
                <img class="mr-3 rounded-circle" v-bind:src = 'img' style="max-width:70px">
            </div>

            <div class="ms-2">
                <h6>{{name}}</h6>
                <small style="font-style:italic;">{{service}} </small>

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
            <h6 class="card-title">Description:</h6>
            <small class="card-text">{{desc}}</small>
            <br/>
            <small class="card-text float-end"> &nbsp;{{dist}} km away</small>
        </div>
        <div class="card-footer">
            <div class="text-end">
                <small class="profile-details"><i class="bi bi-currency-dollar"></i>{{rates}}/<span v-if="service=='Pet Hotel'">day</span><span v-else>hr</span></small>
                <small class="profile-details"><i class="bi bi-geo"></i> {{location}} &nbsp;</small>
                <small class="profile-details"><i class="bi bi-house-heart"></i> {{yrsOfExp}} Yrs of Experience</small>
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-center">
        <small style="font-style:italic; color:brown" class="my-3">Request sent!</small>
    </div>
</div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database";

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
            sent: true,
        }
    },
    props: ['title', 'desc', 'rates', 'location', 'img', 'ratings', 'yrsOfExp', 'name', 'service', 'oid', 'dist'],
    
    methods: {
        sendRequest() {
            this.sent = false
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    get(ref(db, `users/${user.uid}/bookings/${this.oid}/${this.service}`))
                    .then((snapshot) => {
                        if (snapshot.exists() && snapshot.val().status == 'cancelled') {
                            set(ref(db,`users/${user.uid}/bookings/${this.oid}/${this.service}/status`), 'pending')
                            set(ref(db,`users/${this.oid}/bookings/${user.uid}/${this.service}/status`), 'pending')
                        } else {
                            set(ref(db,`users/${user.uid}/bookings/${this.oid}/${this.service}`), {
                                'price' : this.rates,
                                'status' : 'pending'
                            })
                            set(ref(db,`users/${this.oid}/bookings/${user.uid}/${this.service}`), {
                                'price' : this.rates,
                                'status' : 'pending'
                            })
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                } else {
                    console.log('user is signed out')
                }
            });


        },

        getSent(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}`), (snapshot) => {
                        if (snapshot.val()['bookings'] == null || snapshot.val()['bookings'][this.oid] == null || snapshot.val()['bookings'][this.oid][this.service] == null || snapshot.val().bookings[this.oid][this.service].status == 'cancelled' ){
                            // no previous bookings or no previous bookings with this user
                            // or no previous bookings with this user and service 
                            // or previous booking was cancelled
                            this.sent = true
                        }else{
                            this.sent = false
                        }
                    });
                } else {
                    console.log('user is signed out')
                }
            });
        }
    },
    mounted() {
        this.getSent()
    }
  
}  
</script>
