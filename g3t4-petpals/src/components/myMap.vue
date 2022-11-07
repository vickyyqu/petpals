<style>
#googleMap {
    width:100%;
    height:250px;
}
</style>

<template>

    <div class="col-lg-9">
        <span class="required me-2">Your Location:</span>
        <div class="input-group input-group-sm mb-3">
            <input type="text" class="form-control" aria-label="Small"
                aria-describedby="inputGroup-sizing-sm" v-model="inputAddr" :placeholder="msg">
        </div>
    </div>

    <div class="col-lg-3">
        <span class="required me-2 ">Search Radius:</span>
        <select class="form-select mb-3" aria-label="Default select example" v-model="searchRad">
            <option id="1" class="select-option" value=1>1km</option>
            <option id="3" class="select-option" value=3>3km</option>
            <option id="5" class="select-option" value=5>5km</option>
            <option id="10" class="select-option" value=10>10km</option>
            <option id="15" class="select-option" value=15>15km</option>
        </select>
    </div>

    <div class="my-2">
        <div id="googleMap" class="rounded-3"></div>
    </div>

    <button class="btn btn-go mt-3" v-on:click="searchClick">Go</button>

    <component :is="'script'" type="application/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAk7Dq17v0SWL983LCrYA_nXdA5fjitXxw&callback=initMap"></component>
</template>

<script>

    export default {
        data(){
            return {
                lat : 1.2973784,
                lng : 103.8495219,
                inputAddr: "",
                invalidAddr: false,
                msg: "Enter your location",
                searchRad: 1
            }
        },
        emits: ['searchClick'],
        mounted() {

            var currlat = this.lat
            var currlng = this.lng

            function initMap(){

                const uluru = { lat: currlat, lng: currlng};

                console.log(currlat)
                console.log(currlng)
                const map = new google.maps.Map(document.getElementById("googleMap"), {
                    zoom: 15,
                    center: uluru,
                });

                const marker = new google.maps.Marker({
                    position: uluru,
                    map: map,
                });
            
            }
            
            window.initMap = initMap;

        },
        methods: {

            searchClick(){
                console.log(this.inputAddr)

                axios.get("https://maps.googleapis.com/maps/api/geocode/json?", {
                    params: {
                        address : this.inputAddr,
                        key: "AIzaSyAk7Dq17v0SWL983LCrYA_nXdA5fjitXxw"
                        }
                    })
                .then(response => {
                    console.log(this.inputAddr)
                    console.log(response.data.results)

                    if (response.data.results.length > 0){

                        this.invalidAddr = false
                        var currlat = response.data.results[0].geometry.location.lat
                        var currlng = response.data.results[0].geometry.location.lng

                        console.log(currlat)
                        console.log(currlng)

                        const uluru = { lat: currlat, lng: currlng};

                        const map = new google.maps.Map(document.getElementById("googleMap"), {
                            zoom: 15,
                            center: uluru,
                        });

                        const marker = new google.maps.Marker({
                            position: uluru,
                            map: map,
                        })

                    } else {
                        this.invalidAddr = true
                        this.inputAddr = ""
                        this.msg = "Address not found. Try again with your address in full."
                    }
                    
                })
                .catch( error => {

                    console.log(error.message)
                    this.invalidAddr = true
                    this.inputAddr = ""
                    this.msg = "Address not found. Try again with your address in full."

                })

                this.$emit('searchClick', this.searchRad)

            }


        }


    }

</script>
