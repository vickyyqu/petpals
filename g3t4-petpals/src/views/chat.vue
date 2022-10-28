<style>
    .chat {
        height: 725px;
    }

</style>

<template>
    <div class = 'container-fluid chat sides'>
       
        <navbar></navbar>

        
        <div ref="talkjs" style="width: 100%; height: 600px;" class = 'my-5 py-5'> 
            <i class="m-5" style="color: #4b3830; font-family: 'Figtree';">Loading chat...</i>
        </div>
    </div>

    <petpalsFooter></petpalsFooter>


    

</template>

<script>
    import navbar from '@/components/navbar.vue'
    import petpalsFooter from '@/components/petpalsFooter.vue'
    import Talk from 'talkjs';
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
    import { getDatabase, ref, get} from "firebase/database";

    // connect to the realtime database
    const db = getDatabase(app);

    const myid = 'alice' // need to get the id 
    const otherid = 'sebas'


    //Inbox.vue
    export default {
            name: 'Inbox',
            components: {
                navbar,
                petpalsFooter
            },
            methods : {
            },

            async mounted() {
                await Talk.ready


                // getting user information 
                get(ref(db, `users/${myid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const me = new Talk.User({
                            id: myid,
                            name: snapshot.val().nickname,  
                            photoUrl: snapshot.val().profilepic,
                            role: "default"
                            })

                            const talkSession = new Talk.Session({
                                appId: 'tLVsZwjE',
                                me: me,
                            });

                            get(ref(db,`users/${otherid}`))
                            .then((snapsht) => {
                                if (snapsht.exists()) {
                                    const other = new Talk.User({
                                        id: otherid,
                                        name: snapsht.val().nickname,  
                                        photoUrl: snapsht.val().profilepic,
                                        role: "default"
                                    })

                                    const conversation = talkSession.getOrCreateConversation(
                                        Talk.oneOnOneId(me, other)
                                    );
                              

                                    conversation.setParticipant(me);
                                    conversation.setParticipant(other);

                                    var inbox = talkSession.createInbox();
                                    inbox.select(conversation);

                                    inbox.mount(this.$refs.talkjs);
                                }})


                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        }
</script>