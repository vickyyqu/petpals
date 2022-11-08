<style>
.alert {
    font-family: 'Figtree';
    font-style: italic;
}
.input-group-text {
    background-color: #f8f1ef;
    font-family: 'Figtree';
    color:#58484e;

}

</style>


<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-1 sides"></div>

            <div class="col-10">
                <div class="mt-4 text-center">
                    <img src="../img/logo2.png" class="w-25 mx-auto d-block">
                    <h3 class="mt-4 mb-3">Register as a PetPals Pet Service Provider with us today!</h3>
                    <p>Enter your personal particulars below.</p>
                </div>

                <div class="row">
                    <div class="col-1"></div>

                    <div class="col-10 px-5">

                        <div class="row my-4">
                            <!-- email and username-->
                            <div class="col-md-6">
                                <label for="inputEmail">Email</label>
                                <input type="email" v-model='email' class="form-control w-100" placeholder="" required>
                            </div>
                            <div class="col-md-6">
                                <label for="inputUsername">Username</label>
                                <input type="text" v-model='username' class="form-control w-100" id="inputUsername"
                                    placeholder="" required>

                            </div>
                        </div>

                        <label for="inputPassword">Password</label>
                        <input type="password" class="form-control mb-4" id="inputPassword"
                            style="background-color:white" placeholder="" v-model="psw" required>


                        <label for="inputRepeatPassword">Repeat Password</label>
                        <input type="password" class="form-control w-100" id="inputRepeatPassword"
                            style="background-color:white" placeholder="" v-model="psw_repeat" required>
                        <div v-if="psw == psw_repeat && psw != ''" class="alert alert-success p-2 my-3">Passwords match!</div>
                        <div v-if="psw != psw_repeat && psw_repeat != ''" class="alert alert-danger p-2 my-3">Passwords do not match!
                        </div>


                        <div class="row my-4">
                            <!-- username and photo-->
                            <div class="col-md-6">

                                <label for="inputNumber">Phone Number</label>
                                <input type="text" v-model='mobile' class="form-control w-100" id="inputNumber"
                                    placeholder="" aria-describedby="inputGroupPrepend2" min="0" max="99999999"
                                    maxlength="8" minlength="8" required>
                            </div>

                            <div class="col-md-6">
                                <label for="profilePicture">Profile Picture</label>
                                <input type="file" @change='getPic' class="form-control w-100" id="profilePicture"
                                    required>
                            </div>
                        </div>

                        <label for="inputDesc">Tell us more about yourself!</label>
                        <textarea class="form-control" v-model='desc' id="inputDesc" maxlength=300 rows="5"></textarea>
                        <small class="text-end d-block mb-2">{{ count }}/300</small>

                        <label for="inputAddress">Address</label>
                        <input type="text" v-model='address' class="form-control mb-4" id="inputAddress" placeholder="" required>

                        <label for="inputPostal">Postal Code</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">SG</span>
                            </div>
                            <input type="text" v-model='postal' :onkeyup="startTimer" class="form-control" id="inputPostal" required>
                        </div>
                        <div v-if="invalidAddr" class="alert alert-danger p-2 my-3">Invalid address entered.</div>

                        <label class="mt-4" for="yearsofexp">Years of Experience</label>
                        <input class="form-control w-100" v-model='yrsOfExp' type="number" id="yearsofexp" min="0" max="50">

                        <button class="btn btn-go d-block mx-auto my-5" @click="registerUser">Sign up!</button>

                    </div>

                    <div class="col-1"></div>
                </div>

            <div class="col-1 sides"></div>
        </div>
        </div>
    </div>

    <footer>
        <petpalsFooter></petpalsFooter>
    </footer>

</template>

<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import petpalsFooter from '@/components/petpalsFooter.vue'

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
            services: ['Pet Walker', 'Pet Groomer', 'Pet Hotel', 'Pet Sitter', 'Pet Trainer', 'Pet Mover'],

            psw: '',
            psw_repeat: '',

            email : '',
            postal : '',
            address : '',
            username : '',
            mobile : '',
            pic : 'https://cdn-icons-png.flaticon.com/512/2102/2102647.png',
            desc : '',
            yrsOfExp : 0,

            lat : '',
            lng : '',
            region: '',
            invalidAddr: false,
            timerId: null,
        }
    },

    components: {
        petpalsFooter
    },

    computed: {
        count() {
            return this.desc.length
        }
    },
    methods: {
        getPic(event) {
            const files = event.target.files
            if (!files.length) return

            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = () => (this.pic = reader.result)

        },

        registerUser() {
            const auth = getAuth();
            if (this.psw == this.psw_repeat && this.psw != '' && this.email != '' && this.postal != '' && this.address != '' && this.username != '' && this.mobile != '') {
                this.checkAddr() 

                createUserWithEmailAndPassword(auth, this.email, this.psw)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log('user created!')
                        updateProfile(user, {
                            displayName: this.username, photoURL: this.pic
                        })

                        set(ref(db, `users/${user.uid}`), {
                            username: this.username,
                            profilepic: this.pic,
                            mobile: this.mobile,
                            type: 'Pet Service Provider',
                            desc: this.desc,
                            yrsOfExp: this.yrsOfExp,
                            address: this.address,
                            postalcode: this.postal,
                            ratings: 0, //by default
                            coords: {'lat': this.lat, 'lng': this.lng},
                            region: this.region,
                        })

                        signInWithEmailAndPassword(auth, this.email, this.psw)
                            .then((user) => {
                                window.location.href = `/bookingsProvider`;

                            })
                    })

            }

        },

        checkAddr(){
            axios.get("https://maps.googleapis.com/maps/api/geocode/json?", {
                params: {
                    address : this.postal,
                    key: "AIzaSyAk7Dq17v0SWL983LCrYA_nXdA5fjitXxw"
                    }
            })
            .then(response => {
                console.log(response.data.results)

                if (response.data.results.length > 0){

                    this.invalidAddr = false

                    // save in database
                    this.lat = response.data.results[0].geometry.location.lat
                    this.lng = response.data.results[0].geometry.location.lng

                    console.log(this.lat)
                    console.log(this.lng)

                    // save in database
                    console.log(response.data.results[0].address_components)
                    for (let i=0; i<response.data.results[0].address_components.length; i++){
                        let each = response.data.results[0].address_components[i]
                        if (each.types.includes('neighborhood')){
                            this.region = each.long_name
                        }
                    }
                    console.log(this.region)

                } else {
                    this.invalidAddr = true
                }
                
            })
            .catch( error => {

                console.log(error.message)
                this.invalidAddr = true

            })

        },
        
        startTimer(){
            clearTimeout(this.timerId)
            this.timerId = window.setTimeout(this.checkAddr, 1000)
        }
    },
}

</script>