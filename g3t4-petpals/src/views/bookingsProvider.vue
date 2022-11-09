<style>

.requests-made, .confirmed-bookings {
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 #cec2c233;
}   

</style>

<template>
<div class="container-fluid sides">
    <navbarProvider></navbarProvider>

    <div class="row" style="padding-top:80px; padding-bottom:50px;">

        <div class="col-lg-6 pt-3 px-3">
            <div class="requests-made py-5">
                <h3 class="my-2 text-center">Requests Received</h3>
                <p v-if="!haveReq" class="my-5 text-center nil">No requests yet...</p>

                <request v-for='item in pendings' :otherid = 'item.otherid' :service = 'item.service' :type = 'type' :name= 'item.name' :desc = 'item.desc' :rates = 'item.rates' :location = 'item.location' :img = 'item.img' :ratings = 'item.ratings'></request>
                <request v-for='item in reqs' :otherid = 'item.otherid' :service = 'item.service' :type = 'type' :name= 'item.name' :desc = 'item.desc' :rates = 'item.rates' :location = 'item.location' :img = 'item.img' :ratings = 'item.ratings'></request>
            </div>
        
        </div> 

        <div class="col-lg-6 pt-3 px-3">
            <div class="requests-made py-5">

                <h3 class="my-2 text-center">Confirmed Bookings</h3>
                <p v-if="!haveBookings" class="my-5 text-center nil">No bookings yet...</p>

                <BookingConfirmed v-for='item in bookings' :otherid = 'item.otherid' :service = 'item.service' :type = 'type' :name = 'item.name' :desc = 'item.desc' :rates = 'item.rates' :location = 'item.location' :img = 'item.img' :ratings = 'item.ratings'></BookingConfirmed>

            </div>
        </div>
    </div>

</div>

<petpalsFooter></petpalsFooter>

</template>

<script>
import navbarProvider from '@/components/navbarProvider.vue'
import petpalsFooter from '@/components/petpalsFooter.vue'
import request from '@/components/request.vue'
import BookingConfirmed from '@/components/BookingConfirmed.vue'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
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
            count: 0,
            type: 'Pet Owner', // other users type
            pendings: [],
            reqs: [],
            bookings: [],
            haveReq: false,
            haveBookings: false,
            services: ['Pet Walker', 'Pet Groomer', 'Pet Hotel', 'Pet Sitter', 'Pet Trainer', 'Pet Mover'],
        }
    },

    components: {
        navbarProvider,
        petpalsFooter,
        request,
        BookingConfirmed,
    },

    methods : {
        // get Pet Owners
        getRequests() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}/bookings/`), (snapshot) => {
                        for (let oid in snapshot.val()){
                            var name = ''
                            var desc = ''
                            var loc = ''
                            var img = ''
                            var ratings = ''

                            onValue(ref(db, `users/${oid}`), (snapsht) => {
                                name = snapsht.val().username;
                                desc = snapsht.val().bio;
                                loc = snapsht.val().region;
                                img = snapsht.val().profilepic;
                                ratings = snapsht.val().ratings

                            for (let service of this.services){
                                var obj = {otherid : oid}

                                onValue(ref(db, `users/${user.uid}/bookings/${oid}/${service}`), (snapsht) => {
                                    if (snapsht.val() != null && snapsht.val().status == 'confirmed'){
                                        obj['rates'] = snapsht.val().price
                                        obj['service'] = service 
                                        obj['name'] = name
                                        obj['location'] = loc
                                        obj['desc'] = desc
                                        obj['img'] = img
                                        obj['ratings'] = ratings

                                        if (!this.reqs.includes(obj)){
                                            this.reqs.push(obj)
                                            this.haveReq = true
                                        }
                                        
                                    }
                                });     
                            }});
                        }
                    });
                }
            });

        },

        getBookings() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}/bookings/`), (snapshot) => {
                        for (let oid in snapshot.val()){
                            var name = ''
                            var desc = ''
                            var loc = ''
                            var img = ''
                            var ratings = ''

                            onValue(ref(db, `users/${oid}`), (snapsht) => {
                                name = snapsht.val().username;
                                desc = snapsht.val().bio;
                                loc = snapsht.val().region;
                                img = snapsht.val().profilepic;
                                ratings = snapsht.val().ratings

                            for (let service of this.services){
                                var obj = {otherid : oid}

                                onValue(ref(db, `users/${user.uid}/bookings/${oid}/${service}`), (snapsht) => {
                                    if (snapsht.val() != null && snapsht.val().status == 'booked'){
                                        obj['rates'] = snapsht.val().price
                                        obj['service'] = service 
                                        obj['name'] = name
                                        obj['location'] = loc
                                        obj['desc'] = desc 
                                        obj['img'] = img
                                        obj['ratings'] = ratings

                                        if (!this.bookings.includes(obj)){
                                            this.bookings.push(obj)
                                            this.haveBookings = true
                                        }
                                        
                                    }
                                });     
                            }});
                        }
                    });
                }
            });

        },

        getPendings() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}/bookings/`), (snapshot) => {
                        for (let oid in snapshot.val()){
                            var name = ''
                            var desc = ''
                            var loc = ''
                            var img = ''
                            var ratings = ''

                            onValue(ref(db, `users/${oid}`), (snapsht) => {
                                name = snapsht.val().username;
                                desc = snapsht.val().bio;
                                loc = snapsht.val().region;
                                img = snapsht.val().profilepic;
                                ratings = snapsht.val().ratings

                            for (let service of this.services){
                                var obj = {otherid : oid}

                                onValue(ref(db, `users/${user.uid}/bookings/${oid}/${service}`), (snapsht) => {
                                    if (snapsht.val() != null && snapsht.val().status == 'pending'){
                                        obj['rates'] = snapsht.val().price
                                        obj['service'] = service 
                                        obj['name'] = name
                                        obj['location'] = loc
                                        obj['desc'] = desc 
                                        obj['img'] = img
                                        obj['ratings'] = ratings

                                        if (!this.pendings.includes(obj)){
                                            this.pendings.push(obj)
                                            this.haveReq = true
                                        }
                                        
                                    }
                                });     
                            }});
                        }
                    });
                }
            });

        },
    },
    
    mounted(){
        this.getRequests()
        this.getBookings()
        this.getPendings()
    },    
}
</script>
