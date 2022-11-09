<style>
#googleMap {
    width:100%;
    height:250px;
}
</style>

<template>
<div class="col-lg-9">
    <span class="required">Your Location/Postal Code:</span>
    <div class="input-group input-group-sm mb-3 mt-1">
        <input type="text" class="form-control" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm" v-model="inputAddr" :placeholder="msg">
    </div>
</div>

<div class="col-lg-3">
    <span class="required">Search Radius:</span>
    <select class="form-select mb-3 mt-1" aria-label="Default select example" v-model="searchRad">
        <option id="1" class="select-option" value=1>1 km</option>
        <option id="3" class="select-option" value=3>3 km</option>
        <option id="5" class="select-option" value=5>5 km</option>
        <option id="10" class="select-option" value=10>10 km</option>
        <option id="15" class="select-option" value=15>15 km</option>
        <option id="25" class="select-option" value=25>25 km</option>
        <option id="50" class="select-option" value=50>50 km</option>
    </select>
</div>

<div class="mt-3">
    <div id="googleMap" class="rounded-3"></div>
</div>

<button class="btn btn-go my-4" v-on:click="searchClick">Go</button>

<component :is="'script'" type="application/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAk7Dq17v0SWL983LCrYA_nXdA5fjitXxw&callback=initMap"></component>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAS74F4gerXVK8OW-RBq3rSGNEoHuqLQ0A",
    authDomain: "petpals-623e3.firebaseapp.com",
    projectId: "petpals-623e3",
    storageBucket: "petpals-623e3.appspot.com",
    messagingSenderId: "949038254831",
    appId: "1:949038254831:web:82d399649bb06e8389e91a",
    databaseURL: "https://petpals-623e3-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

export default {
    data(){
        return {
            lat : 1.2973784,
            lng : 103.8495219,
            inputAddr: "",
            invalidAddr: false,
            msg: "Enter your location",
            searchRad: 50,
            postal: ''
        }
    },
    emits: ['searchClick'],

    mounted() {

        this.getAddress()

        var currlat = this.lat
        var currlng = this.lng

        function initMap(){

            const uluru = { lat: currlat, lng: currlng};

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

                    // rad -> input search radius, coord -> [lat, lng]
                    var out = {rad: this.searchRad, coord: [currlat,currlng]}
                    this.$emit('searchClick', out)

                } else {
                    this.invalidAddr = true
                    this.inputAddr = ""
                    this.msg = "Address not found. Try again with your address in full."
                }
                
            })
            .catch( error => {

                console.log(error.message)
                this.invalidAddr = true
                this.inputAddr = this.postal
                this.msg = "Address not found. Try again with your address in full."

            })

        },

        getAddress(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}/postalcode`), (snapshot) => {
                        this.inputAddr = snapshot.val()
                        this.postal = snapshot.val()

                        this.searchClick()
                    });
                }
            });
        }
    }
}

</script>
