<template>
    
    <div class="container-fluid profile-page">
        <navbar></navbar>
        <div class="profile-container">
            
            <!--Left column-->
            <div class="profile-info">
                <div class="container">
                    <button @click="toggleModal" class="btn btn-go"><i class="bi bi-pencil-square"></i></button><div class="row-image "> 
                        <img v-bind:src="photo" class="rounded rounded-circle">
                    </div>

                    <br>

                    <div class="row">
                        <h2>Hello <div class="username">{{username}}</div></h2>  
                        <hr>
                        <p>{{type}}</p>         
                    </div>    

                    <br>

                    <div class="row">
                        <div class="bio" v-if = 'type == "Pet Service Provider"'>
                            <h4>Bio</h4>
                            <p class="bio-message">{{bio}}</p>
                            
                        </div>
                    </div>
                </div>

                <br>

                <div class="row">
                    <h4>My Pets</h4>
                    <br>
                    <vueper-slides style="height:150px;">
                        <vueper-slide 
                            v-for="(slide, i) in slides"
                            :key="i"
                            :title="slide.title"
                            :content="slide.content">
                        </vueper-slide>
                    </vueper-slides>
                    </div>
                </div>

            <!--Right column-->
            <div class="profile-about">
                <img src="../img/animallogo/doglogo2.png">&nbsp;<img src="../img/animallogo/catlogo2.png">&nbsp;<img src="../img/animallogo/rabbitlogo2.png">&nbsp;<img src="../img/animallogo/guineapiglogo2.png">&nbsp;<img src="../img/animallogo/birdlogo2.png">
                
                <div id="app">
                    <TabNav :tabs="['My Bookings', 'My Services', 'My Reviews']" :selected="selected" @selected="setSelected">  
                        <Tab :isSelected="selected === 'My Bookings'" >
                            <p>Shows a list of the bookings made by this user</p>  
                            <!-- temporary -->
                            <p v-for="item in bookings">{{item.other}} ( {{item.service}} ) : {{item.status}}</p> 
                        </Tab>
                        <Tab :isSelected="selected === 'My Services'" >
                            <p>Shows a list of the services offered by this user</p>  
                            <!-- temporary -->
                            <p v-for="service in services">{{service.service}} : {{service.price}}/hr </p>
                        </Tab>
                        <Tab :isSelected="selected === 'My Reviews'" >
                            <p>Shows a list of reviews left for this user</p>               
                            <Post v-for="(user, i) in user_list" :key="i" :user="user" />
                            <!-- <Post v-for="review in reviews" :reviewer = 'review.reviewer' :service = 'review.service' :review = 'review.review'/> -->
                        </Tab>
                    </TabNav>
                </div>
            </div>
        </div>
        
    </div>

    <!--Edit Profile page-->
    <Modal @close="toggleModal" :modalActive="modalActive">
        <div class="modal-content">
            <br>

            Username: <input type="text" id="username" v-bind:value ="username">
            <br>

            Bio: <textarea rows="4" cols="10" id="bio" v-bind:value="bio"></textarea> 
            <br>
       
            <div class="form-group">
                <label class="" for="petowner">
                <input type="checkbox" name="checkboxes" id="petowner" value="Pet Owner" >
                Pet Owner &nbsp;
                </label>

                <label class="" for="petserviceprovider">
                <input type="checkbox" name="checkboxes" id="petserviceprovider" value="Pet Service Provider">
                Pet Service Provider
                </label>
            </div>       
        </div>          
    </Modal>

    <petpalsFooter></petpalsFooter>
</template>
  
<script>
    import navbar from '../components/navbar.vue'
    import TabNav from '../components/TabNav.vue';
    import Tab from '../components/Tab.vue';
    import { VueperSlides, VueperSlide } from 'vueperslides'
    import Post from "../components/Post.vue";
    import Modal from '../components/Modal.vue'
    import { ref } from "vue";
    import petpalsFooter from "../components/petpalsFooter.vue"
    import { initializeApp } from "firebase/app";
    // import { getDatabase, ref, onValue, set, push} from "firebase/database";
    import { getAuth, onAuthStateChanged} from "firebase/auth";

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
    // const db = getDatabase(app);
    const auth = getAuth();


    export default {
        name: "profile",
        components: {
            navbar, TabNav, Tab, VueperSlides, VueperSlide, Post, Modal, petpalsFooter
        },
        data() {
            return {

                username: '',
                selected: 'My Bookings',
                photo: '',
                bio : '',
                type : '',
                bookings : [],
                services : [],
                reviews  : [],
                pets : [],


                // My pets info
                slides: [
                    {
                        petname: 'Petname1',
                        content: ['Image of pet1', 
                        'age', 
                        'breed',
                        'description']
                    },
                    {
                        petname: 'Petname2',
                        content: ['Image of pet2', 
                        'age',
                        'breed',
                        'description']
                    }
                ],

                // Reviews list
                user_list: [],
            }
        },

        methods: {
            // Changing tabs
            setSelected(tab) {
                this.selected = tab;
            },

            // Edit bio
            changeMessage(message) {
                this.message = message
            },

            // Reviews list
            getuser() {  //replace this with api
                const user_titles = [
                    "Review 1",
                    "Review 2",
                    "Review 3",
                    "Review 4",
			    ];
                const user = [];
			    for (let i = 0; i < 4; i++) {
                    user.push({
                        title: user_titles[
                            i
                        ],
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu"
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

            getProfile(){
                onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.username = user.displayName
                    this.photo = user.photoURL 
                    onValue(ref(db, `users/${user.uid}`), (snapshot) => {
                        this.bio = snapshot.val().desc
                        this.type = snapshot.val().type
                    });
                }
                });    
                
            },

            getBookings(){
                onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}/bookings`), (snapshot) => {
                        for (let key in snapshot.val()){
                            var obj = {bid: key, status: snapshot.val()[key]}
                            
                            onValue(ref(db, `bookings/${key}`), (snapsht) => {
                                console.log(snapsht.val()['service provided'])
                                obj['service'] = snapsht.val()['service provided']
                                if (this.type == 'Pet Owner'){
                                    obj['otherid'] = snapsht.val()['pet service provider']
                                }else{
                                    obj['otherid'] = snapsht.val()['pet owner']
                                }

                            onValue(ref(db, `users/${obj.otherid}`), (snapsht) => {
                                console.log(snapsht.val().username)
                                obj['other'] = snapsht.val().username
                            });                                
                                
                            });


                            this.bookings.push(obj)
                        }
                    });
                }
                });  
            },

            getServices(){
                onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}/services`), (snapshot) => {
                        // console.log(snapshot.val())
                        for (let item in snapshot.val()){
                            this.services.push({service: item, price: snapshot.val()[item]})
                        }
                    });
                }
                });  
            },

            getReviews(){
                onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}/reviews`), (snapshot) => {
                        for (let key in snapshot.val()){
                            var obj = {bid : key, otherid : snapshot.val()[key].otherid, review : snapshot.val()[key].review}

                            onValue(ref(db, `users/${obj.otherid}`), (snapsht) => {
                                console.log(snapsht.val().username)
                                obj['reviewer'] = snapsht.val().username
                            });

                            onValue(ref(db, `bookings/${key}`), (snapsht) => {
                                console.log(snapsht.val()['service provided'])
                                obj['service'] = snapsht.val()['service provided']
                            });


                            this.reviews.push(obj)
                        }
                    });
                }
                });  
            },

            getPets(){
                onAuthStateChanged(auth, (user) => {
                if (user) {
                    onValue(ref(db, `users/${user.uid}/pets`), (snapshot) => {
                        for (let key in snapshot.val()){
                            this.pets.push({pid : key, name : snapshot.val()[key].name, age : snapshot.val()[key].age, breed : snapshot.val()[key].breed, photo : snapshot.val()[key].photo, desc : snapshot.val()[key].desc})
                        }
                    });
                }
                });  
            },
        },
        mounted() {
                // Reviews list scrolling 
                this.user_list = this.getuser();
                window.addEventListener("scroll", this.handleScroll);

                // this.getProfile()

                // this.getBookings()

                // this.getServices()

                // this.getReviews()

                // this.getPets()


        },
        
        setup() {
            const modalActive = ref(false);
            const toggleModal = () => {
            modalActive.value = !modalActive.value;
      };
      return { modalActive, toggleModal };
    },
    }
    
</script>
  
<style lang="scss" scoped>

* {
    box-sizing: border-box;
}

.profile-page {
        margin:0;
        // padding-top:50px;
        align-items: center;
        justify-content: center;
}

.profile-container{
    display: flex;
    width: 100%;
    height: 100%;
    padding: 20px 50px;
}

.profile-container:after {
    content: "";
    display: table;
    clear: both;
}

.profile-info{
    margin-top:40px;
    margin-left: 20px;
    flex: 30%;
    display: table;
    padding: 20px 30px;
    font-size: 20px;
    background-color: #fffbfa;
    border-radius: 20px;
}

.profile-about{
    margin-top:40px;
    margin-left: 20px;
    flex: 70%;
    display: table;
    padding: 20px 30px;
    font-size: 20px;
    background-color: #fffbfa;
    border-radius: 20px;
}

.row {
    text-align: center;
}
.row-image {
    text-align: center;
}

@media screen and (max-width: 600px) {
    .profile-info, .profile-about {
        width: 100%;
    }
}
.bio-message {
    margin: 30px;
}

.bio-btn {
        background-color: #9C796A;
        color: white;
        font-size: 14px;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
}

.bio-btn:hover {
    background-color:#F8AA9D;
    border-color: #F8AA9D;
    color: #fff;
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