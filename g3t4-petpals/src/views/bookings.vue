<style>

.required {
    font-style: italic;
    color: #dfd1cd;
} 
</style>

<template>
    <div class="container-fluid">
        <navbar></navbar>

        <div class="row">
            <div class="col-1 sides">
            </div>

            <div class="col-sm-5 requests-made mt-5 p-5">
                <h3 class="my-5">Pending Requests</h3>
                <p class="my-5 text-center nil">No requests yet...</p>

                <h3 class="my-5" >Confirmed Requests</h3>
                <p class="my-5 text-center nil">No requests yet...</p>

            </div>

            <div class="col-sm-5 confirmed-bookings mt-5 p-5">
                <h3 class="my-5">Confirmed Bookings</h3>
                <p class="my-5 text-center nil">No bookings yet...</p>
            </div>

            <div class="col-1 sides">
            </div>

        </div>
    </div>

    <petpalsFooter></petpalsFooter>
 

</template>

<script>
    import navbar from '@/components/navbar.vue'
    import petpalsFooter from '@/components/petpalsFooter.vue'

    export default {
        data() {
            return {
                count: 0
            }
        },
        components: {
            navbar,
            petpalsFooter
        }
    }
</script>
