<template>
    <div class="col-xl-3 col-md-6 p-2">
        <div class="card">
            <img v-bind:src="img" class="card-img-top">
            <div class="card-body mx-2">
                <h5 class="card-title">{{title}}</h5>
                <p class="card-text">{{desc}}</p>
                <p class="provider-rate my-0"><i class="bi bi-currency-dollar"></i> {{rates}}/h</p>
                <p class="provider-location my-0"><i class="bi bi-geo"></i> {{location}}</p>
            </div>
            <button class="btn btn-dark mx-5 my-3">Send Request</button>
        </div>
    </div>

</template>

<script>
    export default {

            props: ['title', 'desc', 'rates','location', 'img']

        }
</script>

<style>
</style>