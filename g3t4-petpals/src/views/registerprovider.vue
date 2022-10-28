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

            <div class="col-10">
                <img src="" class="w-100 mt-5 pt-3 rounded-3" alt="include a pic?">

                <div class="px-5">
                    <h3 class="my-4" style="text-align:center">Register as a PetPals Service Provider with us today!</h3>
                </div>
                <div>
                <div class="row">
                    <div class="col">
                    <form>
                        
                    <div class="row mx-2 mt-2"> <!-- email -->
                        <label for="inputEmail">Email</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="" required>
                    </div>
                    <div class="row mx-2 mt-2"> <!-- psw -->
                        <label for="inputPassword">Password</label>
                        <input type="password" class="form-control" id="inputPassword" placeholder="" v-model="psw" required>
                    </div>
                    <div class="row mx-2 mt-2"> <!-- repeat psw -->
                        <label for="inputRepeatPassword">Repeat Password</label>
                        <input type="password" class="form-control" id="inputRepeatPassword" placeholder="" v-model="psw_repeat" required>
                    </div>
                    <p v-if="psw == psw_repeat && psw != ''" style="color:green">Passwords match!</p>
                    <p v-if="psw != psw_repeat && psw_repeat !=''" style="color:red">Passwords do not match!</p>
                    <div class="row mx-2 mt-2"> <!-- username-->
                        <label for="inputUsername">Username</label>
                        <input type="text" v-model='username' class="form-control" id="inputUsername" placeholder="" required>
                    </div>

                    <div class="row mx-2 mt-2"> <!-- nickname -->
                        <label for="inputNickname">Nickname</label>
                        <small id="nicknameHelp" class="form-text text-muted">This is your name to other users!</small>
                        <input type="text" class="form-control" id="inputNickname" placeholder="" required>
                    </div>
                    <div class="row mx-2 mt-2"> <!-- phone num -->
                            <label for="inputNumber">Phone Number</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupPrepend">+65</span>
                                </div>
                                <input type="number" v-model='mobile' class="form-control" id="inputNumber" placeholder="" aria-describedby="inputGroupPrepend2" min="0" max="99999999" maxlength="8" minlength="8" required>
                            </div>
                    </div>
                    <div class="row mx-2 mt-2"> <!-- profile picture -->
                    <label for="profilepicture">Profile Picture</label>
                        <input type="file" @change = 'getPic' class="form-control-file" id="profilepicture" required>
                    </div>

                    <div class="row mx-2 mt-2"> <!-- address -->
                        <label for="inputAddress">Address</label>
                        <input type="text" v-model='address' class="form-control" id="inputAddress" placeholder="" required>
                    </div>
                    <div class="row mx-1 mt-2"> <!-- postal and region -->
                        <div class="col-md-6">
                        <label for="inputPostal">Postal Code</label>
                        <input type="text" v-model='postal' class="form-control" id="inputPostal" required>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                        <label for="inputRegion">Region</label>
                        <select id="inputRegion" class="form-control" v-model='region' required>
                            <option selected>North</option>
                            <option>South</option>
                            <option>East</option>
                            <option>West</option>
                            <option>Central</option>
                        </select>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Sign up!</button>
                    </form>
                    </div>
                    
                    <div class="col">
                        <div class="row mx-2 mt-2"><!-- profile desc-->
                        <label for="inputDesc">Tell us more about yourself!</label> 
                        <textarea class="form-control" v-model='desc' id="inputDesc" rows="10"></textarea>
                        </div>
                        <div class="row mx-2 mt-2">
                            <div class="col-sm-8"> <!-- services provided -->
                                <div class="required-services my-2">
                                    <label class="me-2">Services you provide:</label>
                                    <br>
                                    <div v-for="service of services" class="form-check-inline" >
                                        <input class="form-check-input" type="checkbox" v-bind:value = "service" v-model="checkedServices">
                                        <label class="form-check-label ps-2">
                                            {{ service }}
                                        </label> 
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4"> <!-- rates and exp -->
                                <div class="row">
                                    <div class="required-services my-2">
                                    <label class="me-2" for="petRate">Your Hourly Rates</label>
                                    <br>
                                    <input class="form-input w-100" v-model='rates' type="number" id="petRate" min="0" max="50" >
            
                                </div>
                                </div>
                                <div class="row">
                                    <div class="required-services my-2">
                                    <label class="me-2" for="yearsofexp">Years of Experience</label>
                                    <br>
                                    <input class="form-input w-100" v-model='yrsOfExp' type="number" id="yearsofexp" min="0" max="50" >
                                </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="row mx-2 mt-2">
                            <div class="required-services my-2">
                                    <label class="me-2">Are you currently available for our pet owners to engage you?</label>
                                    <br>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="avail" value="option1">
                                        <label class="form-check-label" for="avail">Yes</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="unavail" value="option2">
                                        <label class="form-check-label" for="unavail">No</label>
                                        </div>
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
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
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
                services: ['Pet Walker', 'Pet Groomer', 'Pet Hotel', 'Pet Sitter', 'Pet Trainer', 'Pet Mover'],
                checkedServices : [], //services provided gonna move to another page?

                psw: '',
                psw_repeat: '',
                numPets: 1, //do we need this?

                email : '',
                postal : '',
                address : '',
                username : '',
                mobile : '',
                pic : 'https://cdn-icons-png.flaticon.com/512/2102/2102647.png',
                desc : '',
                rates : 0, // for now until frontend fixed
                yrsOfExp : '',
            }
        },

        components: {
            navbar, 
        },

        methods : {
            getPic(event){
                const files = event.target.files
                if (!files.length) return 

                const reader = new FileReader()
                reader.readAsDataURL(files[0])
                reader.onload = () => (this.pic = reader.result)

                // console.log(this.pic)
            },

            registerUser(){
                const auth = getAuth();
                if (this.psw == this.psw_repeat && this.psw != '' && this.email != '' && this.postal != '' && this.address != '' && this.username != '' && this.mobile != ''){
                    createUserWithEmailAndPassword(auth,this.email, this.psw)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log('user created!')
                        updateProfile(auth.currentUser, {
                            displayName: this.username , photoURL: this.pic
                        })

                        set(ref(db, `users/${user.uid}`), {
                            username: this.username,
                            profilepic : this.pic,
                            mobile: this.mobile,
                            type: 'Pet Owner',
                            desc: this.desc, //this is just profile description
                            yrsOfExp : this.yrsOfExp,
                            address: this.address,
                            postalcode : this.postal,
                            ratings : 0, //by default
                            // havent add in services provided
                        })

                        signInWithEmailAndPassword(auth, this.email, this.psw)
                        .then((user) => {
                            window.location.href = `/search`;
                        })
                        .catch((error) => {
                            // const errorCode = error.code;
                            const errorMessage = error.message.slice(22,(error.message.length)-2)
                            console.log(errorMessage)
                        })



                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });     
                    
                }

            }
        }
    }

</script>