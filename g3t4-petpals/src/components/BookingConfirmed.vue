<template>

<div v-if="review" class="m-4">
    <div class="card mb-3">
        <div class="d-flex justify-content-between mt-3 mx-3">

            <div class="d-flex justify-content-start align-items-center">
                <img class="rounded-circle" v-bind:src='img' style="max-width:70px">

                <div class="ms-2">
                    <h6>{{ name }}</h6>
                    <small v-if='type=="Pet Owner"' style="font-style:italic;">Looking for {{service}}</small>
                    <small v-else style="font-style:italic;">{{service}}</small>

                    <div class="ratings">
                        <i v-for="n in parseInt(ratings)" class="bi bi-star-fill"></i>
                        <i v-if='!Number.isInteger(ratings)' class="bi bi-star-half"></i>
                        <i v-for='m in parseInt(5-ratings)' class="bi bi-star"></i>
                    </div>
                </div>
            </div>


            <h2 class="pe-2"><i class="bi bi-check-circle-fill" style="color:#F8AA9D;"></i></h2>

        </div>

        <div class="card-body p-4">
            <label class="form-label">Your Rating:</label>
            <select class="form-select" v-model="rating">
                <option value=5 >5</option>
                <option value=4 >4</option>
                <option value=3 >3</option>
                <option value=2 >2</option>
                <option value=1 >1</option>
                <option value=0 >0</option>
            </select>
            <div class="ratings mt-2 text-end">
                <i v-for='a in parseInt(rating)' class="bi bi-star-fill"></i>
                <i v-for='b in parseInt(5-rating)' class="bi bi-star"></i>
            </div>
        
            <label for="reviewTextArea" class="form-label">Your Review:</label>
            <textarea class="form-control" id="reviewTextArea" rows="3" v-model="userReview" maxlength="200"></textarea>
            <div class="text-end">
                <small> {{limit}}/200</small>
            </div>

        </div>

        <div v-if='type != "Pet Owner"' class="card-footer">
            <div class="text-end">
                <small v-if='type == "Pet Service Provider"' class="profile-details"><i
                        class="bi bi-currency-dollar"></i> {{ rates }}/<span v-if="service=='Pet Hotel'">day</span><span v-else>hr</span></small>
                <small class="profile-details"><i class="bi bi-geo"></i> {{ location }}&nbsp; </small>
                <small v-if='type == "Pet Service Provider"' class="profile-details"><i
                        class="bi bi-house-heart"></i> {{ yrsOfExp }} Yrs of Experience</small>
            </div>
        </div>


    </div>

    <!-- submit review -->
    <div class="buttons m-2 d-flex justify-content-end">
        <button class="btn btn-cancel p-2" @click="addReview">Submit Review</button>
    </div>
</div>

<div v-else class="m-4">
    <div class="card mb-3">
        <div class="d-flex justify-content-between mt-3 mx-3">

            <div class="d-flex justify-content-start align-items-center">
                <img class="rounded-circle" v-bind:src='img' style="max-width:70px">

                <div class="ms-2">
                    <h6>{{ name }}</h6>
                    <small v-if='type=="Pet Owner"' style="font-style:italic;">Looking for {{service}}</small>
                    <small v-else style="font-style:italic;">{{service}}</small>

                    <div class="ratings">
                        <i v-for="n in parseInt(ratings)" class="bi bi-star-fill"></i>
                        <i v-if='!Number.isInteger(ratings)' class="bi bi-star-half"></i>
                        <i v-for='m in parseInt(5-ratings)' class="bi bi-star"></i>
                    </div>

                </div>
            </div>


            <h2 class="pe-2"><i class="bi bi-check-circle-fill" style="color:#F8AA9D;"></i></h2>

        </div>

        <div class="card-body">
            <h6 v-if='type == "Pet Owner"' class="card-title">Bio:</h6>
            <h6 v-else class="card-title">Description:</h6>
            <small class="card-text">{{ desc }}</small>
        </div>

        <div v-if='type != "Pet Owner"' class="card-footer">
            <div class="text-end">
                <small v-if='type == "Pet Service Provider"' class="profile-details"><i
                        class="bi bi-currency-dollar"></i> {{ rates }}/<span v-if="service=='Pet Hotel'">day</span><span v-else>hr</span></small>
                <small class="profile-details"><i class="bi bi-geo"></i> {{ location }} &nbsp;</small>
                <small v-if='type == "Pet Service Provider"' class="profile-details"><i
                        class="bi bi-house-heart"></i> {{ yrsOfExp }} Yrs of Experience</small>
            </div>
        </div>


    </div>

    <div v-if="reviewLeft" class="buttons m-2 d-flex justify-content-end">
        <small style="color:brown;font-style:italic">Review sent!</small>
    </div>

    <div v-else class="buttons m-2 d-flex justify-content-end">
        <button class="btn btn-cancel p-2" @click="review=true">Leave Review</button>
    </div>
</div>

</template>

<script>
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database";
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
            total: 0,
            count: 0,
            review: false,
            reviewLeft: false,
            userReview: "",
            rating: 5
        }

    },
    
    props: ['name', 'desc', 'rates', 'location', 'img', 'yrsOfExp', 'ratings', 'service', 'type', 'otherid'],

    methods: {
        addReview() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(db, `users/${this.otherid}/reviews/${user.uid}/${this.service}`), {
                        'rating': Number(this.rating),
                        'review': this.userReview
                    })
                    
                    this.calculateRatings()
                    this.reviewLeft = true
                    this.review = false

                } else {
                    console.log('user is signed out')
                }
            });

        },

        calculateRatings() {
            onValue(ref(db, `users/${this.otherid}/reviews`), (snapshot) => {
                for (let oid in snapshot.val()) {
                    for (let serv in snapshot.val()[oid]) {
                        console.log(oid,serv)
                        this.count++
                        this.total += snapshot.val()[oid][serv].rating
                        console.log(this.count,this.total)
                    }
                }

                var ratings = ((this.total / this.count) * 2).toFixed() / 2

                set(ref(db, `users/${this.otherid}/ratings`), ratings)
                if (this.type == 'Pet Owner') {
                    window.location.href = `/bookingsProvider`;
                } else {
                    window.location.href = `/bookingsOwner`;
                }
            });

            // onAuthStateChanged(auth, (user) => {
            //     onValue(ref(db, `users/${user.id}/reviews`), (snapshot) => {
            //         for (let oid in snapshot.val()) {
            //             for (let serv in snapshot.val()[oid]) {
            //                 this.count++
            //                 this.total += snapshot.val()[oid].rating
            //             }
            //         }
            //         const rating = ((this.total / this.count) * 2).toFixed() / 2

            //         set(ref(db, `users/${user.uid}/ratings`), ratings)
            //         if (this.type == 'Pet Owner') {
            //             window.location.href = `/bookingsProvider`;
            //         } else {
            //             window.location.href = `/bookingsOwner`;
            //         }
            //     });

            // });



        },
    },

    computed: {
        limit() {
            return this.userReview.length.toString()
        }
    },

    mounted(){
        onAuthStateChanged(auth, (user) => {
            get(ref(db, `users/${this.otherid}/reviews/${user.uid}/${this.service}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    this.reviewLeft = true
                }
            });
        });
        
    }

}

</script>