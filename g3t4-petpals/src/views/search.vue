<style>
.required {
    font-style: italic;
    color: #dfd1cd;
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

                    <h3 class="my-4">Search Providers</h3>

                    <div class="input-group">
                        <input type="text" class="form-control" aria-label="Sizing example input"
                            aria-describedby="inputGroup">
                        <span class="input-group-text py-0" id="inputGroup" style="background-color:white"><button
                                class="btn btn-dark my-2">Search</button></span>
                    </div>

                    <div class="row mt-2">
                        <div class="col-sm-8">
                            <div class="required-services my-2">
                                <span class="required me-2">Required Services:</span>
                                <br>
                                <div class="form-check-inline">
                                    <input class="form-check-input" type="checkbox" value="" id="petSitter">
                                    <label class="form-check-label ps-2" for="flexCheckDefault">
                                        Pet Sitter
                                    </label>
                                </div>

                                <div class="form-check-inline">
                                    <input class="form-check-input" type="checkbox" value="" id="petWalker">
                                    <label class="form-check-label ps-2" for="flexCheckDefault">
                                        Pet Walker
                                    </label>
                                </div>

                                <div class="form-check-inline">
                                    <input class="form-check-input" type="checkbox" value="" id="petGroomer">
                                    <label class="form-check-label ps-2" for="flexCheckDefault">
                                        Pet Groomer
                                    </label>
                                </div>

                                <div class="form-check-inline">
                                    <input class="form-check-input" type="checkbox" value="" id="petHotel">
                                    <label class="form-check-label ps-2" for="flexCheckDefault">
                                        Pet Hotel
                                    </label>
                                </div>

                                <div class="form-check-inline">
                                    <input class="form-check-input" type="checkbox" value="" id="petTrainer">
                                    <label class="form-check-label ps-2" for="flexCheckDefault">
                                        Pet Trainer
                                    </label>
                                </div>

                                <div class="form-check-inline">
                                    <input class="form-check-input" type="checkbox" value="" id="petMover">
                                    <label class="form-check-label ps-2" for="flexCheckDefault">
                                        Pet Mover
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <span class="required me-2 d-block mt-2">Filter by:</span>
                            <select class="form-select" aria-label="Default select example">
                                <option id="reviews">Reviews</option>
                                <option id="yearsOfExperience">Years of experience</option>
                                <option id="rates">Rates</option>
                            </select>
                        </div>


                    </div>

                    <div class="row mt-2">
                        <span class="required me-2">Your Location:</span>
                        <div class="input-group input-group-sm mb-3">
                            <input type="text" class="form-control" aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm">
                        </div>

                        <map></map>

                        <button class="btn btn-go">Go</button>

                    </div>

                    <div class="row">
                        <h3 class="my-4">Best Matches Near You:</h3>
                        <div class="col-xl-3 col-md-6 p-2">
                            <div class="card">
                                <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up
                                        the bulk of the card's content.</p>
                                    <a href="#" class="btn">Go somewhere</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 p-2">
                            <div class="card">
                                <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up
                                        the bulk of the card's content.</p>
                                    <a href="#" class="btn">Go somewhere</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 p-2">
                            <div class="card">
                                <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up
                                        the bulk of the card's content.</p>
                                    <a href="#" class="btn">Go somewhere</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 p-2">
                            <div class="card">
                                <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up
                                        the bulk of the card's content.</p>
                                    <a href="#" class="btn">Go somewhere</a>
                                </div>
                            </div>
                        </div>

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
    import map from '@/components/map.vue'

    export default {
        data() {
            return {
                
            }
        },
        components: {
            navbar, 
            map
        }
    }

</script>