<style>
</style>

<template>
    <div @mouseenter="hover[service] = true" @mouseleave="hover[service] = false" class="col-xxl-2 col-md-4 p-3">
        <img v-bind:src="png" class="w-100">

        <div v-if="hover[service]" class="pt-4">
            <p style="color:#856658">{{tag}}</p>
        </div>

        <div v-else class="pt-4">
            <h3 class="pb-3">{{service}}</h3>
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
