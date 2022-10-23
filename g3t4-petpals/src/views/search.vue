<style>
.required {
    font-style: italic;
    color: #dfd1cd;
}
input[type=text]{
    height: 38px;
}
.search-provider {
    font-size: 3em;
}

.form-select {
    color: #4b3830;
    font-family: 'Figtree', Helvetica, Arial, sans-serif;
}
.provider-location, .provider-rate {
    color:#F8AA9D
}
</style>

<template>
    
    <div class="container-fluid">
        <navbar></navbar>

        <div class="row">
            <div class="col-1 sides">
                <div class="mt-5 pt-3">

                </div>
            </div>

            <div class="col-10 search-providers">
                <img src="../img/header.jpeg" class="w-100 mt-5 pt-3 rounded-3" alt="">

                <div class="px-5">
                    
                    <h3 class="search-provider mt-4"><i class="bi bi-search-heart"></i> Search Providers</h3>

                    <div class="row mt-2">
                        <div class="col-md-9">
                            <div class="required-services mt-3">
                                <span class="required me-2">Required Services:</span>
                                
                                <br>

                                <div v-for="service of services" class="form-check-inline py-1">
                                    <input class="form-check-input" type="checkbox">
                                    <label class="form-check-label ps-2">
                                        {{service}}
                                    </label>
                                </div>

                            </div>
                        </div>

                        <div class="col-md-3">
                            <span class="required me-2 d-block mt-3">Filter by:</span>
                            <select class="form-select" aria-label="Default select example">
                                <option id="reviews">Reviews</option>
                                <option id="yearsOfExperience" class="select-option">Years of experience</option>
                                <option id="rates" class="select-option">Rates</option>
                            </select>
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
                        

                        <button class="btn btn-go">Go</button>

                    </div>

                    <div class="row">
                        <h3 class="my-4">Best Matches Near You:</h3>

                        <profileCard v-for="n in 10"></profileCard>

                    </div>

                </div>


            </div>

            <div class="col-1 sides">
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from '@/components/navbar.vue'
    import myMap from '@/components/myMap.vue'
    import profileCard from '@/components/profileCard.vue'

    export default {
        data() {
            return {
                services: ['Pet Walker','Pet Groomer','Pet Hotel','Pet Sitter','Pet Trainer','Pet Mover']
            }
        },
        components: {
            navbar, 
            myMap,
            profileCard
        }
    }
   
</script>