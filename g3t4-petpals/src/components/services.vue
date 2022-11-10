<style>
</style>

<template>
<div @mouseenter="hover[service] = true" @mouseleave="hover[service] = false" class="col-xxl-2 col-md-4 col-sm-6 p-5">
    <img v-bind:src="png" class="w-100">

    <div v-if="hover[service]" class="pt-4">
        <p style="color:#856658">{{tag}}</p>
    </div>

    <div v-else class="pt-4">
        <h4 class="text-center" style="color:#856658; padding-bottom:90px">{{service}}</h4>
    </div>
    

    
</div>
</template>

<script>
    export default {
        data() {
            return {
            hover: {'Pet Walking': false, 'Pet Grooming': false, 'Pet Hotels': false, 'Pet Sitters': false, 'Pet Trainers': false, 'Pet Transport': false},
            // services: ['Pet Walking','Pet Grooming','Pet Hotels','Pet Sitters','Pet Trainers','Pet Transport'],
            // tags: {'Pet Walking': 'Take your pet out on scheduled walks with our Pet Walkers.', 'Pet Grooming': 'Be returned a clean and fresh pet with our experienced Pet Groomers.', 'Pet Hotels': 'Leave your pet with our trusted Pet Hotel Providers while on holiday.', 'Pet Sitters': 'Leave your pet with our trusted Pet Sitters while running errands.', 'Pet Trainers': 'Train your pet with our qualified Pet Trainers.', 'Pet Transport': 'Transport your pet safely with our Pet Movers.'},
            // png: {'Pet Walking': '@/img/png/walker.png', 'Pet Grooming': '@/img/png/groomer.png', 'Pet Hotels': 'src/img/png/hotel.png', 'Pet Sitters': 'src/img/png/sitter.png', 'Pet Trainers': 'src/img/png/trainer.png', 'Pet Transport': 'src/img/png/catincar.png'},
            };
        },
        props: ['png', 'tag', 'service']

    }
</script>
