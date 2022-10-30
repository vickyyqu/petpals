<style>

.required {
    font-style: italic;
    color: #dfd1cd;
}

.requests-made {
    border-right: 2px solid #dfd1cd;
}
</style>

<template>
    <div class="container-fluid">
        <navbar></navbar>

        <div class="row">
            <div class="col-1 sides">
            </div>

            <div class="col-lg-5 requests-made mt-5 p-5">
                <h3 class="my-5">Pending Requests</h3>
                <p class="my-5 text-center nil">No requests yet...</p>
                <!-- <button class="btn btn-go mt-3" v-on:click="getBookings('pending')">get pendings</button> -->

                <!-- <span v-if='type == "Pet Owner"'> hi</span>
                <span v-else>hm</span> -->
 
                <RequestPending v-for='item in pendings' :otherid = 'item.otherid' :service = 'item.service' :type = 'type' :name= 'item.name' :desc = 'item.desc' :rates = 'item.rates' :location = 'item.location' :yrsOfExp = 'item.yrsOfExp' :img = 'item.img' :ratings = 'item.ratings'></RequestPending>

                <h3 class="my-5" >Confirmed Requests</h3>
                <p class="my-5 text-center nil">No requests yet...</p>

                <RequestConfirmed v-for='item in requests' :otherid = 'item.otherid' :service = 'item.service' :type = 'type' :name ='item.name' :desc ='item.desc' :rates ='item.rates' :location ='item.location' :yrsOfExp ='item.yrsOfExp' :img ='item.img' :ratings ='item.ratings'></RequestConfirmed>
   
            </div>  
 
            <div class="col-lg-5 confirmed-bookings mt-5 p-5">
                <h3 class="my-5">Confirmed Bookings</h3>
                <p class="my-5 text-center nil">No bookings yet...</p>
                <BookingConfirmed v-for='item in bookings' :otherid = 'item.otherid' :service = 'item.service' :type = 'type' :name = 'item.name' :desc = 'item.desc' :rates = 'item.rates' :location = 'item.location' :yrsOfExp = 'item.yrsOfExp' :img = 'item.img' :ratings = 'item.ratings'></BookingConfirmed>
            </div>

            <div class="col-1 sides">
            </div>
        </div>
    </div>

    <petpalsFooter></petpalsFooter>
 

</template>

<script>
    import navbar from '@/components/navbar.vue'
    import petpalsFooter from '@/components/petpalsFooter.vue'
    import RequestPending from '@/components/RequestPending.vue'
    import RequestConfirmed from '@/components/RequestConfirmed.vue'
    import BookingConfirmed from '@/components/BookingConfirmed.vue'
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
                count: 0,
                type: 'Pet Service Provider',
                pendings: [],
                requests: [],
                bookings: [],
                services: ['Pet Walker', 'Pet Groomer', 'Pet Hotel', 'Pet Sitter', 'Pet Trainer', 'Pet Mover'],
            }
        },
        components: {
            navbar,
            petpalsFooter,
            RequestPending,
            RequestConfirmed,
            BookingConfirmed
        },
        
        mounted(){
            this.getRequests()
            this.getBookings()
            this.getPendings()
            console.log(this.pendings, this.requests, this.bookings)

            // :name = 'item.other' :desc = 'item.desc' :rates = 'item.price' 
            // :location = 'item.address' :yrsOfExp = 'item.yrsOfExp' 
            // :img = 'item.photo' :ratings = 'item.ratings' :services = 'item.services'
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
                                var exp = ''
                                var img = ''
                                var ratings = ''

                                onValue(ref(db, `users/${oid}`), (snapsht) => {
                                    name = snapsht.val().username;
                                    desc = snapsht.val().desc;
                                    loc = snapsht.val().address;
                                    exp = snapsht.val().yrsOfExp;
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
                                            obj['yrsOfExp'] = exp
                                            obj['img'] = img
                                            obj['ratings'] = ratings

                                            if (!this.requests.includes(obj)){
                                                this.requests.push(obj)
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
                                var exp = ''
                                var img = ''
                                var ratings = ''

                                onValue(ref(db, `users/${oid}`), (snapsht) => {
                                    name = snapsht.val().username;
                                    desc = snapsht.val().desc;
                                    loc = snapsht.val().address;
                                    exp = snapsht.val().yrsOfExp;
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
                                            obj['yrsOfExp'] = exp
                                            obj['img'] = img
                                            obj['ratings'] = ratings

                                            if (!this.bookings.includes(obj)){
                                                this.bookings.push(obj)
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
                                var exp = ''
                                var img = ''
                                var ratings = ''

                                onValue(ref(db, `users/${oid}`), (snapsht) => {
                                    name = snapsht.val().username;
                                    desc = snapsht.val().desc;
                                    loc = snapsht.val().address;
                                    exp = snapsht.val().yrsOfExp;
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
                                            obj['yrsOfExp'] = exp
                                            obj['img'] = img
                                            obj['ratings'] = ratings

                                            if (!this.pendings.includes(obj)){
                                                this.pendings.push(obj)
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
    }
</script>
