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

/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid white;
  background-color: #fddcd74d;
  font-family: 'Alata', Helvetica, Arial, sans-serif;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  text-align: center;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 50px;
  transition: 0.3s;
  color: #9C796A;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #F8AA9D;
  color: white;
}

/* Create an active/current tablink class */
.tab button .active {
  background-color: #F8AA9D;
  color: white;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 13px 15px;
  border: 1px solid white;
  border-top: none;
}
</style>

<template>
<div class="container-fluid profile-page pb-5">
  <navbarProvider></navbarProvider>
  <div class="row p-4">

    <!--Left column-->
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
          <p class="my-4" style="font-style:italic">Pet Service Provider</p>
        </div>

        <hr class="w-75">

        <div class="row my-4 px-4 text-start">

            <h4>Bio</h4>
            <p class="mb-3 mt-1">{{ description }}</p>

            <h4>Ratings</h4>
              <div class="ratings mb-3 mt-1">
                      <i v-for="n in parseInt(ratings)" class="bi bi-star-fill"></i>
                      <i v-if='!Number.isInteger(ratings)' class="bi bi-star-half"></i>
                      <i v-for='m in parseInt(5-ratings)' class="bi bi-star"></i>
              </div>
      

            <h4>Years of Experience</h4>
            <p class="mb-3 mt-1">{{yrsOfExp}} years</p>
      
            <h4>Email</h4>
            <p class="mb-3 mt-1">{{ email }}</p>

            <h4>Mobile Number</h4>
            <p class="mb-3 mt-1">{{ mobile }}</p>
      
            <h4>Address</h4>
            <p class="mb-3 mt-1">{{ address }}</p>

        </div>
      </div>

      <br />
    </div>
    
    <!--Right column-->
    <div class="col-md-8 profile-rightbox">
      <div class="row mt-5">
            <!-- Tab links -->
            <div class="tab">
                <h3>
                  <button class="tablinks" @click="openTab(event, 'Services')">My Services</button>
                  <button class="tablinks" @click="openTab(event, 'Reviews')">My Reviews</button>
                </h3>

                  
              <!-- Tab content -->
              <div id="Services" class="tabcontent active" style="display:block">
                <div class = 'd-flex flex-wrap justify-content-around'>
                  <serviceCard v-for="serv of services" :service="Object.keys(serv)[0]" v-on:edit='toggleModal2(); service=Object.keys(serv)[0]; price=serv[Object.keys(serv)[0]].price; serviceDesc=serv[Object.keys(serv)[0]].desc' :price="serv[Object.keys(serv)[0]].price" :desc="serv[Object.keys(serv)[0]].desc"></serviceCard>
                </div>

                <div v-if="noServices" class="my-5">
                  <h4>No services to show yet...</h4>
                </div>
                  
              </div>
              
              <div id="Reviews" class="tabcontent">
                <div class="row p-3">
                  <reviewCard v-for="rev in reviews" :reviewer="rev.username" :service = 'rev.service' :review="rev.review" :rating="rev.rating"></reviewCard>
                </div>

                <div v-if="noReviews" class="my-5">
                  <h4>No reviews to show yet...</h4>
                </div>
              </div>
              
          </div>
    </div>

    <br />
    </div>


</div>
</div>
<petpalsFooter></petpalsFooter>

<!--Edit Profile page-->
<Modal @close="toggleModal(); updateProfile()" :modalActive="modalActive">
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

    <label>Years of Experience:</label>
    <input class="form-control mb-2"
      type="text"
      id="number"
      v-model="yrsOfExp"
    />

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

    <label>Postal Code:</label>
    <input class="form-control mb-2"
      type="text"
      id="postal"
      v-model="postal"
    />
  </div>
</Modal>

<!--Edit Services page-->
<Modal @close="toggleModal2(); updateService()" :modalActive="modalActive2">
  <div class="modal-content p-3">
    <h4 class="pb-4">Edit My Service:</h4>

    <label>Price: </label>
    <input class="form-control mb-2"
      type="number"
      min="0"
      max="1000"
      id="price"
      v-model="price"
    />

    <label>Service Description:</label>
    <textarea class="form-control mb-2"
      rows="4"
      cols="10"
      id="bio"
      placeholder="Describe your service!"
      v-model="serviceDesc"
    ></textarea>

    <button class="btn btn-cancel p-2 w-50 mx-auto" @click="deleteService">Delete Service</button>
  </div>
</Modal>
</template>

<script>
import navbarProvider from "../components/navbarProvider.vue";
import reviewCard from "../components/reviewCard.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import Modal from "../components/Modal.vue";
import { ref as modalref } from "vue";
import petpalsFooter from "@/components/petpalsFooter.vue";
import serviceCard from '../components/serviceCard.vue';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, onValue, get} from "firebase/database";

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
      reviews: [],
      services: [],
      pic: '',
      ratings: 0,
      postal: '',
      yrsOfExp: 0,

      price: 0,
      serviceDesc: '',
      service: '',

      noServices: true,
      noReviews: true,
      invalidAddr: false,

    };
  },

  components: {
    navbarProvider,
    reviewCard,
    serviceCard,
    VueperSlides,
    VueperSlide,
    Modal,
    petpalsFooter,
  },

  methods: {
    openTab(evt, feature) {
            // Declare all variables
            var i, tabcontent, tablinks;

            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }

            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(feature).style.display = "block";
            evt.currentTarget.className += " active";
    },

    getPic(event){
        const files = event.target.files
        if (!files.length) return 

        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = () => (this.pic = reader.result)

    },

    getProfile(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onValue(ref(db, `users/${user.uid}`), (snapshot) => {
              this.username = snapshot.val().username
              this.photoURL = snapshot.val().profilepic 
              this.mobile = snapshot.val().mobile
              this.address = snapshot.val().address
              this.description = snapshot.val().desc
              this.email = user.email
              this.ratings = snapshot.val().ratings
              this.postal = snapshot.val().postalcode
              this.yrsOfExp = snapshot.val().yrsOfExp
          }); 
        }
      });
    },

    updateProfile(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          updateProfile(user, { displayName: this.username })
          set(ref(db, `users/${user.uid}/username`), this.username) 
          set(ref(db, `users/${user.uid}/mobile`), this.mobile) 
          set(ref(db, `users/${user.uid}/address`), this.address) 
          set(ref(db, `users/${user.uid}/desc`), this.description) 
          set(ref(db, `users/${user.uid}/yrsOfExp`), this.yrsOfExp) 
          set(ref(db, `users/${user.uid}/postalcode`), this.postal) 

          if (this.pic != ''){
            set(ref(db, `users/${user.uid}/profilepic`), this.pic) 
            updateProfile(user, { photoURL: this.pic })
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
                  window.location.href = `/petserviceprofile`;

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

    updateService(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          set(ref(db, `users/${user.uid}/services/${this.service}/price`), this.price) 
          set(ref(db, `users/${user.uid}/services/${this.service}/desc`), this.serviceDesc) 
          set(ref(db, `services/${this.service}/${user.uid}/price`), this.price) 
          set(ref(db, `services/${this.service}/${user.uid}/desc`), this.serviceDesc) 
          window.location.href = `/petserviceprofile`;
        }
      }); 
    },

    getServices(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onValue(ref(db, `users/${user.uid}/services`), (snapshot) => {
            for (let serv in snapshot.val()){
              var obj = {}
              obj[serv] = {}
              obj[serv].price = snapshot.val()[serv].price
              obj[serv].desc = snapshot.val()[serv].desc

              if (snapshot.val()[serv].price != ''){
                this.services.push(obj)
                this.noServices = false
              }
              
            }
          }); 
        }
      });
    },

    deleteService(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          set(ref(db, `users/${user.uid}/services/${this.service}/price`), '') 
          set(ref(db, `users/${user.uid}/services/${this.service}/desc`), '') 
          set(ref(db, `services/${this.service}/${user.uid}/price`), '') 
          set(ref(db, `services/${this.service}/${user.uid}/desc`), '') 

          onValue(ref(db, `users/${user.uid}/bookings`), (snapshot) => {
            for (let oid in snapshot.val()){
              get(ref(db, `users/${user.uid}/bookings/${oid}/${this.service}`)).then((snapsht) => {
                if (snapsht.exists()) {
                  set(ref(db, `users/${user.uid}/bookings/${oid}/${this.service}/price`), '') 
                  set(ref(db, `users/${user.uid}/bookings/${oid}/${this.service}/status`), 'deleted') 
                  set(ref(db, `users/${oid}/bookings/${user.uid}/${this.service}/price`), '') 
                  set(ref(db, `users/${oid}/bookings/${user.uid}/${this.service}/status`), 'deleted') 
                }
              })
            }
          }); 
          window.location.href = `/petserviceprofile`;
        }
      }); 
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

  mounted(){
    this.getProfile()
    this.getReviews()
    this.getServices()
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


