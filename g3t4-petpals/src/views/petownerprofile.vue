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
            <img src="../img/sitter.png" class="rounded rounded-circle" />
          </div>

          <div class="row">
            <h2 class="mt-3" style="letter-spacing: 2px;">
              Hello,
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
                {{ message }}
              </p>
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
              <p style="white-space: pre-line">{{ address }}</p>
            </div>
          </div>
        </div>

        <br />
      </div>

      <!--Right column-->
      <div class="col-md-8 profile-rightbox p-3">
        <div class="row mt-3">
          <h3 class="mb-3">
            <img
              src="../img/animallogo/doglogo3.png"
              style="width: auto; height: auto"
            />My Pets
          </h3>
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
          <div
            style="
              background-color: #fddcd74d;
              padding: 14px 50px;
              margin-left: 1px;
            "
          >
            <h3>My Reviews</h3>
          </div>
          <div class="row" style="padding: 15px 20px">
            <reviewCard v-for="n in 10"></reviewCard>
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

import petpalsFooter from "../components/petpalsFooter.vue";

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
      // Current Username
      username: "my username",

      // Current bio
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, dignissimos doloribus perferendis qui accusamus reprehenderit laudantium. Praesentium natus quo placeat iure dicta et quod sapiente. A sapiente id sed. Pariatur?",

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
    };
  },

  methods: {
    // Edit bio
    changeMessage(message) {
      this.message = message;
    },
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
</style>
