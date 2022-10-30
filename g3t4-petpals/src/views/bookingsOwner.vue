<style>

.required {
    font-style: italic;
    color: #dfd1cd;
}

.requests-made, .confirmed-bookings {
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 #cec2c233;
}   

</style>

<template>
    <div class="container-fluid sides">
        <navbar></navbar>

        <div class="row my-5" style="padding-top:30px">

            <div class="col-lg-6 order-lg-1 pt-3 px-3">
                <div class="requests-made py-5">
                    <h3 class="my-2 text-center">Pending Requests</h3>
                    <p class="my-5 text-center nil">No requests yet...</p>

                    <RequestPending></RequestPending>

                    <RequestPending v-for='item in pendings' :name= 'item.other' :desc = 'item.desc' :rates = 'item.price' :location = 'item.address' :yrsOfExp = 'item.yrsOfExp' :img = 'item.photo' :ratings = 'item.ratings'></RequestPending>
                </div>
            
            </div> 

            <div class="col-lg-6 order-lg-3 pt-3 px-3">
                <div class="requests-made py-5">

                    <h3 class="my-2 text-center" >Confirmed Requests</h3>
                    <p class="my-5 text-center nil">No requests yet...</p>

                    <RequestConfirmed></RequestConfirmed>

                    <RequestConfirmed v-for='item in requests' :name ='item.other' :desc ='item.desc' :rates ='item.price' :location ='item.address' :yrsOfExp ='item.yrsOfExp' :img ='item.photo' :ratings ='item.ratings'></RequestConfirmed>
                </div>
            
            </div> 
 
            <div class="col-lg-6 order-lg-2 pt-3 px-3">
                <div class="requests-made py-5">

                    <h3 class="my-2 text-center">Confirmed Bookings</h3>
                    <p class="my-5 text-center nil">No bookings yet...</p>

                    <BookingConfirmed></BookingConfirmed>

                    <BookingConfirmed v-for='item in bookings' :name = 'item.other' :desc = 'item.desc' :rates = 'item.price' :location = 'item.address' :yrsOfExp = 'item.yrsOfExp' :img = 'item.photo' :ratings = 'item.ratings'></BookingConfirmed> 

                </div>
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
                pendings: [],
                requests: [],
                bookings: [],
                petOwner: true
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
            // this.pendings = this.getBookings('pending')
            this.requests = this.getBookings('confirmed')
            console.log(this.requests)
            // this.bookings = this.getBookings('booked')
            // bid status service other ratings yrsOfExp desc photo price address

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}/type`), (snapsht) => {
                        if (snapsht.val() == 'Pet Owner'){
                            this.petOwner = true
                        }else{
                            this.petOwner = false
                        }   
                    }); 
                }
            });

            console.log(this.petOwner)
        },
        methods : {
            getBookings(stat){
                var lst = []
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        onValue(ref(db, `users/${user.uid}/bookings`), (snapshot) => {
                            for (let key in snapshot.val()){
                                var obj = {bid: key, status: snapshot.val()[key]}
                                if (obj.status == stat){
                                    onValue(ref(db, `bookings/${key}`), (snapsht) => {
                                        obj['service'] = snapsht.val()['service provided']
                                        
                                        if (user.uid == snapsht.val()['pet owner']){
                                            obj['otherid'] = snapsht.val()['pet service provider']
                                            obj['type'] = 'Pet Owner'
                                        }else{
                                            obj['otherid'] = snapsht.val()['pet owner']
                                            obj['type'] = 'Pet Service Provider'
                                        }
                                    
                                    onValue(ref(db, `users/${obj.otherid}`), (snapsht) => {
                                        obj['other'] = snapsht.val().username
                                        obj['ratings'] = snapsht.val().ratings
                                        obj['yrsOfExp'] = snapsht.val().yrsOfExp
                                        obj['desc'] = snapsht.val().desc
                                        obj['photo'] = snapsht.val().profilepic
                                        obj['addr'] = snapsht.val().address
                                        
                                    });   
                                });   

                                    if (obj.type == 'Pet Owner'){
                                        onValue(ref(db, `services/${obj.service}/${obj.otherid}`), (snapsht) => {
                                            obj['price'] = snapsht.val()
                                        });  
                                    }else{
                                        onValue(ref(db, `services/${obj.service}/${user.uid}`), (snapsht) => {
                                            obj['price'] = snapsht.val()
                                            
                                        });    
                                    }
                                    
                                    lst.push(obj)               
                                }


                                
                            }
                        });
                    }
                }); 

                return lst
            },

        },
    }
</script>
