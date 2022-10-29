<template>
  <div class="container-fluid profile-page">
    <navbar></navbar>
    <!--Left column-->
    <div class="row">
      <div class="col-4 profile-leftbox">
        <div class="row">
          <div class="d-flex justify-content-end">
            <button @click="toggleModal" class="btn btn-go btn-sm">
              <i class="bi bi-pencil-square"></i>
            </button>
          </div>

          <div class="row-image">
            <img src="../img/sitter.png" class="rounded rounded-circle" />
          </div>

          <div class="row">
            <h2 class="mt-3">
              Hello <div class="username">{{ username }}</div>
            </h2>
            <small class="mt-2">Pet Service Provider
            <img
            src="../img/animallogo/pawiconwhite.png"
            style="width: auto; height: auto"
          /></small>
          </div>
          <br>
          <hr />

          <div class="row mt-4">
            <div class="bio">
              <h4 class="mb-3">Bio</h4>
              <p>{{ message }}</p>
            </div>

            <div class="email mt-3">
              <h4 class="mb-3">Email</h4>
              <p>{{ email }}</p>
            </div>

            <div class="number mt-3">
              <h4 class= "mb-3">Number</h4>
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
      <div class="col-8 profile-rightbox">
        <div class="row mt-3">
          <h3 class="mb-3">
            <img
            src="../img/animallogo/doglogo3.png"
            style="width: auto; height: auto"
          />Pet Gallery</h3>
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

        <!-- <div class="row">
          <img
            src="../img/animallogo/doglogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/catlogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/rabbitlogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/guineapiglogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/birdlogo2.png"
            style="width: 60px; height: 40px"
          /><img
            src="../img/animallogo/doglogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/catlogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/rabbitlogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/guineapiglogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/birdlogo2.png"
            style="width: 60px; height: 40px"
          /><img
            src="../img/animallogo/doglogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/catlogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/rabbitlogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/guineapiglogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/birdlogo2.png"
            style="width: 60px; height: 40px"
          /><img
            src="../img/animallogo/doglogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;<img
            src="../img/animallogo/catlogo2.png"
            style="width: 60px; height: 40px"
          />&nbsp;
        </div> -->
          

        <TabNav
            :tabs="['My Bookings', 'My Services', 'My Reviews']"
            :selected="selected"
            @selected="setSelected"
          >
            <Tab :isSelected="selected === 'My Bookings'">
              <p>Shows a list of the bookings made by this user</p>
            </Tab>
            <Tab :isSelected="selected === 'My Services'">
              <p>Shows a list of the services offered by this user</p>
            </Tab>
            <Tab :isSelected="selected === 'My Reviews'">
              <p>Shows a list of reviews left for this user</p>
              <Post v-for="(user, i) in user_list" :key="i" :user="user" />
            </Tab>
          </TabNav>
        </div>
      </div>
    </div>
  <petpalsFooter></petpalsFooter>

  <!--Edit Profile page-->
  <Modal @close="toggleModal" :modalActive="modalActive">
    <div class="modal-content">
      <br />

      Username: <input type="text" id="username" v-model="username" style="border-radius: 5px;"/>
      <br />

      Bio: <textarea rows="4" cols="10" id="bio" v-model="message" style="border-radius: 5px;"></textarea>
      <br />

      Email: <input type="text" id="email" v-model="email" style="border-radius: 5px;"/>
      <br />

      Number: <input type="text" id="number" v-model="number" style="border-radius: 5px;"/>
      <br />

      Address: <textarea rows="4" cols="10" id="address" v-model="address" style="border-radius: 5px;"></textarea>
      <br />
    </div>
  </Modal>
</template>

<script>
import navbar from "../components/navbar.vue";

import TabNav from "../components/TabNav.vue";
import Tab from "../components/Tab.vue";

import reviewCard from "../components/reviewCard.vue";

import { VueperSlides, VueperSlide } from "vueperslides";

import Modal from "../components/Modal.vue";
import { ref as modalref } from "vue";

import petpalsFooter from "../components/petpalsFooter.vue";

export default {
  name: "profile",
  components: {
    navbar,
    TabNav,
    Tab,
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
      message: "lorem ipsum dolor sit amet, consectetur",

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

      // Reviews list
      user_list: [],

      tabList: ["Tab 1", "Tab 2", "Tab 3", "Tab 4"],
    };
  },

  methods: {
    // Changing tabs
    setSelected(tab) {
      this.selected = tab;
    },

    // Edit bio
    changeMessage(message) {
      this.message = message;
    },

    // Reviews list
    getuser() {
      //replace this with api
      const user_titles = ["Review 1", "Review 2", "Review 3", "Review 4"];
      const user = [];
      for (let i = 0; i < 4; i++) {
        user.push({
          title: user_titles[i],
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu",
        });
      }
      return user;
    },

    // Reviews list scrolling
    handleScroll() {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 300
      ) {
        const new_user = this.getuser();
        this.user_list = [...this.user_list, ...new_user];
      }
    },
  },
  mounted() {
    // Reviews list scrolling
    this.user_list = this.getuser();
    window.addEventListener("scroll", this.handleScroll);
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
}

.profile-leftbox {
  margin-top: 80px;
  border-radius: 50px;
  background-color: white;
}

.profile-rightbox {
  margin-top: 80px;
  border-radius: 50px;
  background-color: white;
}

.row {
  text-align: center;
}
.row-image {
  text-align: center;
}

// Tab
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
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
