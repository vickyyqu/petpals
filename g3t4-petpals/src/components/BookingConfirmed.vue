<template>

    <div class="card mb-3">
        <div class="d-flex justify-content-between mt-3 mx-3" >

            <div class="d-flex justify-content-start align-items-center">
                <img class="mr-3 rounded-circle"
                    src="https://assets.codepen.io/460692/internal/avatars/users/default.png"
                    style="max-width:70px">

                <div class="ms-2">
                    <h6>{{name}} Laura Goh</h6>
                    <small style="font-style:italic;">PetPals user since 2022</small>
    
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

            
            <h2 class="pe-2"><i class="bi bi-check-circle-fill" style="color:#F8AA9D;"></i></h2>
            
        </div>
        <div class="card-body">
            <h6 class="card-title">Bio:</h6>
            <small class="card-text">{{desc}} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non atque unde tempora consectetur est libero modi iure molestias alias similique odit repudiandae minima ab iusto!</small>
        </div>
        <div class="card-footer">
            <div class="text-end">
                <small class="profile-details"><i class="bi bi-currency-dollar"></i> {{rates}} 20/h, </small>
                <small class="profile-details"><i class="bi bi-geo"></i> {{location}} Bukit Batok, </small>
                <small class="profile-details"><i class="bi bi-house-heart"></i> {{yrsOfExp}} 5 Years of Experience</small>
                
            
            </div>
        </div>

     
    </div>

    <div class="buttons m-2 d-flex justify-content-end">
        <button class="btn btn-cancel p-2">Leave Review</button>
    </div>


</template>

<style>
.card {
    border: none;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
    background-color: rgb(251, 248, 248);

}

</style>

<script>
export default {
    data() {
        return {
        }

    },
    props: ['name', 'desc', 'rates', 'location', 'img', 'yrsOfExp', 'ratings'],
    methods: {
    }

}

</script>