<style>


</style>

<template>
<div class="card mx-auto " style="width:75%;" >
    <div class="card-body">
        <h4 class="card-reviewID text-center">{{title}}</h4>

        <div class = 'row my-2'>
            <small class="card-reviewer">Venue: {{venue}}</small>
            <div class = 'col-9 pe-0'>
            <small class="card-reviewer">Starts: {{getTime(start)}}</small>
                <br/>
            <small class="card-reviewer">Ends: {{getTime(end)}}</small>
            </div>
            <div class = 'col-3 px-0 d-flex align-items-center justify-content-start'>
                <span><button class="btn btn-select px-2 py-1" v-on:click = "$emit('delete')"><i class="bi bi-trash3"></i></button></span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['title','venue','start','end'], 
    methods: {
        getTime(time){
            var stime = time.split(':')
            if (Number(stime[0]) > 12){
                stime[0] = (Number(stime[0])-12).toString()
                return stime[0] + ':' + stime[1] + ' PM'

            }else if (stime[0] == '00'){
                stime[0] = '12'
            }

            if (Number(stime[0]) < 12){
                return Number(stime[0]) + ':' + stime[1] + ' AM'
            }
        }
    },
}
</script>
