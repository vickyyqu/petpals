
<style>
    .btn-cancel {
        background-color: #77686d;
        color: #f8f1ef;
    }
    .btn-cancel:hover {
        background-color: #58484e;
        color: #f8f1ef;
    }

    .card-sent {
        background-color: #f8f1ef;
    }
    .card {
        border-color:#fcf5f7;
    }
</style>

<template>
    <div v-if=sent class="col-xl-3 col-md-6 p-2">
        <div class="card">
            <img v-bind:src="img" class="card-img-top">
            <div class="card-body mx-2">
                <h5 class="card-title">{{title}}</h5>
                <h6 class="card-title">Bio:</h6>
                <p class="card-text">{{desc}}</p>
                <p class="provider-rate my-0"><i class="bi bi-currency-dollar"></i> {{rates}}/h</p>
                <p class="provider-location my-0"><i class="bi bi-geo"></i> {{location}}</p>
            </div>
            <button class="btn btn-dark mx-5 my-3" @click="sent=false">Send Request</button>
        </div>
    </div>

    <div v-else class="col-xl-3 col-md-6 p-2">
        <div class="card card-sent">
            <img v-bind:src="img" class="card-img-top">
            <div class="card-body mx-2">
                <h5 class="card-title">{{title}}</h5>
                <h6 class="card-title">Bio:</h6>
                <p class="card-text">{{desc}}</p>
                <p class="provider-rate my-0"><i class="bi bi-currency-dollar"></i> {{rates}}/h</p>
                <p class="provider-location my-0"><i class="bi bi-geo"></i> {{location}}</p>
            </div>
            
            <button class="btn mx-5 my-3 btn-cancel" @click="sent=true">Cancel Request</button>
        </div>
    </div>



</template>

<script>
    export default {
            data(){
                return {
                    sent: true
                }
            },
            props: ['title', 'desc', 'rates','location', 'img']

        }
</script>
