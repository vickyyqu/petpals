<style>
.card {
    border: none;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(122, 108, 108, 0.2);
    background-color: rgb(255, 252, 252);

}

.profile-details, i{
    color: #856658;
}

</style>

<template>
<!-- for pet owners and pet service providers -->
<div class="m-4">
    <div class="card mb-3">
        <div v-if="status=='confirmed'" class="d-flex justify-content-between mt-3 mx-3" >

            <div class="d-flex justify-content-start align-items-center">
                <img class="rounded-circle"
                    v-bind:src = 'img'
                    style="max-width:70px">
            

                <div class="ms-2">
                    <h6>{{name}}</h6>
                    <small v-if='type=="Pet Owner"' style="font-style:italic;">Looking for {{service}}</small>
                    <small v-else style="font-style:italic;">{{service}}</small>

                    <div class="ratings">
                        <i v-for="n in parseInt(ratings)" class="bi bi-star-fill"></i>
                        <i v-if='!Number.isInteger(ratings)' class="bi bi-star-half"></i>
                        <i v-for='m in parseInt(5-ratings)' class="bi bi-star"></i>
                    </div>
                </div>
            </div>

            <h2 class="pe-2"><i class="bi bi-check-circle" style="color:#F8AA9D;"></i></h2>
        </div>

        <div v-else class="d-flex justify-content-start mt-3 mx-3">
            <img class="rounded-circle"
            v-bind:src = 'img'
            style="max-width:70px">
            

            <div class="ms-2">
                <h6>{{name}}</h6>
                <small v-if='type=="Pet Owner"' style="font-style:italic;">Looking for {{service}}</small>
                <small v-else style="font-style:italic;">{{service}}</small>

                <div class="ratings">
                    <i v-for="n in parseInt(ratings)" class="bi bi-star-fill"></i>
                    <i v-if='!Number.isInteger(ratings)' class="bi bi-star-half"></i>
                    <i v-for='m in parseInt(5-ratings)' class="bi bi-star"></i>
                </div>
            </div>

        </div>

        <div class="card-body">
            <h6 v-if='type == "Pet Owner"' class="card-title">Bio:</h6>
            <h6 v-else class="card-title">Description:</h6>
            <small class="card-text">{{desc}}</small>
        </div>

        <div class="card-footer">
            <div class="text-end">

                <small v-if='type == "Pet Service Provider"' class="profile-details"><i class="bi bi-currency-dollar"></i>{{rates}}/<span v-if="service=='Pet Hotel'">day</span><span v-else>hr</span></small>
                <small class="profile-details"><i class="bi bi-geo"></i> {{location}} &nbsp;</small>
                <small v-if='type == "Pet Service Provider"' class="profile-details"><i class="bi bi-house-heart"></i> {{yrsOfExp}} Yrs of Experience</small>

            </div>
        </div>
    </div>

    <div class="buttons m-2 d-flex justify-content-end">
        <button v-if='type == "Pet Owner" && status == "confirmed"' class="btn btn-select px-3 mx-2" @click="addChat"><i class="bi bi-chat-heart"></i></button>
        <button v-if='type == "Pet Service Provider" && status == "confirmed"' class="btn btn-select px-3 mx-2" @click="addChat"><i class="bi bi-chat-heart"></i></button>

        <button v-if="type == 'Pet Service Provider' && status=='confirmed'" class="btn btn-select px-3 ms-1 me-2" @click="cfmBooking">Confirm Booking</button>

        <button v-if='type == "Pet Owner" && status ==  "pending"' class="btn btn-select px-3 mx-2" @click="acceptRequest">Accept Request</button>
        <button v-if='type == "Pet Owner" && status ==  "pending"' class="btn btn-cancel p-2" @click="cancelRequest">Reject Request</button>

        <button v-else class="btn btn-cancel p-2" @click="cancelRequest">Cancel Request</button>
    </div>

</div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
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
            status: 'pending'
        }

    },
    props: ['name', 'desc', 'rates', 'location', 'img', 'yrsOfExp', 'ratings','service', 'type' ,'otherid'],

    mounted(){
        //get curr status of request
        onAuthStateChanged(auth, (user) => {
            if (user) {
                onValue(ref(db, `users/${user.uid}/bookings/${this.otherid}/${this.service}/status`), (snapshot) => {
                    this.status = snapshot.val()
                }); 
            }
        });
    },

    methods: {
        // cancel / reject for both owners and providers
        // for both pendings and confirmed requests
        cancelRequest(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(db, `users/${user.uid}/bookings/${this.otherid}/${this.service}/status`), 'cancelled')
                    set(ref(db, `users/${this.otherid}/bookings/${user.uid}/${this.service}/status`), 'cancelled')
                    if (this.type == 'Pet Owner'){
                        window.location.href = `/bookingsProvider`;
                    }else{
                        window.location.href = `/bookingsOwner`;
                    }
                    
                } else {
                    console.log('user is signed out')
                }
            });
        },

        // only for pet service Providers
        acceptRequest(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(db, `users/${user.uid}/bookings/${this.otherid}/${this.service}/status`), 'confirmed')
                    set(ref(db, `users/${this.otherid}/bookings/${user.uid}/${this.service}/status`), 'confirmed')
                    if (this.type == 'Pet Owner'){
                        window.location.href = `/bookingsProvider`;
                    }else{
                        window.location.href = `/bookingsOwner`;
                    }
                } else {
                    console.log('user is signed out')
                }
            });
        },

        // only for pet owners 
        cfmBooking(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(db, `users/${user.uid}/bookings/${this.otherid}/${this.service}/status`), 'booked')
                    set(ref(db, `users/${this.otherid}/bookings/${user.uid}/${this.service}/status`), 'booked')
                    if (this.type == 'Pet Owner'){
                        window.location.href = `/bookingsProvider`;
                    }else{
                        window.location.href = `/bookingsOwner`;
                    }
                } else {
                    console.log('user is signed out')
                }
            });
        },

        // for both owners and providers
        addChat(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(db, `users/${user.uid}/chat`), this.otherid)
                    window.location.href = `/chat`;
                } else {
                    console.log('user is signed out')
                }
            });

        },

    },
    
}

</script>