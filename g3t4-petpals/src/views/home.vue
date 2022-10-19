
<style>
    .service-png {
        
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
            <a href="#">Gallery</a>
            <a href="#">New User?</a>
        </div>

    </div>
    <!-- End Header -->


    <!-- Parallax Section -->
    <div class="container-flex">
        <div class="row parallax-section">
            <div class="col-md-8 content">
                <h2 class="headline">Bringing the best pet service providers to you</h2>
                <p>Entrust your pet with us and allow our experienced service providers to elevate your pet-owning experience. Join PetPals today and access these services offered by our providers!</p>
                <h3 style="color:#f8f1ef">New to PetPals?</h3>
                <div class="dropdown">
                    <button onclick="myFunction()" class="btn dropbtn">Register Here</button>
                    <div id="myDropdown" class="dropdown-content">
                      <a href="#">I am a pet owner.</a>
                      <a href="#">I am a pet service provider.</a>
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
                            <button class="btn login-btn">Login</button>
                        </div>
                    </div>
                </div>

            </div>

            
        </div>
    </div>
    <!-- End Parallax Section -->

    <!-- CurveUp -->
    <svg class="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100"
        viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
    </svg>

    
    <!-- Services Section -->
    <div class="container-flex" id="services">
        <h1 class="pt-5">Our Services</h1>
        <h3 class="pt-0">Choose from as many services as you like.</h3>

        <div class="row p-5">
            <services v-for="(each) of services" v-bind:tag="tags[each]" v-bind:png="png[each]" v-bind:service="each"></services>
        </div>

        <div class="row join py-4">
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

    <div class="links"></div>

    <footer>
        <p>&#169 PetPals 2022</p>
    </footer>

</template>


<script>
    import services from '@/components/services.vue'

    export default {
        data() {
            return {
                counter: 0,
                services: ['Pet Walking','Pet Grooming','Pet Hotels','Pet Sitters','Pet Trainers','Pet Transport'],
                tags: {'Pet Walking': 'Take your pet out on scheduled walks with our Pet Walkers.', 'Pet Grooming': 'Be returned a clean and fresh pet with our experienced Pet Groomers.', 'Pet Hotels': 'Leave your pet with our trusted Pet Hotel Providers while on holiday.', 'Pet Sitters': 'Leave your pet with our trusted Pet Sitters while running errands.', 'Pet Trainers': 'Train your pet with our qualified Pet Trainers.', 'Pet Transport': 'Transport your pet safely with our Pet Movers.'},
                png: {'Pet Walking': 'src/img/png/walker.png', 'Pet Grooming': 'src/img/png/groomer.png', 'Pet Hotels': 'src/img/png/hotel.png', 'Pet Sitters': 'src/img/png/sitter.png', 'Pet Trainers': 'src/img/png/trainer.png', 'Pet Transport': 'src/img/png/catincar.png'}
            }
        },
        methods: {
            Nav(){
                if (this.counter == 1){
                    this.counter = 0;
                } else {
                    this.counter++;
                }
            }
        },
        components: {
            services
        }
    }


        // function myFunction() {
        //     document.getElementById("myDropdown").classList.toggle("show");
        // }

        // // Close the dropdown menu if the user clicks outside of it
        // window.onclick = function(event) {
        //     if (!event.target.matches('.dropbtn')) {
        //         var dropdowns = document.getElementsByClassName("dropdown-content");
        //         var i;
        //         for (i = 0; i < dropdowns.length; i++) {
        //         var openDropdown = dropdowns[i];
        //         if (openDropdown.classList.contains('show')) {
        //             openDropdown.classList.remove('show');
        //         }
        //         }
        //     }
        // }

        // var textWrapper1 = document.querySelector('.abt');
        // textWrapper1.innerHTML = textWrapper1.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        // anime.timeline({loop: true})
        // .add({
        //     targets: '.abt .letter',
        //     opacity: [0,1],
        //     easing: "easeInOutQuad",
        //     duration: 2250,
        //     delay: (el, i) => 150 * (i+1)
        // }).add({
        //     targets: '.abt',
        //     opacity: 0,
        //     duration: 1000,
        //     easing: "easeOutExpo",
        //     delay: 1000
        // });

        // var textWrapper2 = document.querySelector('.headline');
        // textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        // anime.timeline({loop: true})
        // .add({
        //     targets: '.headline .letter',
        //     translateX: [40,0],
        //     translateZ: 0,
        //     opacity: [0,1],
        //     easing: "easeOutExpo",
        //     duration: 1200,
        //     delay: (el, i) => 500 + 30 * i
        // }).add({
        //     targets: '.headline .letter',
        //     translateX: [0,-30],
        //     opacity: [1,0],
        //     easing: "easeInExpo",
        //     duration: 1100,
        //     delay: (el, i) => 100 + 30 * i
        // });
</script>