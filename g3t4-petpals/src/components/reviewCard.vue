<style>
    .card {
        border-color:#fcf5f7;
    }
</style>

<template>
<div class="card pb-3">
    <div class="card-body">
        <div class="row">
            <div class="col-4">
                <h4 class="card-reviewID">{{reviewer}}</h4>
                <h4 class="card-reviewer">「&nbsp;{{services[service]}}&nbsp;」</h4>
                <br>
                <h5 class="card-reviewer">Rated: </h5>
                <div class="ratings">
                    <i v-for="n in parseInt(rating)" class="bi bi-star-fill"></i>
                    <i v-if='!Number.isInteger(rating)' class="bi bi-star-half"></i>
                    <i v-for='m in parseInt(5-rating)' class="bi bi-star"></i>
                </div>
            </div>

            <div class="col-8 my-auto">
                <p class="card-text">“ {{review}} ”</p>
            </div>
        </div>  
    </div>
</div>  
</template>

<script>
export default {
    props: ['reviewer','service', 'review', 'rating'],
    
    data(){
        return {
            services: {'Pet Walker': "Pet Walking",
                        'Pet Trainer': 'Pet Training',
                        'Pet Hotel': 'Pet Hotel',
                        'Pet Sitter': 'Pet Sitting',
                        'Pet Groomer': 'Pet Grooming',
                        'Pet Mover' : 'Pet Moving'}
        }
    }
}
</script>
