<style>

.fade-in-text {
    animation: fadeIn 5s;
    -webkit-animation: fadeIn 5s;
    -moz-animation: fadeIn 5s;
    -o-animation: fadeIn 5s;
    -ms-animation: fadeIn 5s;
    animation-direction: alternate;
    animation-iteration-count: 1000000;
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @-moz-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @-webkit-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @-o-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @-ms-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  .is-typed {
    width: 80%;
    margin: auto;
    padding-bottom: 50px;
    font-size: 4vh;
    line-height: 1.5em;
    letter-spacing: 2px;
    padding-top: 20%;
    font-family: 'Alata';
    font-style: italic;
    width: 80%;
    text-align: center;
  }
  .is-typed span.typed {
    color: #58484e;
  }
  .is-typed span.cursor {
    display: inline-block;
    width: 3px;
    background-color:#58484e;
    animation: blink 1s infinite;
  }
  .is-typed span.underscore {
    display: inline-flex;
    width: 10px;
    height: 1px;
    align-items: flex-end;
    background-color:#58484e;
    animation: blink 1s infinite;
  }
  .is-typed span.cursor.typing {
    animation: none;
  }
  @keyframes blink {
    49% {
      background-color: #58484e;
    }
    50% {
      background-color: transparent;
    }
    99% {
      background-color: transparent;
    }
  }
</style>

<template>
<!-- Header -->
<div id="top-header" class="header-home">
    <img src="../img/logo2.png" style="width: 125px">

    <button class="btn openbtn" v-on:click="Nav()">&#9776; Menu</button>

    <div v-if="counter == 0" id="mySidepanel" class="closed">
    </div>

    <div v-else id="mySidepanel" class="sidepanel">
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#gallery">Gallery</a>
        <a href="#">Login</a>
    </div>

    

</div>
<!-- End Header -->

<!-- Parallax Section -->
<div class="container-flex">
    <div class="row">

        <div class="col-md-4 order-md-2 content-login">
            <div class="box">
                <div v-if="forgot" class="login mt-5" style="padding-bottom:350px;">
                    <h3>Reset Password</h3>
                    <div class="my-3">

                        <div class="form w-100 mt-4 mb-1">
                            <input type="text" autocomplete="off" v-model = 'email' id="email" required />
                            <label for="text" class="label-name p-3">
                                <span class="content-name">
                                Enter Your Email:
                                </span>
                            </label>
                        </div>

                        <div v-if="emailSent">
                            <small style="font-style:italic; color:brown" class="text-center py-4">Email sent!</small>
                        </div>
                        <small v-else style="font-style:italic">*An email will be sent to your inbox to reset your password.</small>
                    </div>


                    <div class="login-btn mt-5" v-if="emailSent">
                        <button class="btn login-btn btn-select" @click="forgot=false">Back to login</button>
                    </div>
                    <div class="login-btn mt-5" v-else>
                        <button class="btn login-btn btn-select" @click="resetPassword()">Confirm</button>
                    </div>

                </div>

                <div v-else class="login" style="padding-bottom:80px;">
                    <h3 class="pt-5 mb-4">Login</h3>

                        <div class="form w-100">
                            <input type="text" autocomplete="off" v-model = 'email' id="email" required />
                            <label for="text" class="label-name p-3">
                                <span class="content-name">
                                Enter Your Email:
                                </span>
                            </label>
                        </div>

                        <div class="form w-100 mt-4">
                            <input type="password" v-model = 'pwd' v-on:keyup.enter = 'userLogin()' class="form-control" id="pwd" autocomplete="off" required />
                            <label for="password" class="label-name p-3">
                                <span class="content-name">
                                Enter Your Password:
                                </span>
                            </label>
                            
                        </div>

                        <button class="btn p-0" style="background-color:transparent; border-color:transparent; font-size:12px; color:#F8AA9D" @click="forgot=true">Forgot password?</button>

                        <div v-if="loginError" class="text-center mt-3">
                            <small style="font-style:italic; color:brown">{{errorMsg}}</small>
                        </div>

                        <button v-if='verified' class="btn login-btn btn-select mt-3 p-1 mx-auto px-2" @click="sendEmail">Resend email verification</button>

                    <div class="login-btn">
                        <button class="btn login-btn btn-select mt-4" @click="userLogin">Login</button>
                    </div>

                    <div class="text-center">
                        <h4 class="mt-5 mb-3" style="font-style:italic">or</h4>
                        <h3>New to PetPals?</h3>
                        <div class="dropdown mt-3">

                            <div class="d-block fade-in-text mx-auto">
                                <img src="../img/doggieicon.png" style="width:50px;">
                                <img src="../img/catto.png" style="width:50px;">
                            </div>

                            <button class="btn btn-select">Register Here</button>
                            <div class="dropdown-content">
                                <router-link to="/registerowner" style="font-size:16px;text-decoration:none" class="text-center pt-2 ">I am a pet owner.</router-link>
                                <router-link to="/registerprovider" style="font-size:16px;text-decoration:none;" class="text-center pt-2 ">I am a pet service provider.</router-link>
                            </div>
                        </div>
                    </div>
                
                </div>

                
            </div>

            <svg class="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" style="fill:white;stroke:white;z-index:-1;"
                viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
                </svg>

        </div>

        <div class="col-md-8 order-md-1 content parallax-section">
            <vue-writer :array="arr" :eraseSpeed="50" :typeSpeed="100" :delay="3600" />
            <p>Entrust your pet with us and allow our experienced service providers to elevate your pet-owning experience. Join PetPals today and access these services offered by our providers!</p>
        </div>

        
    </div>

    <!-- CurveUp -->
    <svg class="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
        viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
    </svg>

    
    <!-- Services Section -->
    <div class="row pt-5" id="services">
        <h2 class="pt-5 text-center">Our Services</h2>

        <h4 class="mt-4 text-center" style="font-style:normal;font-family:'Figtree';line-height:0.7em;color:#856658;">Choose from as many services as you like.</h4>
        <h4 class="mt-3 text-center" style="font-style:normal;font-family:'Figtree';line-height:0.7em;color:#856658;">Match with the perfect pet service provider.</h4>
        
        <div class="row p-5">
            <services v-for="(each) of services" v-bind:tag="tags[each]" v-bind:png="png[each]" v-bind:service="each"></services>
        </div>

        <hr>

        <div class="row join py-5">
            <h2 class="my-3 text-center" style="color:#F8AA9D">Join PetPals today</h2>
            
            <div class="col-2"></div>

            <div class="col-lg-4">
                <img src="../img/owner.png" class="img-fluid d-block mx-auto my-5" alt="">
                <h3 style="color:#F8AA9D">Pet Owner</h3>
                <p>Sign up today and meet your best suited pet service provider with us!</p>
            </div>

            <div class="col-lg-4">
                <img src="../img/service.png" class="img-fluid d-block mx-auto my-5"  alt="">
                <h3 style="color:#F8AA9D">Pet Service Provider</h3>
                <p>Register today as a service provider and secure bookings from pet owners with us!</p>
            </div>

            <div class="col-2"></div>

        </div>

    </div>
    <!-- End Services Section -->

    <!-- CurveDown -->
    <svg class="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
        viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
    </svg>

    <div class="dog">
        <img src="../img/dog.jpeg" alt="">

        <div class="about">
            <h1 class="abt fade-in-text" id="about">About Us</h1>
        </div>
    </div>

    <!-- CurveUp -->
    <svg class="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
    viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
    </svg>

    <!-- About Us Section -->

    <div class="container-flex about-bg">
        <div class="petpals-about">
            <p>We are a team of pet lovers that strives to connect the pet community, matching pet service providers to pet owners. Owning a pet is never easy, and requiring additional help is more than normal. At PetPals, we make this easy, and you can easily filter and select the best pet service provider for you. Choose from our wide selection of service providers based on the services you need and elevate your pet-owning experience!</p>

            <p>We also provide pet lovers a platform to use their expertise and share their knowledge while earning some income on top of that. Choose the pet owners that fit you the best and enjoy connecting with them and getting to know their plan. Let's grow the pet lovers community together!</p>

        </div>

        <div class="row">

        </div>
    </div>
    <!-- End Quotes Section -->

    <!-- CurveDown -->
    <svg class="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
        viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 0 C 50 100 80 100 100 0 Z"></path>
    </svg>


    <div class="m-5 pt-5" id="gallery">
        <h3 class="mt-5 text-center">Gallery</h3>
        <div class="row m-5">
            <div class="col-sm-4 mb-4 mb-lg-0 ">
            <img
                src="../img/gallery/img1.jpeg"
                class="w-100 shadow-1-strong rounded mb-4"
            />
        
            <img
                src="../img/gallery/img4.jpeg"
                class="w-100 shadow-1-strong rounded mb-4"
            />
            </div>
        
            <div class="col-sm-4 mb-4 mb-lg-0">
            <img
                src="../img/gallery/img3.jpeg"
                class="w-100 shadow-1-strong rounded mb-4"
            />
        
            <img
                src="../img/gallery/img2.jpeg"
                class="w-100 shadow-1-strong rounded mb-4"
            />
            </div>
        
            <div class="col-sm-4 mb-4 mb-lg-0">
            <img
                src="../img/gallery/img6.jpeg"
                class="w-100 shadow-1-strong rounded mb-4"
            />
        
            <img
                src="../img/gallery/img5.webp"
                class="w-100 shadow-1-strong rounded mb-4"
            />
            </div>
        </div>
    </div>

    <petpalsFooter></petpalsFooter>
</div>
</template>


<script>
import services from '@/components/services.vue'
import petpalsFooter from '@/components/petpalsFooter.vue'
import VueWriter from "vue-writer";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
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
            counter: 0,
            services: ['Pet Walking','Pet Grooming','Pet Hotels','Pet Sitters','Pet Trainers','Pet Transport'],
            tags: {'Pet Walking': 'Take your pet out on scheduled walks with our Pet Walkers.', 'Pet Grooming': 'Be returned a clean and fresh pet with our experienced Pet Groomers.', 'Pet Hotels': 'Leave your pet with our trusted Pet Hotel Providers while on holiday.', 'Pet Sitters': 'Leave your pet with our trusted Pet Sitters while running errands.', 'Pet Trainers': 'Train your pet with our qualified Pet Trainers.', 'Pet Transport': 'Transport your pet safely with our Pet Movers.'},
            png: {'Pet Walking': 'src/img/png/walker.png', 'Pet Grooming': 'src/img/png/groomer.png', 'Pet Hotels': 'src/img/png/hotel.png', 'Pet Sitters': 'src/img/png/sitter.png', 'Pet Trainers': 'src/img/png/trainer.png', 'Pet Transport': 'src/img/png/catincar.png'},
            msg1: "Bringing the best pet service providers to you",
            loginError: false,
            errorMsg: '',
            forgot: false,
            emailSent: false,
            email: '',
            pwd: '',
            verified: false,
            arr:  ["BRINGING THE BEST PET SERVICE PROVIDERS TO YOU", "CONNECTING YOU TO PET LOVERS, JUST LIKE YOU"]
        }
    },

    methods: {
        userLogin(){
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.pwd)
            .then((userCredential) => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        if (user.emailVerified){
                        onValue(ref(db, `users/${user.uid}/type`), (snapshot) => {
                            if (snapshot.val() == 'Pet Owner'){
                                window.location.href = `/search`;
                            }else{
                                window.location.href = `/bookingsProvider`;
                            }   
                        });               
                        }else{
                            this.errorMsg = 'Please verify your email first.'
                            this.loginError = true
                            this.verified = true
                        }
                    }
                });  

            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(error.message)
                let msg = error.message.slice(22,(error.message.length)-2)
                if (msg == 'wrong-password'){
                    this.errorMsg = 'Password is invalid. Please try again.'
                }else if (msg == 'user-not-found'){
                    this.errorMsg = 'No account registered. Please register for one first.'
                    this.email = ""
                    this.pwd = "" 
                } else if (msg == 'invalid-email'){
                    this.errorMsg = 'Email is invalid. Please enter a valid email address.'
                    this.email = ""
                    this.pwd = "" 
                }else if (msg == 'missing-password'){
                    this.errorMsg = 'Please enter your password.'
                }
                this.loginError = true
            });
        },

        resetPassword(){
            const auth = getAuth();
            sendPasswordResetEmail(auth, this.email)
            .then(() => {
                this.emailSent=true
            })
            .catch((error) => {
                // this.errorMsg = 'Please enter a valid email address.'
            });
            
        },

        Nav(){
            if (this.counter == 1){
                this.counter = 0;
            } else {
                this.counter++;
            }
        },

        sendEmail(){
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    sendEmailVerification(user)
                    .then(() => {
                        this.errorMsg = 'email verification sent'
                        this.verified = false
                    });
                }
            })
        },

    },
    components: {
        services,
        petpalsFooter,
        VueWriter
    }
}
</script>