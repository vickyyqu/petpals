<style>
.card {
    border: none;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    background-color: rgb(251, 248, 248);

}

.profile-details, i{
    color: #856658;
}

</style>

<template>
    <!-- only for pet service providers that accepted the booking -->
    <div v-if="acceptedRequest">
        <RequestConfirmed></RequestConfirmed>
    </div>

    <!-- for pet owners and pet service providers -->
    <div v-else class="m-4">
        <div class="card mb-3">
            <div class="d-flex align-items-center mt-3 mx-3" >

                <div class="d-flex justify-content-start align-items-center">
                    <img class="rounded-circle"
                        v-bind:src = 'img'
                        style="max-width:70px">
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

            <!-- diff display for pet owners and pet service providers -->
            <div class="card-body">
                <h6 v-if='type == "Pet Owner"' class="card-title">Bio:</h6>
                <h6 v-else class="card-title">Description:</h6>
                <small class="card-text">{{desc}}</small>
            </div>

            <!-- pet owner pov: no booking details for pet owner profile cards -->
            <div v-if='type != "Pet Owner"' class="card-footer">
                <div class="text-end">
                    <small class="profile-details"><i class="bi bi-currency-dollar"></i>{{rates}} </small>
                    <small class="profile-details"><i class="bi bi-geo"></i> {{location}} </small>
                    <small class="profile-details"><i class="bi bi-house-heart"></i>{{yrsOfExp}}</small>
                </div>
            </div>
        </div>

        <!-- diff buttons for pet owners and pet service providers -->
        <div v-if='type == "Pet Owner"' class="buttons m-2">
            <div v-if="delete" class="d-flex justify-content-end"><button class="btn btn-cancel p-2" @click="acceptedRequest=true">Accept Request</button></div>
        </div>

        <div v-else class="buttons m-2">
            <div v-if="delete" class="d-flex justify-content-end"><button class="btn btn-cancel p-2" @click="cancelRequest">Cancel Request</button></div>
    
            <div v-else class="d-flex justify-content-end mb-0"><p style="color:brown;font-style:italic;" class="p-1">Request Cancelled</p></div>
        </div>

    </div>
    
</template>

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

import RequestConfirmed from '@/components/RequestConfirmed.vue'
export default {
    data() {
        return {
            delete: true,
            petOwner: false,
            acceptedRequest: false
        }

    },
    props: ['name', 'desc', 'rates', 'location', 'img', 'yrsOfExp', 'ratings','service', 'type','otherid'],
    methods: {
        // add method to check if is pet owner or pet service provider
        // rename as reject for pet service providers
        cancelRequest(){
            onAuthStateChanged(auth, (user) => {
                this.delete = false
                if (user) {
                    set(ref(db, `users/${user.uid}/bookings/${this.otherid}/${this.service}/status`), 'cancelled')
                    set(ref(db, `users/${this.otherid}/bookings/${user.uid}/${this.service}/status`), 'cancelled')
                    window.location.href = `/bookings`;
                } else {
                    console.log('user is signed out')
                    // specify which type go to which page  
                }
            });
        },

        // only for pet service Providers
        acceptRequest(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(db, `users/${user.uid}/bookings/${this.otherid}/${this.service}/status`), 'confirmed')
                    set(ref(db, `users/${this.otherid}/bookings/${user.uid}/${this.service}/status`), 'confirmed')
                    window.location.href = `/bookings`;
                } else {
                    console.log('user is signed out')
                    // specify which type go to which page  
                }
            });
        }
    },

    components:{
        RequestConfirmed
    }
    
}

</script>