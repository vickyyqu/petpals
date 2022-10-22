<script setup>
    (function(t,a,l,k,j,s){
    s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.head.appendChild(s)
    ;k=t.Promise;t.Talk={v:3,ready:{then:function(f){if(k)return new k(function(r,e){l.push([f,r,e])});l
    .push([f])},catch:function(){return k&&new k()},c:l}};})(window,document,[]);  
    
</script>

<template>
    <!--   Chat    -->
    <div class = 'container-fluid '>
        <navbar></navbar>
        
        <div id="talkjs-container" style="width: 80%; margin: 80px; height: 500px; float: right; ">
            <i>Loading chat...</i>
        </div>
    </div>
</template>

<!-- Connecting firebase to talkjs -->
<script type = 'module'>
    import navbar from '@/components/navbar.vue'

    export default {
        components: {
            navbar
        }
    }

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