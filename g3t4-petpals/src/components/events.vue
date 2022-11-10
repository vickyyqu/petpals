<style>


</style>

<template>
<div class="card mx-auto " style="width:175px;" >
    <div class="card-body">
        <div class="row">
            <div class="col-9">
                <h4 class="card-reviewID">{{title}}</h4>
                <h5></h5>
            </div>
            <div class = 'col-3'>
                <span><button class="btn btn-select px-2 py-1 float-end" v-on:click = "$emit('delete')"><i class="bi bi-trash3"></i></button></span>
            </div>
        </div>  
        <div class = 'row my-2'>
            <small class="card-reviewer"> Venue: {{venue}}</small>
                <br/>
            <small class="card-reviewer"> Starts: {{getTime(start)}}</small>
                <br/>
            <small class="card-reviewer"> Ends: {{getTime(end)}}</small>
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
