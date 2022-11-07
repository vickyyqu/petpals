<template>
    <div class="row">
        <div class="row mx-2 mt-2">
            {{petname}}
        </div>
        <div class="row mx-2 mt-2"> <!-- pet name -->
            <label for="inputPetName">Name of Pet</label>
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
<script>
    export default {
        data() {
            return {
                petname: 'Your Pet'
            }
        }
    }

</script>