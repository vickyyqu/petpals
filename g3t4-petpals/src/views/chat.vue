<style>
    .chat {
        height: 725px;
    }

</style>

<template>
    
<div class = 'container-fluid chat sides'>

    <navbar v-if="petOwner"></navbar>
    <navbarProvider v-else ></navbarProvider>

    <div ref="talkjs" style="width: 100%; height: 600px; position: absolute;" class = 'my-5 py-5'> 
        <i class="m-5" style="color: #4b3830; font-family: 'Figtree';">Loading chat...</i>
    </div>

    <petpalsFooter></petpalsFooter>

</div>

</template>

<script>
import navbar from '@/components/navbar.vue'
import navbarProvider from '@/components/navbarProvider.vue'
import petpalsFooter from '@/components/petpalsFooter.vue'
import Talk from 'talkjs';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";


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

export default {
        name: 'Inbox',

        data(){
            return {
                petOwner: true,
            }
        },       

        components: {
            navbar,
            navbarProvider,
            petpalsFooter,
        },

        async mounted() {
            await Talk.ready 

            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}`), (snapshot) => {
                        if (snapshot.val().type == 'Pet Owner'){
                            this.petOwner = true
                        }else{
                            this.petOwner = false
                        }   

                        var profilepic = snapshot.val().profilepic
                            if (profilepic.length > 2048){
                                profilepic = 'https://cdn-icons-png.flaticon.com/512/2102/2102647.png'
                            }

                        const me = new Talk.User({
                            id: user.uid,
                            name: snapshot.val().username,  
                            photoUrl: profilepic,
                            role: "default"
                        })

                        const talkSession = new Talk.Session({
                            appId: 'tLVsZwjE',
                            me: me,
                        });

                        if (typeof(snapshot.val().chat) != "undefined"){ 
                            var otherid = snapshot.val().chat
                            onValue(ref(db, `users/${otherid}`), (snapsht) => {
                                var photo = snapsht.val().profilepic
                                if (photo.length > 2048){
                                    photo = 'https://cdn-icons-png.flaticon.com/512/2102/2102647.png'
                                }

                                const other = new Talk.User({
                                    id: otherid,
                                    name: snapsht.val().username,  
                                    photoUrl: photo,
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

                            })
                        }else{
                            var inbox = talkSession.createInbox();
                            inbox.mount(this.$refs.talkjs);   
                        }


                    }); 



                } else {
                    console.log('user is signed out')
                }
            });

        }
    }
</script>