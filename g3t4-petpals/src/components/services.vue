<style>

</style>

<template>

    <div @mouseenter="hover['Pet Walking'] = true" @mouseleave="hover['Pet Walking'] = false"
        class="col-xxl-2 col-md-4 col-sm-6 p-5">
        <img src="@/img/png/walker.png" class="w-100">

        <div v-if="hover['Pet Walking']" class="pt-4">
            <p style="color:#856658">{{ tags['Pet Walking'] }}</p>
        </div>

        <div v-else class="pt-4">
            <h4 class="text-center" style="color:#856658; padding-bottom:90px">Pet Walking</h4>
        </div>

    </div>

    <div @mouseenter="hover['Pet Grooming'] = true" @mouseleave="hover['Pet Grooming'] = false"
        class="col-xxl-2 col-md-4 col-sm-6 p-5">
        <img src="@/img/png/groomer.png" class="w-100">

        <div v-if="hover['Pet Grooming']" class="pt-4">
            <p style="color:#856658">{{ tags['Pet Grooming'] }}</p>
        </div>

        <div v-else class="pt-4">
            <h4 class="text-center" style="color:#856658; padding-bottom:90px">Pet Grooming</h4>
        </div>

    </div>

    <div @mouseenter="hover['Pet Hotels'] = true" @mouseleave="hover['Pet Hotels'] = false"
        class="col-xxl-2 col-md-4 col-sm-6 p-5">
        <img src="@/img/png/hotel.png" class="w-100">

        <div v-if="hover['Pet Hotels']" class="pt-4">
            <p style="color:#856658">{{ tags['Pet Hotels'] }}</p>
        </div>

        <div v-else class="pt-4">
            <h4 class="text-center" style="color:#856658; padding-bottom:90px">Pet Hotels</h4>
        </div>

    </div>

    <div @mouseenter="hover['Pet Sitters'] = true" @mouseleave="hover['Pet Sitters'] = false"
        class="col-xxl-2 col-md-4 col-sm-6 p-5">
        <img src="@/img/png/sitter.png" class="w-100">

        <div v-if="hover['Pet Sitters']" class="pt-4">
            <p style="color:#856658">{{ tags['Pet Sitters'] }}</p>
        </div>

        <div v-else class="pt-4">
            <h4 class="text-center" style="color:#856658; padding-bottom:90px">Pet Sitting</h4>
        </div>

    </div>

    <div @mouseenter="hover['Pet Trainers'] = true" @mouseleave="hover['Pet Trainers'] = false"
        class="col-xxl-2 col-md-4 col-sm-6 p-5">
        <img src="@/img/png/trainer.png" class="w-100">

        <div v-if="hover['Pet Trainers']" class="pt-4">
            <p style="color:#856658">{{ tags['Pet Trainers'] }}</p>
        </div>

        <div v-else class="pt-4">
            <h4 class="text-center" style="color:#856658; padding-bottom:90px">Pet Training</h4>
        </div>

    </div>

    <div @mouseenter="hover['Pet Transport'] = true" @mouseleave="hover['Pet Transport'] = false"
        class="col-xxl-2 col-md-4 col-sm-6 p-5">
        <img src="@/img/png/catincar.png" class="w-100">

        <div v-if="hover['Pet Transport']" class="pt-4">
            <p style="color:#856658">{{ tags['Pet Transport'] }}</p>
        </div>

        <div v-else class="pt-4">
            <h4 class="text-center" style="color:#856658; padding-bottom:90px">Pet Moving</h4>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            hover: { 'Pet Walking': false, 'Pet Grooming': false, 'Pet Hotels': false, 'Pet Sitters': false, 'Pet Trainers': false, 'Pet Transport': false },
            services: ['Pet Walking','Pet Grooming','Pet Hotels','Pet Sitters','Pet Trainers','Pet Transport'],
            tags: {'Pet Walking': 'Take your pet out on scheduled walks with our Pet Walkers.', 'Pet Grooming': 'Be returned a clean and fresh pet with our experienced Pet Groomers.', 'Pet Hotels': 'Leave your pet with our trusted Pet Hotel Providers while on holiday.', 'Pet Sitters': 'Leave your pet with our trusted Pet Sitters while running errands.', 'Pet Trainers': 'Train your pet with our qualified Pet Trainers.', 'Pet Transport': 'Transport your pet safely with our Pet Movers.'}
        };
    },
    props: ['png', 'tag', 'service']

}
</script>
