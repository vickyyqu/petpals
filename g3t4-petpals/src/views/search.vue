<style>
.required {
    font-style: italic;
    color: #dfd1cd;
}

input[type=text] {
    height: 38px;
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
</style>

<template>

    <div class="container-fluid">
        <navbar></navbar>

        <div class="row">
            <div class="col-1 sides">
            </div>

            <div class="col-10 search-providers px-5">
                <img src="../img/header.jpeg" class="w-100 mt-5 pt-3 rounded-3" alt="">

                <h3 class="search-provider mt-4"><i class="bi bi-search-heart"></i> Search Providers</h3>

                <div class="required-services mt-3">
                    <span class="required me-2">Required Services:</span>

                    <br>

                    <div v-for="service of services" class="form-check-inline py-1" >
                        <input class="form-check-input" type="checkbox" v-bind:value="service" v-model="checkedServices">
                        <label class="form-check-label ps-2">
                            {{ service }}
                        </label>
                    </div>
                </div>

                <div class="row my-3">
                    <div class="col-lg-9">
                        <span class="required me-2">Your Location:</span>
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" class="form-control" aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm">
                        </div>
                    </div>
    
                    <div class="col-lg-3">
                        <span class="required me-2 ">Search Radius:</span>
                        <select class="form-select mb-3" aria-label="Default select example">
                            <option id="1" class="select-option">1km</option>
                            <option id="3" class="select-option">3km</option>
                            <option id="5" class="select-option">5km</option>
                            <option id="10" class="select-option">10km</option>
                            <option id="15" class="select-option">15km</option>
                        </select>
                    </div>
    
                    <div class="my-2">
                        <myMap></myMap>
                    </div>
    
                    <button class="btn btn-go mt-3" v-on:click="filterServices()">Go</button>
    
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
                        </select>
                    </div>
                    <div class="col-lg-2 col-4 mt-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="highToLow">
                            <label class="form-check-label" for="highToLow">
                              From High to Low
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="lowToHigh">
                            <label class="form-check-label" for="flexRadioCheckedDisabled">
                                From Low to High
                            </label>
                        </div>
                    </div>
                </div>
    
                <!-- <div class="row pb-5">
                    <profileCard v-for="n in 10"></profileCard>
                </div> -->
                <div id = 'profileCards' class="row pb-5">
                    <profileCard v-for="result in filterResults" v-bind:desc = 'result.desc' v-bind:img = 'result.img' v-bind:yrsOfExp = 'result.yrsOfExp' v-bind:name = 'result.name' v-bind:rates = 'result.rates' v-bind:ratings = 'result.ratings' v-bind:location = 'result.location' v-bind:service = 'result.service'></profileCard>
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, update, get, push, query, orderByChild} from "firebase/database";

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

// gets the currently logged in user
const auth = getAuth(); 
var currUser = ''

onAuthStateChanged(auth, (user) => {
if (user) {
    currUser = user.uid 
} else {
    console.log('user is signed out')
}
});

export default {
    data() {
        return {
            services: ['All', 'Pet Walker', 'Pet Groomer', 'Pet Hotel', 'Pet Sitter', 'Pet Trainer', 'Pet Mover'],
            checkedServices : [],
            filterResults : [],
            sortBy : '',
            orderBy : 'asc'
        }
    },
    components: {
        navbar,
        myMap,
        profileCard,
        petpalsFooter
    },

    // mounted() {
    //     onValue(ref(db,'services'), (snapshot) => {
    //         console.log('db initialized') 
    //     })
    // }, 

    methods : {
        filterServices(){
            this.filterResults = [] //clear previous filter results

            if (this.checkedServices.includes('All')){
                this.checkedServices = this.services.slice(1,this.services.length)
            }

            // console.log(this.checkedServices)

            for (let key in this.checkedServices){
                var service = this.checkedServices[key]

                onValue(ref(db, `services/${service}`), (snapshot) => {
                    for (let uid in snapshot.val()){
                        if (uid != currUser){
                            var item = {}
                            var price = snapshot.val()[uid]
                            
                            onValue(ref(db,`users/${uid}`), (snapst) => {
                                item.rates = price
                                item.desc = snapst.val().description
                                item.yrsOfExp = snapst.val().yrsOfExp
                                item.name = snapst.val().username
                                item.img = snapst.val().profilepic 
                                item.ratings = snapst.val().ratings
                                item.location = snapst.val().address
                                item.service = service
                                item.service = service
                                
                            });

                            this.filterResults.push(item) // sorted by service by default
                        }

                    }
                });

                if (this.orderBy == 'desc'){
                    if (this.sortBy == 'rates'){
                        this.filterResults.sort(function(a,b){return b.rates-a.rates}) 
                    }else if (this.sortBy == 'ratings'){
                        this.filterResults.sort(function(a,b){return b.ratings-a.ratings}) 
                    }else if (this.sortBy == 'yrsOfExp'){
                        this.filterResults.sort(function(a,b){return b.yrsOfExp-a.yrsOfExp}) 
                    }  
                }else{
                    if (this.sortBy == 'rates'){
                        this.filterResults.sort(function(a,b){return a.rates-b.rates}) 
                    }else if (this.sortBy == 'ratings'){
                        this.filterResults.sort(function(a,b){return a.ratings-b.ratings}) 
                    }else if (this.sortBy == 'yrsOfExp'){
                        this.filterResults.sort(function(a,b){return a.yrsOfExp-b.yrsOfExp}) 
                    }  
                }
                                
            }
        }
    }
}

</script>