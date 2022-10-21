<script>
    function initMap(){
        var lat = 1.2973784
        var lng = 103.8495219
        const uluru = { lat: lat, lng: lng};

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

</script>

<template>
    <div id="googleMap"></div>
    <component :is="'script'" type="application/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAk7Dq17v0SWL983LCrYA_nXdA5fjitXxw&callback=initMap"></component>
</template>

<style>
    #googleMap {
        width:100%;
        height:200px;
    }
</style>