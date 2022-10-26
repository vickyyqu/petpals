<style>
    .data {
        background-color: #f8f1ef;
        height: 725px;
    }

    .info {
        position: relative;
        top: 80px;
    }

</style>

<template>
    <div class = 'container-fluid data'>
        <div class = 'row'>
            <navbar></navbar>
        </div>

        <div class = 'row info'>
            <h3>testing firebase realtime database</h3>

            <p id = 'status'>hi</p>    
            <button class = 'rounded bg-light w-25' v-on:click = "">click me!</button>
        </div>

        <div class = 'row' id = 'myinfo'>
        </div>

        <div class = 'row' id = 'reviews'>
        </div>

        <div class = 'row' id = 'pets'>
        </div>

        <div class = 'row' id = 'services'>
        </div>

        <div class = 'row' id = 'bookings'>
        </div>

    </div>
</template>


<script >
    const myid = 1235
    // const myusername = 'benny'
    // const myphoto = 'https://talkjs.com/images/avatar-2.jpg'

    import navbar from '@/components/navbar.vue'
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";

    const firebaseConfig = {
        apiKey: "AIzaSyAS74F4gerXVK8OW-RBq3rSGNEoHuqLQ0A",
        authDomain: "petpals-623e3.firebaseapp.com",
        projectId: "petpals-623e3",
        storageBucket: "petpals-623e3.appspot.com",
        messagingSenderId: "949038254831",
        appId: "1:949038254831:web:82d399649bb06e8389e91a",
        databaseURL: "https://petpals-623e3-default-rtdb.asia-southeast1.firebasedatabase.app/"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // Import the functions needed to read from realtime database
    import { getDatabase, ref, onValue, set, update, get, push} from "firebase/database";

    // connect to the realtime database
    const db = getDatabase(app);

    // get user info
    const myinfo = ref(db, `users/${myid}`)


    export default {
        
        components: {
            navbar
        },

        methods : {
            // create new booking
            addBooking (uid,bid){
                // bid : bookingid 
                // uid : the other user's id
                // const bid = push(ref(db, `bookings`))
                set(ref(db, `bookings/${bid}`), {
                    'pet owner': myid,
                    'pet service provider': uid,
                    'status': 'pending'
                })
                .then(() => {
                    var status = document.getElementById('status')
                    status.innerText = 'booking added successfully'
                })
                .catch((error) => {
                    var status = document.getElementById('status')
                    status.innerText = 'add booking unsuccessful'
                }); 

                set(ref(db, `users/${myid}/bookings/${bid}`), 'pending') 
                set(ref(db, `users/${uid}/bookings/${bid}`), 'pending') 

            },

            // update booking status
            updateBooking(uid,bid,stat){
                set(ref(db,`bookings/${bid}/status`), stat)
                .then(() => {
                    var status = document.getElementById('status')
                    status.innerText = 'booking updated successfully'
                })
                .catch((error) => {
                    // The write failed...
                    var status = document.getElementById('status')
                    status.innerText = 'booking update unsuccessful'
                });

                set(ref(db,`users/${myid}/bookings/${bid}`), stat)
                set(ref(db,`users/${uid}/bookings/${bid}`), stat)
            },

            // retrive all bookings
            getBookings(){

            },

            // add services provided or update price of existing service
            addService (service, quote){
                set(ref(db, `users/${myid}/services/${service}`), quote) 
                .then(() => {
                    var status = document.getElementById('status')
                    status.innerText = 'service added successfully'
                })
                .catch((error) => {
                    // The write failed...
                    var status = document.getElementById('status')
                    status.innerText = 'add service unsuccessful'
                });
            }, 

            // retrieve all services
            getServices(){

            },
            
            // remove service
            deleteService (service){
                set(ref(db, `users/${myid}/services/${service}`), null)
            },

            // create new review
            addReview (uid,rid,rev,bid){

                // rid : review id 
                // uid : the other user's id
                // rev : the review give
                // bid : booking id for this review

                set(ref(db, `reviews/${rid}`), {
                    user : myid,
                    review : rev,
                    recipient : uid,
                })
                .then(() => {
                    var status = document.getElementById('status')
                    status.innerText = 'review added successfully'
                })
                .catch((error) => {
                    var status = document.getElementById('status')
                    status.innerText = 'add review unsuccessful'
                }); 

                set(ref(db, `users/${uid}/reviews/${bid}`), rid)

            },

            // retrieve all reviews received
            getReviews(){
                onValue(ref(db, `users/${myid}/reviews`), (snapshot) => {
                    reviews = snapshot.val()
                    rev = document.getElementById('reviews')
                    for (rid of reviews){
                        rev.innerHTML += '<p>my id:' + reviews[rid][user] + 'review id: ' + rid + ' review: ' + reviews[rid][review] + ' review for: ' + reviews[rid][recipient] + '</p>'
                    }
                });
            },

            updateReview(uid,rid,newrev){
                // set(ref(db, `reviews/${rid}/review`), newrev)
                // .then(() => {
                //     var status = document.getElementById('status')
                //     status.innerText = 'review updated successfully'
                // })
                // .catch((error) => {
                //     var status = document.getElementById('status')
                //     status.innerText = 'update review unsuccessful'
                // }); 
            },

            deleteReview(uid,rid){

            },

            // create new pet 
            addPet (pid,name,age,breed,notes){
                // pid : pet id 

                set(ref(db, `pets/${pid}`), {
                    name: name,
                    age: age,
                    breed: breed,
                    owner: myid,
                    notes : notes
                })
                .then(() => {
                    var status = document.getElementById('status')
                    status.innerText = 'pet added successfully'
                })
                .catch((error) => {
                    var status = document.getElementById('status')
                    status.innerText = 'add pet unsuccessful'
                }); 

                set(ref(db, `users/${myid}/pets/${pid}`), true)
            },    

            // retrieve all pets
            getPets(){

            },
            
            // remove pet from user pets
            deletePet(pid){
                // pet record will still exist in pets
                set(ref(db,`users/${myid}/pets/${pid}`), false)
            },

            // create new user 
            addUser (myid,username,password,name,pic,num,type,desc,addr){

                set(ref(db, `users/${myid}`), {
                    username: username,
                    password: password,
                    profilepic : pic,
                    nickname: name,
                    number: num,
                    type: type,
                    desc: desc,
                    address: addr,
                })
                .then(() => {
                    // Data saved successfully!
                    var status = document.getElementById('status')
                    status.innerText = 'user added successfully'
                })
                .catch((error) => {
                    // The write failed...
                    var status = document.getElementById('status')
                    status.innerText = 'add user unsuccessful'
                });   
            },

            // retrieve all user information
            getUser(){

            },

            // change username / password / nickname / profilepic / desc / address / number
            updateUsername (newUsername){
                set(ref(db,`users/${myid}/username`), newUsername)
                .then(() => {
                    var status = document.getElementById('status')
                    status.innerText = 'username updated successfully'
                })
                .catch((error) => {
                    // The write failed...
                    var status = document.getElementById('status')
                    status.innerText = 'username update unsuccessful'
                });
            },
            
        },

        async mounted() {
        //     set(myinfo, {
        //         username: myusername,
        //         profilepic : myphoto,
        //         nickname: newname,
        //         pets: {}
        //     })
        //     .then(() => {
        //         // Data saved successfully!
        //         var status = document.getElementById('status')
        //         status.innerText = 'data saved successfully'
        //     })
        //     .catch((error) => {
        //         // The write failed...
        //         var status = document.getElementById('status')
        //         status.innerText = 'create user unsuccessful'
        //     });
  
        }
    }

</script>