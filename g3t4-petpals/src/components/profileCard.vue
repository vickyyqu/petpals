
<style>
.btn-cancel {
    background-color: #77686d;
    color: #f8f1ef;
}

.btn-cancel:hover {
    background-color: #58484e;
    color: #f8f1ef;
}
</style>

<template>
    <div v-if="sent" class="col-xl-3 col-md-6 pt-3">
        <div class="card">
            <div class="d-flex align-items-center mt-3 mx-3">

                <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-3 rounded-circle" v-bind:src = 'img' style="max-width:70px">
                </div>

                <div class="ms-2">
                    <h6>{{name}}</h6>
                    <small style="font-style:italic;">{{service}}</small>

                    <div class="ratings">
                        <i v-if = 'ratings >= 1' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 2' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 3' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 4' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings == 5' class="bi bi-star-fill"></i>
                        <i v-if = '!Number.isInteger(ratings)' class="bi bi-star-half"></i>
                        <i v-else class="bi bi-star"></i>
                        <i v-if = 'ratings < 1' class="bi bi-star"></i>
                        <i v-if = 'ratings < 2' class="bi bi-star"></i>
                        <i v-if = 'ratings < 3' class="bi bi-star"></i>
                        <i v-if = 'ratings < 4' class="bi bi-star"></i>
                    </div>

                </div>

            </div>
            <div class="card-body">
                <h6 class="card-title">Bio:</h6>
                <small class="card-text">{{desc}}</small>
            </div>
            <div class="card-footer">
                <div class="text-end">
                    <small class="profile-details"><i class="bi bi-currency-dollar"></i>{{rates}}/hr </small>
                    <small class="profile-details"><i class="bi bi-geo"></i> {{location}} </small>
                    <small class="profile-details"><i class="bi bi-house-heart"></i> {{yrsOfExp}} Years of experience </small>


                </div>
            </div>


        </div>
        <button class="btn mx-5 my-3 btn-select" @click="sent = false">Send Request</button>
    </div>

    <div v-else class="col-xl-3 col-md-6 pt-3">
        <div class="card card-sent" style="background-color: #f8f1ef;">
            <div class="d-flex align-items-center mt-3 mx-3">

                <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-3 rounded-circle" v-bind:src = 'img' style="max-width:70px">
                </div>

                <div class="ms-2">
                    <h6>{{name}}</h6>
                    <small style="font-style:italic;">{{service}}</small>

                    <div class="ratings">
                        <i v-if = 'ratings >= 1' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 2' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 3' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 4' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings == 5' class="bi bi-star-fill"></i>
                        <i v-if = '!Number.isInteger(ratings)' class="bi bi-star-half"></i>
                        <i v-else class="bi bi-star"></i>
                        <i v-if = 'ratings < 1' class="bi bi-star"></i>
                        <i v-if = 'ratings < 2' class="bi bi-star"></i>
                        <i v-if = 'ratings < 3' class="bi bi-star"></i>
                        <i v-if = 'ratings < 4' class="bi bi-star"></i>
                    </div>
 
                </div>

            </div>
            <div class="card-body">
                <h6 class="card-title">Bio:</h6>
                <small class="card-text">{{desc}}</small>
            </div>
            <div class="card-footer">
                <div class="text-end">
                    <small class="profile-details"><i class="bi bi-currency-dollar"></i>{{rates}}/hr </small>
                    <small class="profile-details"><i class="bi bi-geo"></i> {{location}} </small>
                    <small class="profile-details"><i class="bi bi-house-heart"></i> {{yrsOfExp}} Years of experience</small>
                </div>
            </div>
        </div>

        <button class="btn mx-5 my-3 btn-cancel" @click="sent = true">Cancel Request</button>
    </div>

 

</template>

<script>

// dont need title? 

export default {
    data() {
        return {
            sent: true
        }
    },
    props: ['title', 'desc', 'rates', 'location', 'img', 'ratings', 'yrsOfExp', 'name', 'service'],
    methods: {
        sendRequest() {
            this.sent = false
            alert("Request Sent!")
        },

    }
  
}  
</script>
