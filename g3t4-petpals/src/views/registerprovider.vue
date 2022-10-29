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
                <div class="mt-5 pt-3"></div>
            </div>

            <div class="col-10">
                <img src="" class="w-100 mt-5 pt-3 rounded-3" alt="">

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
                        <div class="col-md-6">
                            <label for="inputPassword">Password</label>
                        <input type="password" class="form-control" id="inputPassword" style="background-color: white;" placeholder="" v-model="psw" required>
                        </div>
                        <div class="col-md-6">
                            <label for="inputRepeatPassword">Repeat Password</label>
                            <input type="password" class="form-control" id="inputRepeatPassword" style="background-color: white;" placeholder="" v-model="psw_repeat" required>
                            <p v-if="psw == psw_repeat && psw != ''" style="color:green">Passwords match!</p>
                            <p v-if="psw != psw_repeat && psw_repeat !=''" style="color:red">Passwords do not match!</p>
                        </div>
                        
                    </div>
                        
                    <div class="row mx-2 mt-2"> <!-- username-->
                        <label for="inputUsername">Username</label>
                        <input type="text" class="form-control" id="inputUsername" placeholder="" required>
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
                                <input type="number" class="form-control" id="inputNumber" placeholder="" aria-describedby="inputGroupPrepend2" min="0" max="99999999" maxlength="8" minlength="8" required>
                            </div>
                    </div>
                    <div class="row mx-2 mt-2"> <!-- profile picture -->
                    <label for="profilepicture">Profile Picture</label>
                        <input type="file" class="form-control-file" id="profilepicture" required>
                    </div>

                    <div class="row mx-2 mt-2"> <!-- address -->
                        <label for="inputAddress">Address</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="" required>
                    </div>
                    <div class="row mx-1 mt-2"> <!-- postal and region -->
                        <div class="col-md-6">
                        <label for="inputPostal">Postal Code</label>
                        <input type="text" class="form-control" id="inputPostal" required>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                        <label for="inputRegion">Region</label>
                        <select id="inputRegion" class="form-control" required>
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
                        <textarea class="form-control" id="inputDesc" rows="10"></textarea>
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
                                    <input class="form-input w-100" type="number" value="" id="petRate" min="0" max="50" >
            
                                </div>
                                </div>
                                <div class="row">
                                    <div class="required-services my-2">
                                    <label class="me-2" for="yearsofexp">Years of Experience</label>
                                    <br>
                                    <input class="form-input w-100" type="number" value="" id="yearsofexp" min="0" max="50" >
                                </div>
                                </div>
                                
                            </div>
                        </div>
                    
                    </div>
                    <div class="row">
                        <div class="col-md-5"></div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-dark w-100">Sign up!</button>
                        </div>
                        <div class="col-md-5"></div>
                        
                    </div>
                    </div>
            </div>
            </div>
            <div class="col-1 sides">
            </div>

        </div>
        
        </div>
        <footer>
            <petpalsFooter></petpalsFooter>  
        </footer>
    
</template>

<script>
    import navbar from '@/components/navbar.vue'

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
                yrsOfExp : 0,
            }
        },

        components: {
            navbar, 
        }
    }

</script>