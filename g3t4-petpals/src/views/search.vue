<style>
input[type=text] {
    height: 38px;
}

input[type='checkbox']:checked{
    background-color: #856658;
    border: #856658;
}

input[type='radio']:checked{
    background-color: #856658;
    border: #856658;
}

.search-provider {
    font-size: 3em;
}

.form-select {
    color: #4b3830;
    font-family: 'Figtree', Helvetica, Arial, sans-serif;
}

.provider-location,
.provider-rate {
    color: #F8AA9D
}

.bi-search-heart {
    color: #4b3830;
}

.required {
    font-style: italic;
    color: #856658;
}
</style>

<template>

<div class="container-fluid">
    <navbar></navbar>

    <div class="row">
        <div class="col-1 sides">
        </div>

        <div class="col-10">

                <div id="carouselExampleFade" class="carousel slide carousel-fade mt-5 pt-4" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-interval="2000">
                    <img class="d-block w-100 rounded-3" src="../img/header.jpeg" alt="First slide">
                    </div>
                    <div class="carousel-item" data-interval="2000">
                    <img class="d-block w-100 rounded-3" src="../img/header2.jpeg"  alt="Second slide">
                    </div>
                    <div class="carousel-item" data-interval="2000">
                    <img class="d-block w-100 rounded-3" src="../img/header3.png"  alt="Third slide">
                    </div>
                </div>
                </div>
            
            <div class="search-providers px-5">

                <h3 class="search-provider my-4 pt-2"><i class="bi bi-search-heart"></i> Search Providers</h3>

                <div class="required-services">
                    <span class="required">Required Services:</span>

                    <br>

                    <div v-for="service of services" class="form-check-inline py-1" >
                        <input class="form-check-input" type="checkbox" v-bind:value="service" v-model="checkedServices">
                        <label class="form-check-label ps-2">
                            {{ service }}
                        </label>
                    </div>
                </div>

                <div class="row my-3">
                    
                    <myMap v-on:searchClick="filterServices"></myMap>

                </div>
    
                <div class="row">
                    <div class="col-lg-8">
                        <h3 class="my-4">Best Matches Near You:</h3>
                    </div>
                    <div class="col-lg-2 col-8">
                        <span class="required">Sort by:</span>
                        <select class="form-select" aria-label="Default select example" v-model="sortBy">
                            <option id="reviews" value = 'ratings'>Ratings</option>
                            <option id="yearsOfExperience" class="select-option" value = 'yrsOfExp'>Years of experience</option>
                            <option id="rates" class="select-option" value = 'rates'>Rates</option>
                            <option id="dist" class="select-option" value = 'dist'>Distance</option>
                        </select>
                    </div>
                    <div class="col-lg-2 col-4 mt-3">
                        <div class="form-check">
                            <input class="form-check-input" v-model='orderBy' v-bind:value = '"desc"' type="radio" name="sortprofiles" id="highToLow">
                            <label class="form-check-label" for="highToLow">
                            From High to Low
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" v-model='orderBy' v-bind:value = '"asc"'  type="radio" name="sortprofiles" id="lowToHigh">
                            <label class="form-check-label" for="lowToHigh">
                                From Low to High
                            </label>
                        </div>
                    </div>
                </div>
    
                <div id = 'profileCards' class="row pb-5">
                    <profileCard v-for="result in filterResults" v-bind:dist = 'result.dist' v-bind:oid = 'result.oid' v-bind:desc = 'result.desc' v-bind:img = 'result.img' v-bind:yrsOfExp = 'result.yrsOfExp' v-bind:name = 'result.name' v-bind:rates = 'result.rates' v-bind:ratings = 'result.ratings' v-bind:location = 'result.location' v-bind:service = 'result.service'></profileCard>

                    <div v-if="noMatch">
                        <p class="text-center m-5 p-4" style="background-color:#f8f1ef;border-radius:50px;">No search results yet...</p>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-1 sides">
        </div>

    </div>

</div>

<petpalsFooter></petpalsFooter>

</template>

<script>
import navbar from '@/components/navbar.vue'
import myMap from '@/components/myMap.vue'
import profileCard from '@/components/profileCard.vue'
import petpalsFooter from '@/components/petpalsFooter.vue'

import { VueperSlides, VueperSlide } from "vueperslides";
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

export default {
    data() {
        return {
            services: ['All', 'Pet Walker', 'Pet Groomer', 'Pet Hotel', 'Pet Sitter', 'Pet Trainer', 'Pet Mover'],
            checkedServices : [],
            filterResults : [],
            sortBy : '',
            orderBy : '',
            inputAddr: '',
            noMatch: true,
        }
    },
    
    components: {
        navbar,
        myMap,
        profileCard,
        petpalsFooter,
        VueperSlides,
        VueperSlide,
    },

    methods : {
        filterServices(out){
            this.filterResults = [] //clear previous filter results

            if (this.checkedServices.includes('All')){
                this.checkedServices = this.services.slice(1,this.services.length)
            }

            for (let key in this.checkedServices){
                var service = this.checkedServices[key]
                this.noMatch = false //have matching listings

                onValue(ref(db, `services/${service}`), (snapshot) => {
                    for (let uid in snapshot.val()){
                        onValue(ref(db,`users/${uid}`), (snapst) => {
                            var item = {}
                            item.rates = snapshot.val()[uid].price
                            item.desc = snapshot.val()[uid].desc
                            item.yrsOfExp = snapst.val().yrsOfExp
                            item.name = snapst.val().username
                            item.img = snapst.val().profilepic 
                            item.ratings = snapst.val().ratings
                            item.location = snapst.val().region
                            item.service = service
                            item.service = service
                            item.oid = uid

                            var coords = [snapst.val().coords.lat, snapst.val().coords.lng ]
                            var check = this.getSearchRad(out, coords)

                            if (check != false && snapshot.val()[uid].price != ''){
                                item.dist = check.toFixed(1)
                                this.filterResults.push(item) // sorted by service by default                              
                            }

                        });

                    }
                });


                if (this.orderBy == 'desc'){
                    if (this.sortBy == 'rates'){
                        this.filterResults.sort(function(a,b){return b.rates-a.rates}) 
                    }else if (this.sortBy == 'ratings'){
                        this.filterResults.sort(function(a,b){return b.ratings-a.ratings}) 
                    }else if (this.sortBy == 'yrsOfExp'){
                        this.filterResults.sort(function(a,b){return b.yrsOfExp-a.yrsOfExp}) 
                    }else if (this.sortBy == 'dist'){
                        this.filterResults.sort(function(a,b){return b.dist-a.dist}) 
                    }  
                }else{
                    if (this.sortBy == 'rates'){
                        this.filterResults.sort(function(a,b){return a.rates-b.rates}) 
                    }else if (this.sortBy == 'ratings'){
                        this.filterResults.sort(function(a,b){return a.ratings-b.ratings}) 
                    }else if (this.sortBy == 'yrsOfExp'){
                        this.filterResults.sort(function(a,b){return a.yrsOfExp-b.yrsOfExp}) 
                    }else if (this.sortBy == 'dist'){
                        this.filterResults.sort(function(a,b){return a.dist - b.dist}) 
                    }   
                }
                                
            }
        },

        getSearchRad(out, coord2){
            var coord1 = out.coord
            var radius = out.rad
            const km = 111.3

            var dist = Math.sqrt((km*coord1[0] - km*coord2[0])**2 + (km*coord1[1] - km*coord2[1])**2)
            
            if (dist <= radius){
                return dist
            } else {
                return false
            }
        }
    },

}

</script>