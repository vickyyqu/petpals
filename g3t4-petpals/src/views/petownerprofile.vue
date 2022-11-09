<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.profile-page {
  // padding-top:50px;
  align-items: center;
  justify-content: center;
  background-color: #fffbfa;
  padding-top: 80px;
}

.profile-leftbox {
  border-radius: 40px;
  background-color: #fddcd74d;
  box-shadow: 0 0 10px 0 #cec2c233;
}

.profile-rightbox {
  border-radius: 40px;
  background-color: white;
  box-shadow: 0 0 10px 0 #cec2c233;
}

.row {
  text-align: center;
}

.row-image {
  text-align: center;
}

img.rounded {
  object-fit: cover;
  border-radius: 50%;
  height: 100px;
  width: 100px;
}

.modal-content {
  display: flex;
  flex-direction: column;

  h1,
  p {
    margin-bottom: 16px;
  }

  h1 {
    font-size: 32px;
  }

  p {
    font-size: 18px;
  }
}
</style>

<template>

<div class="container-fluid profile-page pb-5">
  <navbar></navbar>
  <!--Left column-->
  <div class="row p-4">
    <div class="col-md-4 profile-leftbox">
      <div class="row">
        <div class="d-flex justify-content-end">
          <button @click="toggleModal" class="btn btn-select me-2 mt-3">
            <i class="bi bi-pencil-square"></i>
          </button>
        </div>

        <div class="row-image">
          <img v-bind:src="photoURL" class="rounded rounded-circle" />
        </div>

        <div class="row text-center">
          <h3 class="mt-3 mb-1" style="letter-spacing: 3px;color: #dfd1cd;">hello,</h3>
          <h3 class="username">{{ username }}</h3>
          <p class="my-4" style="font-style:italic">Pet Owner</p>
        </div>

        <hr class="w-75">

        <div class="my-4 text-start px-4">
          <h4>Bio</h4>
          <p class="mb-3 mt-1">
            {{ description }}
          </p>

          <h4>Ratings</h4>
          <div class="ratings mb-3 mt-1">
              <i v-for="n in parseInt(ratings)" class="bi bi-star-fill"></i>
              <i v-if='!Number.isInteger(ratings)' class="bi bi-star-half"></i>
              <i v-for='m in parseInt(5-ratings)' class="bi bi-star"></i>
          </div>

          <h4>Email</h4>
          <p class="mb-3 mt-1">{{ email }}</p>

          <h4>Mobile Number</h4>
          <p class="mb-3 mt-1">{{ mobile }}</p>

          <h4>Address</h4>
          <p class="mb-3 mt-1">{{ address }}</p>
        </div>

      </div>
    </div>

    <!--Right column-->
    <div class="col-md-8 profile-rightbox">
      <div class="row">
        <span>
          <button class="btn btn-select mt-3 me-2 float-end" @click="toggleModal2();"><i
              class="bi bi-pencil-square"></i></button>
        </span>

        <h3 class="mb-3">
          <img src="../img/animallogo/doglogo3.png" style="width: auto; height: auto" />My Pets
        </h3>

        <vueper-slides fade :touchable="false">
          <vueper-slide v-for="(pet, i) in pets" :key="i" :image="pet.photo" :title="pet.petname" :content="pet.age">
          </vueper-slide>
        </vueper-slides>
      </div>

      <div class="row mt-3">
        <div style="background-color: #fddcd74d;
            padding: 14px 50px;
          ">
          <h3>My Reviews</h3>

        </div>

        <div v-if="noReviews" class="my-5">
          <h4>No reviews to show yet...</h4>
        </div>

        <div class="p-3">
          <reviewCard v-for="rev in reviews" :reviewer="rev.username" :service='rev.service' :review="rev.review"
            :rating="rev.rating"></reviewCard>
        </div>

      </div>
    </div>
  </div>
</div>

<petpalsFooter></petpalsFooter>

<!--Edit Profile page-->
<Modal @close="toggleModal(); updateProfile()" :modalActive="modalActive">
  <div class="modal-content p-3">
    <h4 class="pb-4">Edit My Details:</h4>

    <label>Username:</label>
    <input class="form-control mb-2" type="text" id="username" v-model="username" />

    <label>Profile Picture:</label>
    <input type="file" @change='getPic' class="form-control mb-2" id="profilepicture">

    <label>Description:</label>
    <textarea class="form-control mb-2" rows="4" cols="10" id="bio" v-model="description"></textarea>

    <label>Phone Number:</label>
    <input class="form-control mb-2" type="text" id="number" v-model="mobile" />
    
    <label>Address:</label>
    <textarea class="form-control mb-2" rows="4" cols="10" id="address" v-model="address"></textarea>

    <label>Postal Code:</label>
    <input class="form-control mb-2" type="text" id="postal" v-model="postal"/>
  </div>
</Modal>

<Modal @close="toggleModal2(); addPet()" :modalActive="modalActive2">
    <div class="modal-content p-3">
      <h4 class="pb-4">Add a Pet:</h4>

      <label>Pet Name:</label>
      <input class="form-control mb-2" type="text" id="petName" placeholder='What is the name of your pet?'
        v-model="petName" required />

      <label>Pet Type:</label>
      <select class="form-control mb-2 text-muted" id="petType" v-model="petType" required>
        <option value="default" disabled>-- What type of pet do you have?--</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Fish">Fish</option>
        <option value="Bird">Bird</option>
        <option value="Rabbit">Rabbit</option>
        <option value="Hamster">Hamster</option>
        <option value="Guinea Pig">Guinea Pig</option>
        <option value="Others">Others</option>
      </select>

      <label>Breed:</label>
      <input class="form-control mb-2" type="text" id="breed" placeholder="What is the breed of your pet?"
        v-model="breed" />

      <label>Age: </label>
      <input class="form-control mb-2" type="number" min="0" max="150" id="age" v-model="age" required />

      <label>Pet Photo:</label>
      <input type="file" @change = 'getPic' class="form-control mb-2" id="profilepicture">

      <label>Pet Description:</label>
      <textarea class="form-control mb-2" rows="4" cols="10" id="bio" placeholder="Describe your pet!"
        v-model="petDesc"></textarea>

    </div>

</Modal>
</template>

<script>
import navbar from "../components/navbar.vue";
import reviewCard from "../components/reviewCard.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import Modal from "../components/Modal.vue";
import { ref as modalref } from "vue";
import petpalsFooter from "../components/petpalsFooter.vue";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

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
const auth = getAuth();

export default {
  name: "profile",

  data() {
    return {
      username: '',
      description: '',
      email: '',
      mobile: '',
      address: '',
      photoURL: '',
      ratings: 0,
      postal: '',
      reviews: [],
      services: [],
      pets: [
        {
          petname: 'Pet Name',
          age: 'age',
          breed: 'breed',
          desc: 'description',
          type: 'type',
          photo: 'https://www.kibrispdr.org/data/84/dog-background-pictures-19.jpg'
        }
      ],
      pic: '',
      noReviews: true,
      invalidAddr: false,

      petName: '',
      breed: '',
      age: 0,
      petDesc: '',
      petType:'default',


    };
  },

  components: {
    navbar,
    reviewCard,
    VueperSlides,
    VueperSlide,
    reviewCard,
    Modal,
    petpalsFooter,
  },

  methods: {
    getProfile() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onValue(ref(db, `users/${user.uid}`), (snapshot) => {
            this.username = snapshot.val().username
            this.photoURL = snapshot.val().profilepic
            this.mobile = snapshot.val().mobile
            this.address = snapshot.val().address
            this.description = snapshot.val().bio
            this.email = user.email
            this.postal = snapshot.val().postalcode
            this.ratings = snapshot.val().ratings

          });
        }
      });
    },

    getPic(event) {
      const files = event.target.files
      if (!files.length) return

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => (this.pic = reader.result)

    },

    updateProfile() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          updateProfile(user, { displayName: this.username })
          set(ref(db, `users/${user.uid}/username`), this.username)
          set(ref(db, `users/${user.uid}/mobile`), this.mobile)
          set(ref(db, `users/${user.uid}/address`), this.address)
          set(ref(db, `users/${user.uid}/bio`), this.description)
          set(ref(db, `users/${user.uid}/postalcode`), this.postal) 

          if (this.pic != '') {
            set(ref(db, `users/${user.uid}/profilepic`), this.pic)
            updateProfile(user, { photoURL: this.pic })
            this.pic = ''
          }

          axios.get("https://maps.googleapis.com/maps/api/geocode/json?", {
              params: {
                  address : this.postal,
                  key: "AIzaSyAk7Dq17v0SWL983LCrYA_nXdA5fjitXxw"
                  }
          })
          .then(response => {
              if (response.data.results.length > 0){
                  this.invalidAddr = false
                  var lat = response.data.results[0].geometry.location.lat
                  var lng = response.data.results[0].geometry.location.lng
                  set(ref(db, `users/${user.uid}/coords`), {'lat': lat, 'lng': lng}) 

                  for (let i=0; i<response.data.results[0].address_components.length; i++){
                      let each = response.data.results[0].address_components[i]
                      if (each.types.includes('neighborhood')){
                          set(ref(db, `users/${user.uid}/region`), each.long_name) 
                      }
                  }
                  window.location.href = `/petownerprofile`;

              } else {
                  this.invalidAddr = true
              }
              
          })
          .catch( error => {

              console.log(error.message)
              this.invalidAddr = true

          })
        }
      });

    },

    getPets() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onValue(ref(db, `users/${user.uid}/pets`), (snapshot) => {
            for (let pet in snapshot.val()) {
              var obj = {};
              obj['petname'] = pet
              obj['age'] = snapshot.val()[pet].age
              obj['type'] = snapshot.val()[pet].type
              obj['breed'] = snapshot.val()[pet].breed
              obj['photo'] = snapshot.val()[pet].photo
              obj['desc'] = snapshot.val()[pet].desc

              this.pets.push(obj)
            }
          });
        }
      });
    },

    addPet() {
      if (this.petName == '' || this.age == 0 || this.petType == 'default') {
        console.log('error')
      } else {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            set(ref(db, `users/${user.uid}/pets/${this.petName}/age`), this.age)
            set(ref(db, `users/${user.uid}/pets/${this.petName}/breed`), this.breed) 
            set(ref(db, `users/${user.uid}/pets/${this.petName}/desc`), this.petDesc) 
            set(ref(db, `users/${user.uid}/pets/${this.petName}/type`), this.petType) 
            
            if (this.pic != ''){
              set(ref(db, `users/${user.uid}/pets/${this.petName}/photo`), this.pic) 
              this.pic = ''
            } else {
              set(ref(db, `users/${user.uid}/pets/${this.petName}/photo`), 'https://www.kibrispdr.org/data/84/dog-background-pictures-19.jpg')
            }

            this.age = 0
            this.petName = ''
            this.petType = 'default'

            window.location.href = `/petownerprofile`;
          }
        });
      }

    },

    getReviews() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onValue(ref(db, `users/${user.uid}/reviews`), (snapshot) => {
            var lst = snapshot.val();
            for (let otherid in lst) {
              onValue(ref(db, `users/${otherid}/username`), (snapsht) => {
                onValue(ref(db, `users/${user.uid}/reviews/${otherid}`), (snapst) => {
                  for (let serv in snapst.val()) {
                    var obj = {};
                    obj['username'] = snapsht.val();
                    obj['service'] = serv;
                    obj['review'] = snapst.val()[serv].review
                    obj['rating'] = snapst.val()[serv].rating
                    this.reviews.push(obj)
                    this.noReviews = false
                  }

                });
              });
            }
          });
        }
      });
    },

  },

  mounted() {
    this.getProfile()
    this.getReviews()
    this.getPets()
  },

  setup() {
    const modalActive = modalref(false);
    const modalActive2 = modalref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    const toggleModal2 = () => {
      modalActive2.value = !modalActive2.value;
    };
    return { modalActive, toggleModal, modalActive2, toggleModal2 };
  },
};
</script>


