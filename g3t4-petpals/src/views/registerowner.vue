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
                    <h3 class="my-4" style="text-align:center">Register as a PetPals Pet Owner with us today!</h3>
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
                    <div class="row mx-2 mt-2"> <!-- number of pets-->
                        <label for="inputPetNo">Please indicate how many pets you have!</label>
                        <input type="number" class="form-control" id="inputPetNo" placeholder="1" min="1" max="10" v-model="numPets">
                    </div>
                    <button type="submit" class="btn btn-primary">Sign up!</button>
                    </form>
                    </div>
                    
                    <div class="col">
                         <template v-for="n in numPets">
                            <div class="row">
                                <div class="row mx-2 mt-2">
                                    {{petname}}
                                </div>
                                <div class="row mx-2 mt-2"> <!-- pet name -->
                                    <label for="inputPetName">Name of Pet {{n}}</label>
                                    <input type="text" class="form-control" id="inputPetName" placeholder="" v-model="petname" required>
                                </div>
                                <div class="row mx-2 mt-2"> <!-- pet age -->
                                    <label for="inputPetAge">{{petname}}'s age</label>
                                    <input type="number" class="form-control" id="inputPetAge" placeholder="" min="0" max="20" required>
                                </div>
                                <div class="row mx-2 mt-2"> <!-- pet breed -->
                                    <label for="inputPetBreed">{{petname}}'s breed</label>
                                    <input type="text" class="form-control" id="inputPetBreed" placeholder="" required>
                                </div>
                                <div class="row mx-2 mt-2"> <!-- pet temperament -->
                                    <label for="inputPetTemp">How is {{petname}} like?</label>
                                    <input type="text" class="form-control" id="inputPetTemp" placeholder="" required>
                                </div>
                            </div>

                            </template>
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
        }
    }

</script>