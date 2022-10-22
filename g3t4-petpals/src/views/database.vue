<style></style>

<template>
    <h1 >testing firebase realtime database</h1>
    
    <p id = 'username'></p>
    <img id = 'pic' src = '' alt = ''>
    <p id = 'status'></p>
</template>

<script setup>
    var myid = 1235
    var myusername = 'benny'
    var myphoto = 'https://talkjs.com/images/avatar-2.jpg'
    var newname = 'benni'
</script>

<script type="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";

    const firebaseConfig = {
        apiKey: "AIzaSyAS74F4gerXVK8OW-RBq3rSGNEoHuqLQ0A",
        authDomain: "petpals-623e3.firebaseapp.com",
        projectId: "petpals-623e3",
        storageBucket: "petpals-623e3.appspot.com",
        messagingSenderId: "949038254831",
        appId: "1:949038254831:web:82d399649bb06e8389e91a",
    //   measurementId: "G-T2RHSRBRN0",
        databaseURL: "https://petpals-623e3-default-rtdb.asia-southeast1.firebasedatabase.app/"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // Import the functions needed to read from realtime database
    import { getDatabase, ref, onValue, set, update, get} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

    // connect to the realtime database
    const db = getDatabase(app);

    // create new user 
    const myinfo = ref(db, `users/${myid}`)

    // create new user and check status
    set(myinfo, {
        username: myname,
        profilepic : myphoto,
    })
    .then(() => {
        // Data saved successfully!
        var status = document.getElementById('status')
        status.innerText = 'data saved successfully'
    })
    .catch((error) => {
        // The write failed...
        var status = document.getElementById('status')
        status.innerText = 'create user unsuccessful'
    });

    // update user information and check status
    var updateobj = {};
    updateobj[`users/${myid}/nickname`] = newname

    update(ref(db), updateobj)
    .then(() => {
        var status = document.getElementById('status')
        status.innerText = 'data updated successfully'
    })
    .catch((error) => {
        // The write failed...
        var status = document.getElementById('status')
        status.innerText = ' update unsuccessful'
    });
    
    // can use this for profile page to show user profile info -> updates itself
    onValue(ref(db, `users/${myid}`), (snapshot) => {
        console.log(snapshot.val()); // get the new value
        document.getElementById('username').innerText = snapshot.val().username;
        document.getElementById('pic').src = snapshot.val().profilepic;
    });
    
    // getting user information once 
    get(ref(db, `users/${myid}`))
    .then((snapshot) => {
        if (snapshot.exists()) {
        console.log(snapshot.val());
        } else {
        console.log("No data available");
        }
    })
    .catch((error) => {
        console.error(error);
    });

</script>