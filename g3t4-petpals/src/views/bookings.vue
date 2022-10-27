<style>

.required {
    font-style: italic;
    color: #dfd1cd;
}

.requests-made {
    border-right: 2px solid #dfd1cd;
}
</style>

<template>
    <div class="container-fluid">
        <navbar></navbar>

        <div class="row">
            <div class="col-1 sides">
            </div>

            <div class="col-lg-5 requests-made mt-5 p-5">
                <h3 class="my-5">Pending Requests</h3>
                <p class="my-5 text-center nil">No requests yet...</p>

                <RequestPending></RequestPending>

                <h3 class="my-5" >Confirmed Requests</h3>
                <p class="my-5 text-center nil">No requests yet...</p>

                <RequestConfirmed></RequestConfirmed>

            </div>

            <div class="col-lg-5 confirmed-bookings mt-5 p-5">
                <h3 class="my-5">Confirmed Bookings</h3>
                <p class="my-5 text-center nil">No bookings yet...</p>
                <BookingConfirmed></BookingConfirmed>
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
    import RequestPending from '@/components/RequestPending.vue'
    import RequestConfirmed from '@/components/RequestConfirmed.vue'
    import BookingConfirmed from '@/components/BookingConfirmed.vue'

    export default {
        data() {
            return {
                count: 0
            }
        },
        components: {
            navbar,
            petpalsFooter,
            RequestPending,
            RequestConfirmed,
            BookingConfirmed
        }
    }
</script>
