<script setup>
</script>

<template>
    <navbar></navbar>

    <div ref="talkjs" style="width: 90%; margin: 30px; height: 500px">
        <i>Loading chat...</i>
    </div>

</template>

<script>
    import navbar from '@/components/navbar.vue'
    import Talk from 'talkjs';

    //Inbox.vue

    export default {
            name: 'Inbox',
            props: {
                currentUser: {
                    type: object,
                    required: true,
                    name: 'alice', 
                    id: 123,
                    pic: 'https://talkjs.com/images/avatar-1.jpg'
                }
            },
            components: {
                navbar
            },
            async mounted() {
                await Talk.ready
            }
        }

    //Inbox.vue

    const me = new Talk.User({
    id: this.currentUser.id,
    name: this.currentUser.name,  
    photoUrl: this.currentUser.pic,
    role: "default"
    })

    const talkSession = new Talk.Session({
        appId: 'tLVsZwjE',
        me: me,
    });

    var inbox = talkSession.createInbox();
    // inbox.select(conversation);

    inbox.mount(this.$refs.talkjs);
</script>
