<script setup>
    (function(t,a,l,k,j,s){
    s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.head.appendChild(s)
    ;k=t.Promise;t.Talk={v:3,ready:{then:function(f){if(k)return new k(function(r,e){l.push([f,r,e])});l
    .push([f])},catch:function(){return k&&new k()},c:l}};})(window,document,[]);  
    
</script>

<template>
    <!-- Navbar -->
    <div class="row">
        <div class="navbar-header" id="navbar-header">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-sm ">
                    <img src="./img/logo2.png" style="width: 80px">
                    <button class="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
            
                    <div class="collapse navbar-collapse justify-content-end text-center" id="navbarSupportedContent">
                        <ul class="navbar-nav">
            
                            <li class="nav-item px-1">
                                <a class="nav-link" href="index.html" target="blank">Home</a>
                            </li>
            
                            <li class="nav-item px-1">
                                <a class="nav-link" href="#" target="blank">Search</a>
                            </li>
            
                            <li class="nav-item px-1">
                                <a class="nav-link" href="chatpage.html" target="blank">Messages</a>
                            </li>
            
                            <li class="nav-item px-1">
                                <a class="nav-link" href="#" target="blank">Bookings</a>
                            </li>
            
                            <li class="nav-item active px-1">
                                <a class="nav-link" href="#" target="blank">Profile</a>
                            </li>
            
                            <li class="nav-item active px-1">
                                <a class="nav-link" href="#" target="blank" style="color:rgb(195, 82, 82)">Log Out</a>
                            </li>
            
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>


    <!--   Chat    -->
    <div class = 'container-fluid '>
        <div id="talkjs-container" style="width: 80%; margin: 80px; height: 500px; float: right; ">
            <i>Loading chat...</i>
        </div>
    </div>
</template>

<!-- Connecting firebase to talkjs -->
<script type = 'module'>
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


    import { getDatabase, ref, onValue, set, get, child } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";;

    // connect to the realtime database
    const db = getDatabase(app);

    var myId = '123';


    const user = ref(db, `users/${myId}`);
    // onValue(user, (snapshot) => {
    //     var myname = snapshot.val().username;
    //     var myphoto = snapshot.val().profilepic;
    // })

    // var myInfo = []
    get(user).then((snapshot) => {
        if (snapshot.exists()) {
        // console.log(snapshot.val());

        Talk.ready.then(function () {
            var me = new Talk.User({
                id: myId,
                name: snapshot.val().name,
                photoUrl: snapshot.val().profilepic,
                role: 'default'
            })

            window.talkSession = new Talk.Session({
            appId: 'tLVsZwjE',
            me: me,
            });

            var inbox = talkSession.createInbox();
            inbox.mount(document.getElementById('talkjs-container'));
        });

    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
</script>