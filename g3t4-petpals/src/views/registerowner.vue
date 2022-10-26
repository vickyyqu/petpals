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
                <img src="" class="w-100 mt-5 pt-3 rounded-3" alt="">

                <div class="px-5">
                    <h3 class="my-4" style="text-align:center">Register as a PetPals Pet Owner with us today!</h3>
                </div>
                <div>
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-6">
                    <form>
                        
                    <div class="row mt-2"> <!-- email and username-->
                        <div class="col-md-6">
                            <label for="inputEmail">Email</label>
                            <input type="email" class="form-control w-100" id="inputEmail" style="background-color:white;" placeholder="" required>
                        </div>
                        <div class="col-md-6">
                            <!-- <label for="inputUsername">Username</label>
                            <input type="text" class="form-control w-100" id="inputUsername" placeholder="" required> -->
                            <label for="inputNumber">Phone Number</label>
                            <input type="text" class="form-control w-100" id="inputNumber" placeholder="" aria-describedby="inputGroupPrepend2" min="0" max="99999999" maxlength="8" minlength="8" required>
                        
                        </div>
                    </div>
                    <div class="row mt-2"> <!-- psw and repeat psw -->
                        <div class="col">
                            <label for="inputPassword">Password</label>
                            <input type="password" class="form-control w-100" id="inputPassword" style="background-color:white"  placeholder="" v-model="psw" required>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col">
                            <label for="inputRepeatPassword">Repeat Password</label>
                            <input type="password" class="form-control w-100" id="inputRepeatPassword" style="background-color:white"  placeholder="" v-model="psw_repeat" required>
                            <p v-if="psw == psw_repeat && psw != ''" style="color:green">Passwords match!</p>
                            <p v-if="psw != psw_repeat && psw_repeat !=''" style="color:red">Passwords do not match!</p>
                        </div>
                    </div>


                    <div class="row mt-2"> <!-- nickname and phone number-->
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
                    <div class="row mt-2"> <!-- profile picture -->
                        <div class="col">
                            <label for="profilePicture">Profile Picture</label>
                        <input type="file" class="form-control w-100"  id="profilePicture" required>
                        </div>
                        
                    </div>
                    <div class="row mt-2"> <!-- address -->
                        <div class="col">
                            <label for="inputAddress">Address</label>
                            <input type="text" class="form-control w-100" id="inputAddress" placeholder="" required>
                        </div>
                    </div>
                    <div class="row mt-2"> <!-- postal -->
                        <div class="col-md-6">
                            <label for="inputPostal">Postal Code</label>
                            <input type="text" class="form-control w-50" id="inputPostal" required>
                        </div>
                       
                    </div>

                   
                    <!-- <div class="row mx-2 mt-2"> number of pets 
                        <label for="inputPetNo">Please indicate how many pets you have!</label>
                        <input type="number" class="form-control" id="inputPetNo" placeholder="1" min="1" max="10" v-model="numPets">
                    </div> -->
                    <div class="row"> <!-- submit -->
                        <div class="col-4"></div>
                        <div class="col-4">
                            <button type="submit" class="btn btn-dark" >Sign up!</button>
                        </div>
                        <div class="col-4"></div>
                    </div>
                    </form>
                    </div>
                    <div class="col-3"></div>
                    <!-- <div class="col">
                         <template v-for="n in numPets">
                            <petprofile></petprofile>

                            </template>
                    </div> -->
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
    import petprofile from '@/components/petprofile.vue'


    export default {
        data() {
            return {
                psw: '',
                psw_repeat: '',
                numPets: 1,
                petname: 'Your Pet'
            }
        },
        components: {
            navbar, 
            petprofile
        }
    }

</script>