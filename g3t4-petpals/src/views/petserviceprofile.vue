<template>
  <div class="container-fluid profile-page">
    <navbar></navbar>
    
    <div class="row p-3">

      <!--Left column-->
      <div class="col-md-4 profile-leftbox">
        <div class="row">
          <div class="d-flex justify-content-end">
            <button @click="toggleModal" class="btn btn-select me-2 mt-3">
              <i class="bi bi-pencil-square"></i>
              </button>
          </div>

          <div class="row-image">
            <img src="../img/sitter.png" class="rounded rounded-circle" />
          </div>

          <div class="row">
            <h2 class="mt-3">
              Hello
              <div class="username">{{ username }}</div>
            </h2>
            <small class="mt-2"
              >Pet Service Provider
              <img
                src="../img/animallogo/pawiconwhite.png"
                style="width: auto; height: auto"
            /></small>
          </div>
          <br />
          <hr />

          <div class="row mt-4">
            <div class="bio">
              <h4 class="mb-3">Bio</h4>
              <p style="
                  white-space: pre-line;
                  padding-left: 60px;
                  padding-right: 60px;
                ">{{ message }}</p>
            </div>

            <div class="email mt-3">
              <h4 class="mb-3">Email</h4>
              <p>{{ email }}</p>
            </div>

            <div class="number mt-3">
              <h4 class="mb-3">Number</h4>
              <p>{{ number }}</p>
            </div>

            <div class="address mt-3">
              <h4 class="mb-3">Address</h4>
              <p>{{ address }}</p>
            </div>
          </div>
        </div>

        <br />
      </div>
      
      <!--Right column-->
      <div class="col-md-8 profile-rightbox">
        <div class="row mt-3">
          <h3 class="mb-3">
            <img
              src="../img/animallogo/doglogo3.png"
              style="width: auto; height: auto"
            />Pet Gallery
          </h3>
          <br />
          <vueper-slides>
            <vueper-slide
              v-for="(slide, i) in slides"
              :key="i"
              :title="slide.title"
              :content="slide.content"
            >
            </vueper-slide>
          </vueper-slides>
        </div>

        <div class="row mt-3">
              <!-- Tab links -->
              <div class="tab">
                        <h3>
                          <button class="tablinks" @click="openTab(event, 'Services')">My Services</button>
                          <button class="tablinks" @click="openTab(event, 'Reviews')">My Reviews</button>
                        </h3>

                    </div>
                    
                <!-- Tab content -->
                <div id="Services" class="tabcontent">
                    <h3>Here are the services you provide</h3>
                    <p>Shows list of services you provide</p>
                </div>
                
                <div id="Reviews" class="tabcontent">
                  <div class="row">
                    <reviewCard v-for="n in 10"></reviewCard>
                  </div>
                </div>
                
            </div>
      </div>
    </div>
  </div>
  <petpalsFooter></petpalsFooter>

  <!--Edit Profile page-->
  <Modal @close="toggleModal" :modalActive="modalActive">
    <div class="modal-content p-3">
      <h4 class="pb-4">Edit My Details:</h4>

      <label>Username:</label>
      <input class="form-control mb-2"
        type="text"
        id="username"
        v-model="username"
      />

      <label>Description:</label>
      <textarea class="form-control mb-2"
        rows="4"
        cols="10"
        id="bio"
        v-model="message"
      ></textarea>

      <label>Phone Number:</label>
      <input class="form-control mb-2"
        type="text"
        id="number"
        v-model="number"
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
</template>

<script>
import navbar from "../components/navbar.vue";

import reviewCard from "../components/reviewCard.vue";

import { VueperSlides, VueperSlide } from "vueperslides";

import Modal from "../components/Modal.vue";
import { ref as modalref } from "vue";

import petpalsFooter from "@/components/petpalsFooter.vue";

export default {
  name: "profile",
  components: {
    navbar,
    reviewCard,
    VueperSlides,
    VueperSlide,
    Modal,
    petpalsFooter,
  },
  data() {
    return {
      // Current Username
      username: "My username",

      // Current bio
      message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, dignissimos doloribus perferendis qui accusamus reprehenderit laudantium. Praesentium natus quo placeat iure dicta et quod sapiente. A sapiente id sed. Pariatur?",

      // Current email
      email: "blabla@gmail.com",

      // Current contact
      number: "999",

      address: "insert address",

      // My pets info
      slides: [
        {
          petname: "Petname1",
          content: ["Image of pet1", "age", "breed", "description"],
        },
        {
          petname: "Petname2",
          content: ["Image of pet2", "age", "breed", "description"],
        },
      ],

    };
  },

  methods: {

    // Edit bio
    changeMessage(message) {
      this.message = message;
    },

    // Tab
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
        }
  },

  setup() {
    const modalActive = modalref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    return { modalActive, toggleModal };
  },
};
</script>

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
