<style>
.card {
    border: none;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    background-color: rgb(251, 248, 248);

}

.profile-details, i{
    color: #856658;
}

</style>

<template>

    <div class="card mb-3">
        <div class="d-flex align-items-center mt-3 mx-3" >

            <div class="d-flex justify-content-start align-items-center">
                <img class="mr-3 rounded-circle"
                    src="https://assets.codepen.io/460692/internal/avatars/users/default.png"
                    style="max-width:70px">
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
        <div class="card-body" v-if='type == "Pet Owner"'>
            <h6 class="card-title">Bio:</h6>
            <small class="card-text">{{desc}}</small>
        </div>
        <div class="card-footer">
            <div class="text-end">
                <small class="profile-details"><i class="bi bi-currency-dollar"></i>{{rates}} </small>
                <small class="profile-details"><i class="bi bi-geo"></i> {{location}} </small>
                <small v-if='type == "Pet Owner"' class="profile-details"><i class="bi bi-house-heart"></i>{{yrsOfExp}}</small>
                
            
            </div>
        </div>

      
    </div>
    <div class="buttons m-2">
        <div v-if="delete" class="d-flex justify-content-end"><button class="btn btn-cancel p-2" @click="cancel">Cancel Request</button></div>

        <div v-else class="d-flex justify-content-end mb-0"><p style="color:brown" class="p-1">Request Cancelled</p></div>
    </div>
 

</template>

<script>
export default {
    data() {
        return {
            img: "src/img/png/groomer.png",
            delete: true
        }

    },
    props: ['name', 'desc', 'rates', 'location', 'img', 'yrsOfExp', 'ratings','service', 'type','otherid'],
    methods: {
        cancel() {
            this.delete = false
 
        },

    }

}

</script>

