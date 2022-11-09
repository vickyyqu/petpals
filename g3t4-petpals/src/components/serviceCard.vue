<style>
.card {
    border: none;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(122, 108, 108, 0.2);
    background-color: rgb(255, 252, 252);

}

.profile-details, i{
    color: #856658;
}

</style>

<template>
<div class="card m-2" style="width:45%;">
    <div class="card-body">
        <div class="row">
            <div class="col-4">
                <img class="rounded-circle mx-2"
                src = "../img/png/walker.png"
                style="max-width:80px" v-if="service=='Pet Walker'" >
                <img class="rounded-circle mx-2"
                src = "../img/png/sitter.png"
                style="max-width:80px" v-if="service=='Pet Sitter'" >
                <img class="rounded-circle mx-2"
                src = "../img/png/hotel.png"
                style="max-width:80px" v-if="service=='Pet Hotel'" >
                <img class="rounded-circle mx-2"
                src = "../img/png/catincar.png"
                style="max-width:80px" v-if="service=='Pet Mover'" >
                <img class="rounded-circle mx-2"
                src = "../img/png/groomer.png"
                style="max-width:80px" v-if="service=='Pet Groomer'" >
                <img class="rounded-circle mx-2"
                src = "../img/png/trainer.png"
                style="max-width:80px" v-if="service=='Pet Trainer'" >
            </div>
            <div class="col-8">
                <h4 class="card-reviewID">{{service}}</h4>
                <small class="card-reviewer">Price: ${{price}}/<span v-if="service=='Pet Hotel'">day</span><span v-else>hr</span></small>
            </div>
        </div>  
        <div class = 'row my-2'>
            <div class = 'col-9'>
                <h5>Description:</h5>
                <p class="card-text text-center">{{desc}}</p>                       
            </div>
            <div class = 'col-3'>
                <span><button class="btn btn-select px-3 mx-1 float-end" v-on:click="$emit('edit')"><i class="bi bi-pencil-square"></i></button></span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['service','desc','price'],
}
</script>
