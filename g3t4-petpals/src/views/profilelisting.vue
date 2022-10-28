<template>
    <navbar></navbar>
    <div class="content" style="padding-bottom: 50px;">
        <div class="inner">
        <div class="top-div">
            <h6>Add Your Pet Service</h6>
        </div>

        <div class="row">
            <div class="input-container">
            <div class="row">
            <div>Services provided:</div> 
            </div>
            <div class="input-row">
                <div class="form-check-inline">
                    <input class="form-check-input" type="checkbox" value="Pet Sitter" id="petSitter" v-model="services">
                    <label class="form-check-label ps-2" for="petSitter">
                    <img src="../img/sitter.png" style="width:70px; height:60px;">
                        Pet Sitter
                    </label>
                </div>

                <div class="form-check-inline">
                    <input class="form-check-input" type="checkbox" value="Pet Walker" id="petWalker" v-model="services">
                    <label class="form-check-label ps-2" for="petWalker">
                    <img src="../img/dogwalker.jpeg" style="width:70px; height:60px;">
                        Pet Walker
                    </label>
                </div>

                <div class="form-check-inline">
                    <input class="form-check-input" type="checkbox" value="Pet Groomer" id="petGroomer" v-model="services">
                    <label class="form-check-label ps-2" for="petGroomer">
                    <img src="../img/groomer.jpeg" style="width:70px; height:60px;">
                        Pet Groomer
                    </label>
                </div>
            </div>

            <div class="input-row">
                <div class="form-check-inline">
                    <input class="form-check-input" type="checkbox" value="Pet Hotel" id="petHotel" v-model="services">
                    <label class="form-check-label ps-2" for="petHotel">
                    <img src="../img/hotel.jpeg" style="width:70px; height:60px;">
                        Pet Hotel
                    </label>
                </div>

                <div class="form-check-inline">
                    <input class="form-check-input" type="checkbox" value="Pet Trainer" id="petTrainer" v-model="services">
                    <label class="form-check-label ps-2" for="petTrainer">
                    <img src="../img/trainer.jpeg" style="width:70px; height:60px;">
                        Pet Trainer 
                    </label>
                </div>

                <div class="form-check-inline">
                    <input class="form-check-input" type="checkbox" value="Pet Mover" id="petMover" v-model="services">
                    <label class="form-check-label ps-2" for="petMover">
                    <img src="../img/transport.webp" style="width:70px; height:60px;">
                        Pet Mover &nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                </div>
            </div>
            </div>
        </div>

        <br>

            <div class="row">
            <div class="input-container">
                <label>Service Description</label>
                <textarea id="description" rows="3" cols="50"  placeholder="Give an overview of what services you offer." v-model="description"></textarea>
            </div>
            </div>

            <!-- <div class="input-row">
            <div class="input-container">
                <label for="number">Number of pets you are willing to take in</label>
                <input type="number" min="1" max="7" v-model="number">
            </div>
            </div> -->

        <div class="input-container">
            <label>Types of pets you accept</label>
            <div>
            <input class="form-check-input" type="checkbox" value="Dogs" id="dog" v-model="typeofpet">
            <label class="form-check-label ps-2" for="dog">
            <img src="../img/animallogo/doglogo.png" style="width:70px; height:60px;">
                Dogs
            </label>
            </div>

            <div>
            <input class="form-check-input" type="checkbox" value="Cats" id="cat" v-model="typeofpet">
            <label class="form-check-label ps-2" for="cat">
            <img src="../img/animallogo/catlogo.png" style="width:70px; height:60px;">
                Cats
            </label>
            </div>

            <div>
            <input class="form-check-input" type="checkbox" value="Rabbits" id="rabbit" v-model="typeofpet">
            <label class="form-check-label ps-2" for="rabbit">
            <img src="../img/animallogo/rabbitlogo.png" style="width:70px; height:60px;">
                Rabbits
            </label>
            </div>

            <div>
            <input class="form-check-input" type="checkbox" value="Guinea Pig" id="guineapig" v-model="typeofpet">
            <label class="form-check-label ps-2" for="guineapig">
            <img src="../img/animallogo/guineapiglogo.png" style="width:70px; height:60px;">
                Guinea Pig
            </label>
            </div>

            <div>
            <input class="form-check-input" type="checkbox" value="Birds" id="bird" v-model="typeofpet">
            <label class="form-check-label ps-2" for="bird">
            <img src="../img/animallogo/birdlogo.png" style="width:70px; height:60px;">
                Birds
            </label>
            </div>
            
            <div>
            <input class="form-check-input" type="checkbox" id="other" value="other" v-model="typeofpet">
            <label for="other">&nbsp;Others &nbsp;</label>
            <input type="text" id="otherValue" placeholder="please specify" />
            </div>

        </div>
        
        <div class="input-row">
            
            <div class="input-container">
            <label for="petTypes">Size of pets you accept</label>
                <select name="number" id="size" v-model="sizeofpet" style="height:30px;">
                <option value="1kg">1-5kg</option>
                <option value="5kg">5-10kg</option>
                <option value="10kg">10-20kg</option>
                <option value="20kg">20-40kg</option>
                <option value="40kg">40+kg</option>
                </select>
            </div>

            <div class="input-container">
                <label  for="yearsofexp">Years of Experience</label>
                <input type="number" id="yearsofexp" min="0" max="50" >
            </div>

            <div class="input-container">
            <label for="rate">What is your rate SGD (per hour)</label>
                <input type="number" min="0" max="1000" v-model="rate">
            </div>       
        </div>

        <div class="container" style="text-align: center;"><button @click="toggleModal" class="btn btn-go">Submit</button></div>   
        </div>
    </div>

    <Modal @close="toggleModal" :modalActive="modalActive">
        <h2 style="text-align:center">Submitted!</h2>            
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
                sizeofpet:'',
                rate: 0,
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
    .content {
      padding: 120px;
      background:  #fffbfa;
    }
    
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