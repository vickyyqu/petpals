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

                <RequestPending v-for='item in pendings' :name= 'item.other' :desc = 'item.desc' :rates = 'item.price' :location = 'item.address' :yrsOfExp = 'item.yrsOfExp' :img = 'item.photo' :ratings = 'item.ratings'></RequestPending>

                <h3 class="my-5" >Confirmed Requests</h3>
                <p class="my-5 text-center nil">No requests yet...</p>

                <RequestConfirmed v-for='item in requests' :name ='item.other' :desc ='item.desc' :rates ='item.price' :location ='item.address' :yrsOfExp ='item.yrsOfExp' :img ='item.photo' :ratings ='item.ratings'></RequestConfirmed>
 
            </div> 
 
            <div class="col-lg-5 confirmed-bookings mt-5 p-5">
                <h3 class="my-5">Confirmed Bookings</h3>
                <p class="my-5 text-center nil">No bookings yet...</p>
                <BookingConfirmed v-for='item in bookings' :name = 'item.other' :desc = 'item.desc' :rates = 'item.price' :location = 'item.address' :yrsOfExp = 'item.yrsOfExp' :img = 'item.photo' :ratings = 'item.ratings'></BookingConfirmed>
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
                pendings: [],
                requests: [],
                bookings: [],
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
