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

    <div class="card mb-3">
        <div class="d-flex align-items-center mt-3 mx-3" >

            <div class="d-flex justify-content-start align-items-center">
                <img class="mr-3 rounded-circle"
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
        <div class="card-body">
            <h6 v-if='type == "Pet Owner"' class="card-title">Bio:</h6>
            <small class="card-text">{{desc}}</small>
        </div>
        <div class="card-footer">
            <div class="text-end">
                <small class="profile-details"><i class="bi bi-currency-dollar"></i>{{rates}} </small>
                <small class="profile-details"><i class="bi bi-geo"></i> {{location}} </small>
                <small v-if='type == "Pet Owner"' class="profile-details"><i class="bi bi-house-heart"></i>{{yrsOfExp}}</small>
                
            
            </div>
        </div>

      
    </div>
    <div class="buttons m-2">
        <div class="d-flex justify-content-end"><button class="btn btn-cancel p-2" @click="cancelRequest">Cancel Request</button></div>

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


export default {
    data() {
        return {
            img: "src/img/png/groomer.png",
        }

    },
    props: ['name', 'desc', 'rates', 'location', 'img', 'yrsOfExp', 'ratings','service', 'type','otherid'],
    methods: {
        // rename as reject for pet service providers
        cancelRequest(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(db, `users/${user.uid}/bookings/${this.otherid}/${this.service}/status`), 'cancelled')
                    set(ref(db, `users/${this.otherid}/bookings/${user.uid}/${this.service}/status`), 'cancelled')
                    window.location.href = `/bookings`;
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
                    window.location.href = `/bookings`;
                } else {
                    console.log('user is signed out')
                }
            });
        }

    }

}

</script>

