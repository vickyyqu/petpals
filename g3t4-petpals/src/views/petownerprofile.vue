<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.profile-page {
  margin: 0;
  // padding-top:50px;
  align-items: center;
  justify-content: center;
  background-color: #fffbfa;
  padding-top: 80px;
}

.profile-leftbox {
  border-radius: 50px;
  background-color: #fddcd74d;
  box-shadow: 0 0 10px 0 #cec2c233;
}

.profile-rightbox {
  border-radius: 50px;
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
  <div class="container-fluid profile-page">
    <navbar></navbar>
    <!--Left column-->
    <div class="row p-3">
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

          <div class="row">
            <h2 class="mt-3" style="letter-spacing: 2px;">
              Hello
            </h2>
            <h3 class="username" style="color: #F8AA9D;">{{ username }}</h3>
            <small class="mt-4">Pet Owner
              <img
                src="../img/animallogo/pawicon.png"
                style="width: auto; height: auto"
            /></small>
          </div>
          <br />
          <hr />

          <div class="row mt-4">
            <div class="bio">
              <h4 class="mb-3">Bio</h4>
              <p
                style="
                  white-space: pre-line;
                  padding-left: 60px;
                  padding-right: 60px;
                "
              >
                {{ description }}
              </p>
            </div>

            <div class="email mt-3">
              <h4 class="mb-3">Email</h4>
              <p>{{ email }}</p>
            </div>

            <div class="number mt-3">
              <h4 class="mb-3">Mobile Number</h4>
              <p>{{ mobile }}</p>
            </div>

            <div class="address mt-3">
              <h4 class="mb-3">Address</h4>
              <p style="white-space: pre-line">{{ address }}</p>
            </div>
          </div>
        </div>

        <br />
      </div>

      <!--Right column-->
      <div class="col-md-8 profile-rightbox p-3">
        <div class="row mt-3">
          <span>
            <button class="btn btn-select mt-3 me-2 float-end" @click="toggleModal2"><i class="bi bi-pencil-square"></i></button>
          </span>
          <h3 class="mb-3">
            <img
              src="../img/animallogo/doglogo3.png"
              style="width: auto; height: auto"
            />My Pets
          </h3>
          
          <vueper-slides>
            <!-- <vueper-slide
              v-for="(slide, i) in slides"
              :key="i"
              :title="slide.title"
              :content="slide.content"
            >
            </vueper-slide> -->
            <vueper-slide
              v-for="(pet, i) in pets"
              :key="i"
              :title="pet.petname"
              :content="pet.content"
            >
            </vueper-slide>
          </vueper-slides>
        </div>

        <div class="row mt-3">
          <div
            style="background-color: #fddcd74d;
              padding: 14px 50px;
              margin-left: 1px;
            "
          >
            <h3>My Reviews</h3>
          </div>
          <div class="row" style="padding: 15px 20px">
            <reviewCard v-for="rev in reviews" :reviewer="rev.username" :service = 'rev.service' :review="rev.review" :rating="rev.rating"></reviewCard>
          </div>
        </div>
      </div>
    </div>
  </div>

  <petpalsFooter></petpalsFooter>

  <!--Edit Profile page-->
  <Modal @close="toggleModal2(); updateService()" :modalActive="modalActive">
    <div class="modal-content p-3">
      <h4 class="pb-4">Edit My Details:</h4>

      <label>Username:</label>
      <input class="form-control mb-2"
        type="text"
        id="username"
        v-model="username"
      />

      <label>Profile Picture:</label>
      <input type="file" @change = 'getPic' class="form-control mb-2" id="profilepicture">

      <label>Description:</label>
      <textarea class="form-control mb-2"
        rows="4"
        cols="10"
        id="bio"
        v-model="description"
      ></textarea>

      <label>Phone Number:</label>
      <input class="form-control mb-2"
        type="text"
        id="number"
        v-model="mobile"
      />
      <label>Address:</label>
      <textarea class="form-control mb-2"
        rows="4"
        cols="10"
        id="address"
        v-model="address"
      ></textarea>
    </div>
  </Modal>

  <Modal @close="toggleModal2(); addPet()" :modalActive="modalActive2">
    <div class="modal-content p-3">
      <h4 class="pb-4">Add a Pet:</h4>

      <label>Pet Name:</label>
      <input class="form-control mb-2"
        type="text"
        id="petName"
        placeholder="What is the name of your pet?"
        v-model="petName"
        required
      />

      <label>Breed:</label>
      <input class="form-control mb-2"
        type="text"
        id="breed"
        placeholder="What is the breed of your pet?"
        v-model="breed"
      />

      <label>Age: </label>
      <input class="form-control mb-2"
        type="number"
        min="0"
        max="150"
        id="age"
        v-model="age" 
        required
      />

      <label>Pet Description:</label>
      <textarea class="form-control mb-2"
        rows="4"
        cols="10"
        id="bio"
        placeholder="Describe your pet!"
        v-model="petDesc"
      ></textarea>
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
import { getDatabase, ref, set, get, onValue} from "firebase/database";

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
  components: {
    navbar,
    reviewCard,
    VueperSlides,
    VueperSlide,
    reviewCard,
    Modal,
    petpalsFooter,
  },
  data() {
    return {
      username: '',
      description: '',
      email: '',
      mobile: '',
      address: '',
      photoURL: '',
      reviews: [],
      services: [],
      pets: [{petname: 'coral',content:'some words'}],
      pic: '',

      petName: '',
      breed: '',
      age: 0,
      petDesc: '',
      petPhoto: '',


      slides: [
        {
          petname: "Petname1",
          content: "Image of pet1,age,breed,description",
        },
        {
          petname: "Petname2",
          content: "Image of pet1,age,breed,description",
        },
      ],

    };
  },

  methods: {
    getProfile(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onValue(ref(db, `users/${user.uid}`), (snapshot) => {
              this.username = snapshot.val().username
              this.photoURL = snapshot.val().profilepic 
              this.mobile = snapshot.val().mobile
              this.address = snapshot.val().address
              this.description = snapshot.val().bio
              this.email = user.email
              
          }); 
        }
      });
    },

    getPic(event){
        const files = event.target.files
        if (!files.length) return 

        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = () => (this.pic = reader.result)

        // console.log(this.pic)
    },

    updateProfile(){
      console.log('bye')
      onAuthStateChanged(auth, (user) => {
        if (user) {
          updateProfile(user, { displayName: this.username })
          set(ref(db, `users/${user.uid}/username`), this.username) 
          set(ref(db, `users/${user.uid}/mobile`), this.mobile) 
          set(ref(db, `users/${user.uid}/address`), this.address) 
          set(ref(db, `users/${user.uid}/bio`), this.description) 

          if (this.pic != ''){
            set(ref(db, `users/${user.uid}/profilepic`), this.pic) 
            updateProfile(user, { photoURL: this.pic })
            this.pic = ''
          }

          window.location.href = `/petownerprofile`;
        }
      }); 

    },

    getPets(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onValue(ref(db, `users/${user.uid}/pets`), (snapshot) => {
            for (let pet in snapshot.val()){
              var obj = {};
              obj['petname'] = pet
              obj['content'] = ''

              this.pets.push(obj)
            }
          }); 
        }
      });
    },

    addPet(){
      if (this.petName == '' || this.age == 0){
        console.log('error')
      }else{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            set(ref(db, `users/${user.uid}/pets/${this.petName}/age`), this.age)
            set(ref(db, `users/${user.uid}/pets/${this.petName}/breed`), this.breed) 
            set(ref(db, `users/${user.uid}/pets/${this.petName}/desc`), this.petDesc) 
            
            if (this.pic != ''){
              set(ref(db, `users/${user.uid}/pets/${this.petName}/photo`), this.petPhoto) 
              this.pic = ''
            }else{
              set(ref(db, `users/${user.uid}/pets/${this.petName}/photo`), 'https://cdn-icons-png.flaticon.com/512/884/884183.png') 
            }

            this.age = 0
            this.petName = ''

            window.location.href = `/petownerprofile`;
          }
        });         
      }

    },

    getReviews(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onValue(ref(db, `users/${user.uid}/reviews`), (snapshot) => {
            var lst = snapshot.val();
            for (let otherid in lst){
              onValue(ref(db, `users/${otherid}/username`), (snapsht) => {
                onValue(ref(db, `users/${user.uid}/reviews/${otherid}`), (snapst) => {
                  for (let serv in snapst.val()){
                    var obj = {};
                    obj['username'] = snapsht.val();
                    obj['service'] = serv;
                    obj['review'] = snapst.val()[serv].review
                    obj['rating'] = snapst.val()[serv].rating
                    this.reviews.push(obj)
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


