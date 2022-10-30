<template>

    <div class="container-fluid">
        <navbar></navbar>
        <div class="row pt-5">
            <div class="col-1 sides"></div>

            <div class="col-1"></div>

            <div class="col-8 pt-5 text-center">
                <h3 class="text-center mt-4 mb-2 pb-3">Add Your Pet Service Listing</h3>

                <div class="row w-75 mx-auto">

                    <div class="col-md-6 mt-3">
                        <label for="yearsofexp">Display Name:</label>
                        <input type="text" class="form-control" id="displayName" v-model="displayName">
                    </div>

                    <div class="col-md-6 mt-3">
                        <label for="rate">Your Contact Number:</label>
                        <input type="text" class="form-control" min="0" max="1000" v-model="contactNumber">
                    </div>

                    <div class="col-md-12 my-3">
                        <label for="rate">Your Email:</label>
                        <input type="text" class="form-control" v-model="email">
                    </div>

                </div>

                <h4 class="my-3">Your Provided Services:</h4>

                <div class="row">
                    <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                        <input class="form-check-input" type="checkbox" value="Pet Sitter" id="petSitter"
                            v-model="services">
                        <label class="form-check-label ps-4" for="petSitter">
                            <img src="../img/png/sitter.png" style="width:60px; height:60px;"
                                class="rounded rounded-circle mb-2">
                            <p>Pet Sitter</p>
                        </label>
                    </div>

                    <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                        <input class="form-check-input" type="checkbox" value="Pet Walker" id="petWalker"
                            v-model="services">
                        <label class="form-check-label ps-4" for="petWalker">
                            <img src="../img/png/walker.png" style="width:60px; height:60px;"
                                class="rounded rounded-circle mb-2">
                            <p>Pet Walker</p>
                        </label>
                    </div>

                    <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                        <input class="form-check-input" type="checkbox" value="Pet Groomer" id="petGroomer"
                            v-model="services">
                        <label class="form-check-label ps-4" for="petGroomer">
                            <img src="../img/png/groomer.png" style="width:60px; height:60px;"
                                class="rounded rounded-circle mb-2">
                            <p>Pet Groomer</p>
                        </label>
                    </div>

                    <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                        <input class="form-check-input" type="checkbox" value="Pet Hotel" id="petHotel"
                            v-model="services">
                        <label class="form-check-label ps-4 pt-3" for="petHotel">
                            <img src="../img/png/hotel.png" style="width:60px; height:60px;"
                                class="rounded rounded-circle mb-2">
                            <p>Pet Hotel</p>
                        </label>
                    </div>

                    <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                        <input class="form-check-input" type="checkbox" value="Pet Trainer" id="petTrainer"
                            v-model="services">
                        <label class="form-check-label ps-4 pt-3" for="petTrainer">
                            <img src="../img/png/trainer.png" style="width:60px; height:60px;"
                                class="rounded rounded-circle mb-2">
                            <p>Pet Trainer</p>
                        </label>
                    </div>

                    <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                        <input class="form-check-input" type="checkbox" value="Pet Mover" id="petMover"
                            v-model="services">
                        <label class="form-check-label ps-4 pt-3" for="petMover">
                            <img src="../img/png/catincar.png" style="width:60px; height:60px;"
                                class="rounded rounded-circle mb-2">
                            <p>Pet Mover</p>
                        </label>
                    </div>

                </div>

                <h4 class="mt-3">Services Description:</h4>
                <textarea class="form-control mt-2 w-75 mx-auto" id="description" rows="4" cols="50"
                    placeholder="Provide us with an overview of the services you offer." v-model="description"></textarea>

                <h4 class="mt-3">More Details:</h4>

                <div class="row w-75 mx-auto d-flex align-items-end">

                    <div class="col-md-6 mt-3">
                        <label for="yearsofexp">Years of Experience:</label>
                        <input type="number" class="form-control" id="yearsofexp" min="0" max="50">
                    </div>

                    <div class="col-md-6 mt-3">
                        <label for="rate">Your Hourly Rate (SGD):</label>
                        <input type="number" class="form-control" min="0" max="1000" v-model="rate">
                    </div>

                </div>

                <div class="container py-5" style="text-align: center;"><button @click="toggleModal"
                        class="btn btn-go my-2">Submit</button></div>
            </div>
            
            <div class="col-1"></div>

            <div class="col-1 sides"></div>
        
        </div>

        
    </div>


    <Modal @close="toggleModal" :modalActive="modalActive">
        <h3 class="text-center">Received</h3>
        <p class="text-center pt-2">Your listing will be published soon!</p>
    </Modal>

    <petpalsFooter></petpalsFooter>
</template>
    
<script>
import Modal from '../components/Modal.vue'
import navbar from '../components/navbar.vue'
import { ref } from "vue";
import petpalsFooter from "../components/petpalsFooter.vue"

export default {
    name: "profilelisting",
    components: {
        Modal, navbar, petpalsFooter, petpalsFooter
    },
    data() {
        return {
            showModal: false,
            services: [],
            description: '',
            typeofpet: [],
            sizeofpet: '',
            location: '',
            rate: 0,
            displayName: '',
            contactNumber: '',
            email: ''
        }
    },
    setup() {
        const modalActive = ref(false);
        const toggleModal = () => {
            modalActive.value = !modalActive.value;
        };
        return { modalActive, toggleModal };
    },
};
</script>
    
<style scoped>
.inner {
    margin: auto;
    width: 60%;
}

.top-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
}

h6 {
    font-size: 25px;
    font-weight: 500;
}

label {
    margin-bottom: 10px;
}


.input-row {
    display: flex;
    justify-content: space-between;
}

.input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}
</style>