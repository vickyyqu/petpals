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
            <button class = 'rounded bg-light w-25' v-on:click = "addPet(123, 'coral', '13 years', 'corgi')">click me!</button>
        </div>
    </div>
</template>


<script >
    const myid = 1235
    const myusername = 'benny'
    const myphoto = 'https://talkjs.com/images/avatar-2.jpg'
    const newname = 'benni'

    import navbar from '@/components/navbar.vue'
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";

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
    import { getDatabase, ref, onValue, set, update, get} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

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
                set(ref(db, `bookings/${bid}`), {
                    'pet owner': myid,
                    'pet service provider': uid
                })
                .then(() => {
                    var status = document.getElementById('status')
                    status.innerText = 'booking added successfully'
                })
                .catch((error) => {
                    var status = document.getElementById('status')
                    status.innerText = 'add booking unsuccessful'
                }); 

                get(ref(db, `users/${myid}/bookings`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        var updateobj = {};
                        updateobj = JSON.stringify(JSON.parse(snapshot.val()).push(bid))

                        update(ref(db), updateobj)
                        .then(() => {
                            var status = document.getElementById('status')
                            status.innerText = 'bookings updated successfully'
                        })
                        .catch((error) => {
                            // The write failed...
                            var status = document.getElementById('status')
                            status.innerText = 'booking update unsuccessful'
                        });

                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            },

            // create new review
            addReview (uid,rid){
                // rid : review id 
                // uid : the other user's id
                set(ref(db, `reviews/${rid}`), {
                    'pet owner': myid,
                    'pet service provider': uid
                })
                .then(() => {
                    var status = document.getElementById('status')
                    status.innerText = 'review added successfully'
                })
                .catch((error) => {
                    var status = document.getElementById('status')
                    status.innerText = 'add review unsuccessful'
                }); 

                get(ref(db, `users/${myid}/reviews`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        var updateobj = {};
                        updateobj = JSON.stringify(JSON.parse(snapshot.val()).push(rid))

                        update(ref(db), updateobj)
                        .then(() => {
                            var status = document.getElementById('status')
                            status.innerText = 'reviews updated successfully'
                        })
                        .catch((error) => {
                            // The write failed...
                            var status = document.getElementById('status')
                            status.innerText = 'review update unsuccessful'
                        });

                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
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
                    services: {},
                    pets: {},
                    bookings: {},
                    reviews: {}
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

            // create new pet 
            addPet (pid,name,age,breed){
                // pid : pet id 
                // set(ref(db, `pets/${pid}`), {
                //     name: name,
                //     age: age,
                //     breed: breed,
                //     owner: myid
                // })
                // .then(() => {
                //     var status = document.getElementById('status')
                //     status.innerText = 'pet added successfully'
                // })
                // .catch((error) => {
                //     var status = document.getElementById('status')
                //     status.innerText = 'add pet unsuccessful'
                // }); 

                get(ref(db, `users/${myid}/pets`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        var updateobj = {}
                        updateobj[0] = pid

                        update(ref(db), updateobj)
                        .then(() => {
                            var status = document.getElementById('status')
                            status.innerText = 'pets updated successfully'
                        })
                        .catch((error) => {
                            // The write failed...
                            var status = document.getElementById('status')
                            status.innerText = 'pet update unsuccessful'
                        });

                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            },

            // change username / password / nickname / profilepic / desc / address / number
            updateUsername (newUsername){
                get(ref(db, `users/${myid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        var updateobj = {};
                        updateobj[`users/${myid}/username`] = newUsername

                        update(ref(db), updateobj)
                        .then(() => {
                            var status = document.getElementById('status')
                            status.innerText = 'username updated successfully'
                        })
                        .catch((error) => {
                            // The write failed...
                            var status = document.getElementById('status')
                            status.innerText = 'username update unsuccessful'
                        });

                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            },
            
            // add services provided
            addService (service, quote){
                get(ref(db, `users/${myid}/services`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        var updateobj = JSON.parse(snapshot.val())
                        updateobj[`users/${myid}/services/${service}`] = quote

                        update(ref(db), JSON.stringify(updateobj))
                        .then(() => {
                            var status = document.getElementById('status')
                            status.innerText = 'service added successfully'
                        })
                        .catch((error) => {
                            // The write failed...
                            var status = document.getElementById('status')
                            status.innerText = 'add service unsuccessful'
                        });

                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        },

        // async mounted() {
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
  
        // }
    }

</script>