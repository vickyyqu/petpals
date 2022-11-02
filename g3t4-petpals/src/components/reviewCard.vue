<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <h3 class="card-reviewID">REVIEWID{{reviewID}}</h3>
                    <br>
                    <h4 class="card-reviewer">NAME{{reviewer}}</h4>
                </div>

                <div class="col-9">
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quis accusamus alias, molestias maiores aliquam provident aperiam praesentium eaque eligendi, natus odit doloremque delectus voluptatum totam quae dolore repudiandae dolor?{{desc}}</p>
                </div>
            </div>  
        </div>
  </div>
</template>

<script>
    export default {
            props: ['reviewID','reviewer', 'desc']
        }
</script>

<style>
    .card {
        border-color:#fcf5f7;
    }
</style>