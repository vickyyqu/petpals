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

input[type='checkbox']:checked{
    background-color: #856658;
    border: #856658;
}
</style>

<template>
<div class="container-fluid">
    <navbarProvider></navbarProvider>

    <div class="row pt-5">
        <div class="col-1 sides"></div>

        <div class="col-1"></div>

        <div class="col-8 pt-5 text-center">
            <h3 class="text-center mt-4 pb-5">Add a Pet Service Listing</h3>

            <div class="row">
                <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                    <input class="form-check-input" type="radio" v-model="service" v-bind:value = '"Pet Sitter"' id="petSitter" :disabled="services['Pet Sitter']">
                    <label class="form-check-label ps-4" for="petSitter">
                        <img src="../img/png/sitter.png" style="width:60px; height:60px;"
                            class="rounded rounded-circle mb-2">
                        <p>Pet Sitter</p>
                    </label>
                </div>

                <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                    <input class="form-check-input" type="radio" v-model="service" v-bind:value="'Pet Walker'" id="petWalker" :disabled="services['Pet Walker']">
                    <label class="form-check-label ps-4" for="petWalker">
                        <img src="../img/png/walker.png" style="width:60px; height:60px;"
                            class="rounded rounded-circle mb-2">
                        <p>Pet Walker</p>
                    </label>
                </div>

                <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                    <input class="form-check-input" type="radio" v-model="service" v-bind:value="'Pet Groomer'" id="petGroomer" :disabled="services['Pet Groomer']">
                    <label class="form-check-label ps-4" for="petGroomer">
                        <img src="../img/png/groomer.png" style="width:60px; height:60px;"
                            class="rounded rounded-circle mb-2">
                        <p>Pet Groomer</p>
                    </label>
                </div>

                <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                    <input class="form-check-input" type="radio" v-model="service" v-bind:value="'Pet Hotel'" id="petHotel" :disabled="services['Pet Hotel']">
                    <label class="form-check-label ps-4 pt-3" for="petHotel">
                        <img src="../img/png/hotel.png" style="width:60px; height:60px;"
                            class="rounded rounded-circle mb-2">
                        <p>Pet Hotel</p>
                    </label>
                </div>

                <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                    <input class="form-check-input" type="radio" v-model="service" v-bind:value="'Pet Trainer'" id="petTrainer" :disabled="services['Pet Trainer']">
                    <label class="form-check-label ps-4 pt-3" for="petTrainer">
                        <img src="../img/png/trainer.png" style="width:60px; height:60px;"
                            class="rounded rounded-circle mb-2">
                        <p>Pet Trainer</p>
                    </label>
                </div>

                <div class="col-sm-4 form-check d-flex align-items-start justify-content-center">
                    <input class="form-check-input" type="radio" v-model="service" v-bind:value="'Pet Mover'" id="petMover" :disabled="services['Pet Mover']">
                    <label class="form-check-label ps-4 pt-3" for="petMover">
                        <img src="../img/png/catincar.png" style="width:60px; height:60px;"
                            class="rounded rounded-circle mb-2">
                        <p>Pet Mover</p>
                    </label>
                </div>

            </div>

            <div class="mx-5">
    
            <h4 class="mt-3">Service Description:</h4>
            <textarea class="form-control mt-2 mx-auto" id="description" rows="4" cols="50" maxlength=300
                placeholder="Provide us with an overview of the service you offer." v-model="description" required></textarea>
            <small class="d-block text-end">{{countDesc}}/300</small>

            </div>

            <label for="rate"><h4 class="mt-3">Your Hourly Rate (SGD):</h4></label>
            <div class="row mx-auto d-flex align-items-end">
                <div class="col-md-6 mt-2 mx-auto">
                    <input type="number" class="form-control w-75 mx-auto" min="0" max="1000" v-model="rate" required >
                </div>
            </div>

            <div class="container py-5" style="text-align: center;"><button v-on:click = 'addService'
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
import navbarProvider from '../components/navbarProvider.vue'
import { ref as modalref } from "vue";
import petpalsFooter from "../components/petpalsFooter.vue"
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue} from "firebase/database";

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
    name: "profilelisting",

    data() {
        return {
            showModal: false,
            service: '',
            description: '',
            rate: 0,
            services: {'Pet Walker': false,
                        'Pet Trainer': false,
                        'Pet Hotel': false,
                        'Pet Sitter': false,
                        'Pet Groomer': false,
                        'Pet Mover' : false}, //get all the services the user alr have
            error: '',

        }
    },

    components: {
        Modal, 
        navbarProvider, 
        petpalsFooter, 
        petpalsFooter
    },
    
    computed: {
        countDesc(){
            return this.description.length
        }
    },
    methods : {
        addService(){
            if (this.service == '' || this.description == '' || this.rate == 0){
                this.error = 'Please enter all the details of the service'

            }else{
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        set(ref(db, `users/${user.uid}/services/${this.service}`), {
                            price: this.rate,
                            desc: this.description
                        })
                        set(ref(db, `services/${this.service}/${user.uid}`), {
                            price: this.rate,
                            desc: this.description
                        })
                        
                        this.service = ''
                        this.description = ''
                        this.rate = 0
                        this.toggleModal()
                    }
                }); 
            }
        },

        getServices(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}/services`), (snapshot) => {
                        for (let serv in snapshot.val()){
                            if (snapshot.val()[serv].price != ''){
                                this.services[serv] = true
                            }
                        }
                    }); 
                }
            });
        },
    },

    mounted(){
        this.getServices()
    },

    setup() {
        const modalActive = modalref(false);
        const toggleModal = () => {
            modalActive.value = !modalActive.value;
        };
        return { modalActive, toggleModal };
    },
};
</script>
    