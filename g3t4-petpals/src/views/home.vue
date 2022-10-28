
<style>

.fade-in-text {
    animation: fadeIn 5s;
    -webkit-animation: fadeIn 5s;
    -moz-animation: fadeIn 5s;
    -o-animation: fadeIn 5s;
    -ms-animation: fadeIn 5s;
    animation-direction: alternate;
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
            <a href="#">New User?</a>
        </div>

        

    </div>
    <!-- End Header -->


    <!-- Parallax Section -->
    <div class="container-flex">
        <div class="row parallax-section">
            <div class="col-md-8 content">
                <h2 class="headline" v-html="msg1"></h2>
                <p>Entrust your pet with us and allow our experienced service providers to elevate your pet-owning experience. Join PetPals today and access these services offered by our providers!</p>
                <h3 style="color:#f8f1ef">New to PetPals?</h3>
                <div class="dropdown mt-4">
                    <button class="btn dropbtn btn-light">Register Here</button>
                    <div id="myDropdown" class="dropdown-content">
                        <router-link to="/registerowner">I am a pet owner.</router-link>
                        <router-link to="/registerprovider">I am a pet service provider.</router-link>
                    </div>
                </div>
            </div>

            <div class="col-md-4 content-login">
                <div class="box">
                    <div class="login">
                        <h3>Login</h3>
                        <div class="my-3">
                            <label for="email" class="form-label"> Enter your email:</label>
                            <input type="email" class="form-control" id="email">
                        </div>
                        <div class="mb-3">
                        <label for="pwd" class="form-label">Enter your password:</label>
                        <input type="password" class="form-control" id="pwd">
                        <a href="#">Forgot password?</a>
                        </div>

                        <div class="login-btn">
                            <button class="btn login-btn btn-dark" v-on:click="userLogin()">Login</button>
                        </div>
                    </div>
                </div>

            </div>

            
        </div>

        <!-- CurveUp -->
        <svg class="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
            viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
        </svg>

        
        <!-- Services Section -->
        <div class="row" id="services">
            <h1 class="pt-5">Our Services</h1>

            <h3 class="mt-3" style="font-style:normal;font-family: 'Figtree'">Choose from as many services as you like.</h3>
            <h3 class="mt-3" style="font-style:normal;font-family: 'Figtree'">Match with the perfect pet service provider.</h3>
            
            <div class="row p-5 m-3">
                <services v-for="(each) of services" v-bind:tag="tags[each]" v-bind:png="png[each]" v-bind:service="each"></services>
            </div>

            <hr>

            <div class="row join py-5">
                <h1 class="pb-3" style="color:#F8AA9D">Join PetPals today</h1>
                
                <div class="col-2"></div>

                <div class="col-4">
                    <img src="../img/owner.png" class="img-fluid d-block mx-auto my-5" alt="">
                    <h3 style="color:#F8AA9D">Pet Owner</h3>
                    <p>Sign up today and meet your best suited pet service provider with us!</p>
                </div>

                <div class="col-4">
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
                <h1 class="abt" id="about">About Us</h1>
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
            <h1 class="mt-5 text-center">Gallery</h1>
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

    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";

    const firebaseConfig = {
        apiKey: "AIzaSyAS74F4gerXVK8OW-RBq3rSGNEoHuqLQ0A",
        authDomain: "petpals-623e3.firebaseapp.com",
        projectId: "petpals-623e3",
        storageBucket: "petpals-623e3.appspot.com",
        messagingSenderId: "949038254831",
        appId: "1:949038254831:web:82d399649bb06e8389e91a",
        databaseURL: "https://petpals-623e3-default-rtdb.asia-southeast1.firebasedatabase.app/"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
 
    // Import the functions needed to read from realtime database
    import { getDatabase, ref, onValue, set, update, get, push} from "firebase/database";
    import CryptoJS from "crypto-js"
    

    // connect to the realtime database
    const db = getDatabase(app);


    export default {
        data() {
            return {
                counter: 0,
                services: ['Pet Walking','Pet Grooming','Pet Hotels','Pet Sitters','Pet Trainers','Pet Transport'],
                tags: {'Pet Walking': 'Take your pet out on scheduled walks with our Pet Walkers.', 'Pet Grooming': 'Be returned a clean and fresh pet with our experienced Pet Groomers.', 'Pet Hotels': 'Leave your pet with our trusted Pet Hotel Providers while on holiday.', 'Pet Sitters': 'Leave your pet with our trusted Pet Sitters while running errands.', 'Pet Trainers': 'Train your pet with our qualified Pet Trainers.', 'Pet Transport': 'Transport your pet safely with our Pet Movers.'},
                png: {'Pet Walking': 'src/img/png/walker.png', 'Pet Grooming': 'src/img/png/groomer.png', 'Pet Hotels': 'src/img/png/hotel.png', 'Pet Sitters': 'src/img/png/sitter.png', 'Pet Trainers': 'src/img/png/trainer.png', 'Pet Transport': 'src/img/png/catincar.png'},
                msg1: "Bringing the best pet service providers to you"
            
            }
        },

        methods: {
            userLogin(){
                var email = document.getElementById('email').value;
                // var username = document.getElementById('username')
                var pwd = document.getElementById('pwd').value;

                get(ref(db,`users/${email}`))
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    console.log('user exists!');
                    // var cipher = CryptoJS.AES.encrypt(pwd, 'default');
                    // cipher = cipher.toString();
                    // console.log('my encrypted password: ' + cipher);

                    var decipher = CryptoJS.AES.decrypt(snapshot.val().hashedpwd, 'default');
                    decipher = decipher.toString(CryptoJS.enc.Utf8);
                    console.log('my password: ' + decipher);
                    if (decipher == pwd){
                        console.log('yay')
                        window.location.href = `/search`;

                    }else{
                        console.log('nay')
                    }

                  } else {
                    console.log("user is not registered");
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            },

            Nav(){
                if (this.counter == 1){
                    this.counter = 0;
                } else {
                    this.counter++;
                }
            }
        },

        components: {
            services,
            petpalsFooter
        }
    }
</script>