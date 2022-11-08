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
            hover: {'Pet Walking': false, 'Pet Grooming': false, 'Pet Hotels': false, 'Pet Sitters': false, 'Pet Trainers': false, 'Pet Transport': false}
            };
        },
        props: ['png', 'tag', 'service']

    }
</script>
