
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
    <div v-if=sent class="col-xl-3 col-md-6 pt-3">
        <div class="card">
            <div class="d-flex align-items-center mt-3 mx-3">

                <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-3 rounded-circle"
                        src="https://assets.codepen.io/460692/internal/avatars/users/default.png"
                        style="max-width:70px">
                </div>

                <div class="ms-2">
                    <h6>{{name}} Laura Goh</h6>
                    <small style="font-style:italic;">PetPals user since 2022</small>

                    <div class="ratings">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                    </div>

                </div>

            </div>
            <div class="card-body">
                <h6 class="card-title">Bio:</h6>
                <small class="card-text">{{desc}} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non atque
                    unde tempora consectetur est libero modi iure molestias alias similique odit repudiandae minima ab
                    iusto!</small>
            </div>
            <div class="card-footer">
                <div class="text-end">
                    <small class="profile-details"><i class="bi bi-currency-dollar"></i> {{rates}} 20/h, </small>
                    <small class="profile-details"><i class="bi bi-geo"></i> {{location}} Bukit Batok, </small>
                    <small class="profile-details"><i class="bi bi-house-heart"></i>{{yrsOfExp}} 5 Years of
                        Experience</small>


                </div>
            </div>


        </div>
        <button class="btn mx-5 my-3 btn-select" @click="sent = false">Send Request</button>
    </div>

    <div v-else class="col-xl-3 col-md-6 p-3">
        <div class="card card-sent" style="background-color: #f8f1ef;">
            <div class="d-flex align-items-center mt-3 mx-3">

                <div class="d-flex justify-content-start align-items-center">
                    <img class="mr-3 rounded-circle"
                        src="https://assets.codepen.io/460692/internal/avatars/users/default.png"
                        style="max-width:70px">
                </div>

                <div class="ms-2">
                    <h6>{{name}} Laura Goh</h6>
                    <small style="font-style:italic;">PetPals user since 2022</small>

                    <div class="ratings">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                    </div>

                </div>

            </div>
            <div class="card-body">
                <h6 class="card-title">Bio:</h6>
                <small class="card-text">{{desc}} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non atque
                    unde tempora consectetur est libero modi iure molestias alias similique odit repudiandae minima ab
                    iusto!</small>
            </div>
            <div class="card-footer">
                <div class="text-end">
                    <small class="profile-details"><i class="bi bi-currency-dollar"></i> {{rates}} 20/h, </small>
                    <small class="profile-details"><i class="bi bi-geo"></i> {{location}} Bukit Batok, </small>
                    <small class="profile-details"><i class="bi bi-house-heart"></i>{{yrsOfExp}} 5 Years of
                        Experience</small>
                </div>
            </div>
        </div>

        <button class="btn mx-5 my-3 btn-cancel" @click="sent = true">Cancel Request</button>
    </div>



</template>

<script>

export default {
    data() {
        return {
            sent: true
        }
    },
    props: ['title', 'desc', 'rates', 'location', 'img', 'ratings'],
    methods: {
        sendRequest() {
            this.sent = false
            alert("Request Sent!")
        }
    }

}
</script>
