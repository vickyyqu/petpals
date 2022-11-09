<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-1 sides"></div>

        <div class="col-10">

            <div class="mt-4 text-center">
                <img src="../img/logo2.png" class="w-25 mx-auto d-block">
                <h3 class="mt-4 mb-3">Register as a PetPals Pet Owner with us today!</h3>
                <p>Enter your personal particulars below.</p>
            </div>
            <div class="row">
                <div class="col-1"></div>

                <div class="col-10 px-5">


                    <div v-if="mainError" class="alert alert-danger p-2 my-4">{{signupError}}</div>

                    <div class="row my-4">

                        <!-- email and username-->
                        <div class="col-md-6">
                            
                            <label for="inputEmail">Email</label>
                            <input type="email" v-model='email' class="form-control w-100" placeholder="" required>
                            <small v-if="emailEmpty" style="color: brown; font-style:italic">{{errors.email}}</small>
                        </div>
                        <div class="col-md-6">
                            <label for="inputUsername">Display Name</label>
                            <input type="text" v-model='username' class="form-control w-100" id="inputUsername" placeholder="" required>
                            <small v-if="userEmpty" style="color: brown; font-style:italic">{{errors.user}}</small>

                        </div>
                    </div>

                    <label for="inputPassword">Password</label>
                    <input type="password" class="form-control" id="inputPassword"
                        style="background-color:white" placeholder="" v-model="psw" required>
                        <small v-if="pwdEmpty" style="color: brown; font-style:italic;display:block;">{{errors.pwd}}</small>


                    <label for="inputRepeatPassword" class="mt-4">Repeat Password</label>
                    <input type="password" class="form-control w-100" id="inputRepeatPassword"
                        style="background-color:white" placeholder="" v-model="psw_repeat" required>
                        <small v-if="repeatEmpty" style="color: brown; font-style:italic">{{errors.repeat}}</small>
                    <div v-if="psw == psw_repeat && psw != ''" class="alert alert-success p-2 my-3">Passwords match!
                    </div>
                    <div v-if="psw != psw_repeat && psw_repeat != ''" class="alert alert-danger p-2 my-3">Passwords
                        do not match!
                    </div>


                    <div class="row my-4">
                        <!-- username and photo-->
                        <div class="col-md-6">

                            <label for="inputNumber">Phone Number</label>
                            <input type="text" v-model='mobile' class="form-control w-100" id="inputNumber"
                                placeholder="" aria-describedby="inputGroupPrepend2" min="0" max="99999999"
                                maxlength="8" minlength="8" required>
                                <small v-if="numEmpty" style="color: brown; font-style:italic">{{errors.num}}</small>
                        </div>

                        <div class="col-md-6">
                            <label for="profilePicture">Profile Picture</label>
                            <input type="file" @change='getPic' class="form-control w-100" id="profilePicture">
                        </div>
                    </div>

                    <label for="inputDesc">Tell us more about yourself!</label>
                    <textarea class="form-control" v-model='desc' id="inputDesc" maxlength=300 rows="5"></textarea>
                    <small class="text-end d-block mb-2">{{ count }}/300</small>

                    <label for="inputAddress">Address</label>
                    <input type="text" v-model='address' class="form-control" id="inputAddress" placeholder=""
                        required>
                        <small v-if="addEmpty" style="color: brown; font-style:italic;display:block;">{{errors.add}}</small>

                    <label for="inputPostal" class="mt-4">Postal Code</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">SG</span>
                        </div>
                        <input type="text" v-model='postal' :onkeyup="startTimer" class="form-control" id="inputPostal" required>
                    </div>
                    <small v-if="postalEmpty" style="color: brown; font-style:italic">{{errors.postal}}</small>
                    <div v-if="invalidAddr" class="alert alert-danger p-2 my-3">Invalid address entered.</div>

                    <button class="btn btn-go d-block mx-auto my-5" @click="registerUser">Sign up!</button>

                </div>

                <div class="col-1"></div>
            </div>

        </div>

        <div class="col-1 sides"></div>
    </div>
</div>

<Modal @close="toggleModal" :modalActive="modalActive" :type="'register'">
    <h3 class="text-center">User Registered!</h3>
    <p class="text-center pt-2">An email has been sent to your email address for verification!</p>
</Modal>

<footer>
    <petpalsFooter></petpalsFooter>
</footer>
</template>

<script>
import petpalsFooter from '@/components/petpalsFooter.vue'
import Modal from '../components/Modal.vue'
import { ref as modalref } from "vue";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


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
            psw: '',
            psw_repeat: '',

            email: '',
            postal: '',
            address: '',
            username: '',
            mobile: '',
            desc: '',
            pic: 'https://cdn-icons-png.flaticon.com/512/2102/2102647.png',

            invalidAddr: false,
            timerId: null,
            lat: '', 
            lng:'', 
            region: '',
            showModal: false,

            emailEmpty: false,
            pwdEmpty: false,
            repeatEmpty: false,
            userEmpty: false,
            numEmpty: false,
            descEmpty: false,
            addEmpty: false,
            postalEmpty: false,

            errors: {email: "", pwd: "", repeat: "", user: "", num: "", pic: "", desc: "", add: "", postal: ""},
            signupError: "",
            mainError: false

        }
    },


    components: {
        petpalsFooter,
        Modal
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

            console.log(this.pic)
        },

        registerUser() {
            const auth = getAuth();
            this.mainError = false


            if (this.psw == this.psw_repeat && this.psw.length >= 6 && this.email != '' && this.postal != '' && this.address != '' && this.username != '' && this.mobile != '' && !this.invalidAddr) {
    
                this.pwdEmpty = false
                this.repeatEmpty = false
                this.emailEmpty = false
                this.numEmpty = false
                this.pwdEmpty = false
                this.postalEmpty = false
                this.userEmpty = false

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
                            type: 'Pet Owner',
                            bio: this.desc,
                            address: this.address,
                            postalcode: this.postal,
                            ratings: 0, //by default
                            coords: {'lat': this.lat, 'lng': this.lng},
                            region: this.region
                        })

                        sendEmailVerification(user)
                        .then(() => {
                            this.toggleModal()
                        });

                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        console.log(errorCode)

                        if (errorCode == "auth/email-already-in-use"){
                            this.signupError = "Registration failed. Email entered is already in use."

                            this.mainError = true

                        } else if (errorCode == "auth/invalid-email") {
                            this.signupError = "Registration failed. You have entered an invalid email address."

                            this.mainError = true
                        }

                    });

            }

            if (this.psw == ''){
                this.pwdEmpty = true
                this.errors.pwd = "Password field empty."
            } else if (this.psw.length < 6){
                this.pwdEmpty = true
                this.errors.pwd = "Password must be at least 6 characters long."
            }

            if (this.psw_repeat == ''){
                this.repeatEmpty = true
                this.errors.repeat = "Repeat password field empty."
            }

            if (this.email == ''){
                this.emailEmpty = true
                this.errors.email = "Email field empty."
            }

            if (this.mobile == ''){
                this.numEmpty = true
                this.errors.num = "Phone number field empty."
            }

            if (this.address == ''){
                this.addEmpty = true
                this.errors.add = "Address field empty."
            }

            if (this.postal == ''){
                this.postalEmpty = true
                this.errors.postal = "Postal code field empty."
            }

            if (this.username == ''){
                this.userEmpty = true
                this.errors.user = "Display name field empty."
            }

            console.log(this.errors)

        },

        checkAddr() {

            axios.get("https://maps.googleapis.com/maps/api/geocode/json?", {
                params: {
                    address: this.postal,
                    key: "AIzaSyAk7Dq17v0SWL983LCrYA_nXdA5fjitXxw"
                }
            })
                .then(response => {
                    console.log(response.data.results)

                    if (response.data.results.length > 0) {

                        this.invalidAddr = false

                        // save in database
                        this.lat = response.data.results[0].geometry.location.lat
                        this.lng = response.data.results[0].geometry.location.lng

                        // save in database
                        console.log(response.data.results[0].address_components)
                        for (let i = 0; i < response.data.results[0].address_components.length; i++) {
                            let each = response.data.results[0].address_components[i]
                            if (each.types.includes('neighborhood')) {
                                this.region = each.long_name
                            }
                        }

                    } else {
                        this.invalidAddr = true
                    }

                })
                .catch(error => {

                    console.log(error.message)
                    this.invalidAddr = true

                })
        },

        startTimer() {
            clearTimeout(this.timerId)
            this.timerId = window.setTimeout(this.checkAddr, 400)
        }
    },

    setup() {
        const modalActive = modalref(false);
        const toggleModal = () => {
            modalActive.value = !modalActive.value;
            if (modalActive.value == modalref(false).value){
                window.location.href = `/`;
            }
        };
        return { modalActive, toggleModal };
    },
}
</script>