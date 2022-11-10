<style>


</style>

<template>
<div class="card mx-auto " style="width:150px;" >
    <div class="card-body">
        <div class="row">
            <div class="col-9">
                <h4 class="card-reviewID">{{title}}</h4>
            </div>
            <div class = 'col-3'>
                <span><button class="btn btn-select px-3 ms-1 float-end" v-on:click="$emit('edit')"><i class="bi bi-pencil-square"></i></button></span>
            </div>
        </div>  
        <div class = 'row my-2'>
            <small class="card-reviewer"> Starts: </small>
                <br/>
            <small class="card-reviewer"> Ends: </small>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['date','title','from', 'to'], // day: 9, month: 'Nov', year: '2022'
    methods: {

    },
}
</script>
