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
                <div class="mt-5 pt-3">

                </div>
            </div>

            <div class="col-10">
                <div class="px-5">
                    <h3 class="my-4">Your bookings</h3>
                </div>

                <div class="row">
                    <div class="col-6">
                            <h4>serviceproviderusername</h4>
                            <h4>date</h4>
                            <h5>pet services involved</h5>
                            <h6>pet involved</h6>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <img src="" alt="" style="height: 50%">  
                        </div>
                        <div class="row">
                            <div class="col-4">
                            <button type="button" class="btn btn-primary" style="width: 100%"> CHAT </button>
                            </div>
                            <div class="col-4"></div>
                            <div class="col-4">
                            <button type="button" class="btn btn-success" style="pointer-events: none; width: 100%;"> CONFIRMED </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-1"></div>
                            <div class="col-10">
                                <button class="btn btn-info" style="width: 100%">Leave your PetPals Service Provider a review!</button>
                            </div>
                            <div class="col-1"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-1 sides"></div>
        </div>
    </div>
</template>

<script>
    import navbar from '@/components/navbar.vue'

    export default {
        data() {
            return {
                
            }
        },
        components: {
            navbar
        }
    }
</script>