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
                        <div class="col-md-6">
                            <label for="inputEmail">Email</label>
                        <input type="email" class="form-control" id="inputEmail" style="background-color: white;" placeholder="" required>
                        </div>
                        <div class="col-md-6">
                            <label for="inputNumber">Phone Number</label>
                            <input type="number" class="form-control" id="inputNumber" placeholder="" aria-describedby="inputGroupPrepend2" min="0" max="99999999" maxlength="8" minlength="8" required>
                        </div>
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
                        <div class="col-md-6">
                            <label for="inputUsername">Username</label>
                            <p class="form-text">This is how we can uniquely identify you!</p>
                            <input type="text" class="form-control w-100" id="inputUsername" placeholder="" required>
                        </div>
                        <div class="col-md-6">
                            <label for="inputNickname">Nickname</label>
                            <p id="nicknameHelp" class="form-text text-muted">This is your name to other users!</p>
                            <input type="text" class="form-control w-100" id="inputNickname" placeholder="" required>
                        </div>
                    </div>
                    <div class="row mx-2 mt-2"> <!-- profile picture -->
                        <div class="col">
                            <label for="profilePicture">Profile Picture</label>
                        <input type="file" class="form-control w-100"  id="profilePicture" required>
                        </div>
                        
                    </div>
                    <div class="row mx-2 mt-2"> <!-- address -->
                        <div class="col">
                            <label for="inputAddress">Address</label>
                            <input type="text" class="form-control w-100" id="inputAddress" placeholder="" required>
                        </div>
                    </div>

                    <div class="row mx-2 mt-2"> <!-- postal -->
                        <div class="col-md-6">
                            <label for="inputPostal">Postal Code</label>
                            <input type="text" class="form-control w-50" id="inputPostal" required>
                        </div>
                        
                    </div>
                    </form>

                    </div>
                    
                    <div class="col">
                        <div class="row mx-2 mt-2"><!-- profile desc-->
                            <div class="col">
                                <label for="inputDesc">Tell us more about yourself!</label> 
                                <textarea class="form-control" id="inputDesc" rows="8"></textarea>
                            </div>
                        </div>
                        <div class="row mx-2 mt-2">
                            <div class="col-sm-8"> <!-- services provided -->
                                <div class="required-services my-2">
                                    <label class="me-2">Services you provide:</label>
                                    <br>
                                    <div class="form-check-inline">
                                        <input class="form-check-input" type="checkbox" value="" id="petSitter">
                                        <label class="form-check-label ps-2" for="petSitter">
                                            Pet Sitter
                                        </label>
                                    </div>

                                    <div class="form-check-inline">
                                        <input class="form-check-input" type="checkbox" value="" id="petWalker">
                                        <label class="form-check-label ps-2" for="petWalker">
                                            Pet Walker
                                        </label>
                                    </div>

                                    <div class="form-check-inline">
                                        <input class="form-check-input" type="checkbox" value="" id="petGroomer">
                                        <label class="form-check-label ps-2" for="petGroomer">
                                            Pet Groomer
                                        </label>
                                    </div>

                                    <div class="form-check-inline">
                                        <input class="form-check-input" type="checkbox" value="" id="petHotel">
                                        <label class="form-check-label ps-2" for="petHotel">
                                            Pet Hotel
                                        </label>
                                    </div>

                                    <div class="form-check-inline">
                                        <input class="form-check-input" type="checkbox" value="" id="petTrainer">
                                        <label class="form-check-label ps-2" for="petTrainer">
                                            Pet Trainer
                                        </label>
                                    </div>

                                    <div class="form-check-inline">
                                        <input class="form-check-input" type="checkbox" value="" id="petMover">
                                        <label class="form-check-label ps-2" for="petMover">
                                            Pet Mover
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4"> <!-- rates and exp -->
                                <div class="row">
                                    <div class="required-services my-2">
                                    <label class="me-2" for="petRate">Your Hourly Rates</label>
                                    <br>
                                    <input class="form-input w-100" rounded type="number" value="" id="petRate" min="0" max="50" >
            
                                </div>
                                </div>
                                <div class="row">
                                    <div class="required-services my-2">
                                    <label class="me-2" for="yearsofexp">Years of Experience</label>
                                    <br>
                                    <input class="form-input w-100" rounded type="number" value="" id="yearsofexp" min="0" max="50" >
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
    import petpalsFooter from '@/components/petpalsFooter.vue'

    export default {
        data() {
            return {
                psw: '',
                psw_repeat: '',
                numPets: 1,
            }
        },
        components: {
            navbar, 
            petpalsFooter
        }
    }

</script>