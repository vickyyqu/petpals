<style>
</style>

<template>
    <div @mouseenter="hover[service] = true" @mouseleave="hover[service] = false" class="col-xxl-2 col-sm-4 p-3">
        <img v-bind:src="png" class="w-100">

        <div v-if="hover[service]" class="pt-4">
            <p style="color:#856658">{{tag}}</p>
        </div>

        <div v-else class="pt-4">
            <h4 class="pb-3 text-center" style="color:#856658">{{service}}</h4>
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
