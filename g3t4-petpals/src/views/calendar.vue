<style>

p {
    color: #856658;
    margin-bottom: 5px;
}

.current {
    color: white;
    background-color: #856658;
    border-radius: 35%;
    padding: 4px;
}

.current2 {
    color: #856658;
    background-color: #dfd1cd;
    border-radius: 35%;
    padding: 4px;  
    width: 50px;
    height: 15px;
}

.body{
    height: 700px;
    background-color: white;
    border-radius: 20px;
}

.bookings {
    overflow: scroll;
    height: 700px;
}

.event{
    background-color: #f3d1cb;
    color:white;
    padding: 5px;
    width: 100%;
}

.days{
    overflow: scroll;
    height: 55px;
    width: 100px;
}

</style>

<template>
<div class="container-fluid sides">
    <navbar v-if="petOwner"></navbar>
    <navbarProvider v-else></navbarProvider>

    <div class='sides' style="padding-top:80px;padding-bottom:50px;">
            <div class = 'row px-2 py-5'>
                <div class="col-md-8 order-md-last">
                    <div id="carouselExampleControls" class="carousel carousel-dark slide"  data-bs-interval="false" data-bs-wrap="false">
                        <div class="carousel-inner" >
                            <div class="carousel-item" v-for="(obj,idx) of year" :class="{'active': idx==0}" >
                                <h3 class = 'text-center'>{{obj.mth}}</h3>
                                <h4 class = 'text-center mb-5'>{{obj.year}}</h4>

                                <div class = 'row my-3'>
                                    <div class = 'col text-center' style='width:16px;' v-for='day in days'>
                                        <h6>{{day.slice(0,3).toUpperCase()}}</h6>
                                    </div>
                                </div>

                                <div class = 'row mt-1' v-for="week in obj.arr.slice(0,1)">
                                    <div class = 'row'>
                                        <div class = 'col' style='width:100px;' v-for='n in (7-Object.keys(week).length)'>
                                            <p></p>
                                        </div>
                                        <div class = 'col' style='width:100px;' v-for='n in (Object.keys(week))'>
                                            <p v-if='today.day==n && months[today.month].toUpperCase()==obj.mth' v-on:click="updateChosen(n,idx)">
                                                <span class=" btn current">{{n}}</span>
                                            </p>
                                            <p v-else  v-on:click="updateChosen(n,idx)">
                                                <span :class="{current2: n==chosenDate.day && months[chosenDate.month].toUpperCase()==obj.mth}">{{n}}</span></p>
                                        </div>
                                    </div>
                                    <div class = 'row'>
                                        <div class = 'col days' v-for='n in (7-Object.keys(week).length)'>
                                            <p></p>
                                        </div>
                                        <div class = 'col days' v-for='n in (Object.keys(week))'>
                                            <p class="event rounded" v-for="event in week[n]"></p>
                                        </div>
                                    </div>
                                </div>

                                <div class = 'row mt-1' v-for="week in obj.arr.slice(1,obj.arr.length)">
                                    <div class = 'row'>
                                        <div class = 'col' style='width:100px;' v-for='n in (Object.keys(week))'>
                                            <p v-if='today.day==n && months[today.month].toUpperCase()==obj.mth' v-on:click="updateChosen(n,idx)">
                                                <span class="current">{{n}}</span> 
                                            </p>
                                            <p v-else v-on:click="updateChosen(n,idx)">
                                                <span :class="{current2: n==chosenDate.day && months[chosenDate.month].toUpperCase()==obj.mth}">{{n}}</span></p>
                                        </div>
                                        <div class = 'col' style='width:100px;' v-for='n in (7-Object.keys(week).length)'>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div class = 'row'>
                                        <div class = 'col days' v-for='n in (Object.keys(week))'>
                                            <p class="event rounded" v-for="event in week[n]"></p>
                                        </div>
                                        <div class = 'col days' v-for='n in (7-Object.keys(week).length)'>
                                           <p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button class="carousel-control-prev align-items-start mt-5" style="height:33px;" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next align-items-start mt-5" style="height:33px;" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div class = 'col-md-4 order-md-first px-3'>
                    <button class="btn btn-select px-3 mb-3 w-100" @click="toggleModal">Add Event &nbsp;<i class="bi bi-calendar-check"></i></button>
                    <div class="body py-3">
                        <h6 class = 'text-center p-2'>{{chosenDate.day}}-{{months[chosenDate.month]}}-{{chosenDate.year}}</h6>
                        <h4 class = 'text-center'>BOOKINGS</h4>
                        <div class="bookings mt-3"  style="width:100%;">
                            <events v-for="item in events" :title='item.title' :venue="item.venue" :start="item.start" :end="item.end" v-on:delete="deleteEvent(item)" class="my-2 mb-4"></events>
                        </div>
                    </div>
                </div>

            </div>

    </div>
    
</div>
<petpalsFooter></petpalsFooter>

<Modal @close="addEvent()" :modalActive="modalActive">
  <div class="container p-0" >
    <button class = 'btn btn-select py-1 px-2 float-end d-inline' v-on:click="toggleModal(true);"><i class="bi bi-x"></i></button>

    <div class="px-3">

    <div  class="py-3">
        <h4>Enter Event Details:</h4>
    </div>

    <div v-if="addError" class="text-center mt-3">
        <small style="font-style:italic; color:brown">{{errorMsg}}</small>
    </div>

    <label>Event Title:</label>
    <input class="form-control mb-2"
      type="text"
      id="title"
      v-model="title"
      required
    />

    <label>Location:</label>
    <input class="form-control mb-2"
      type="text"
      id="location"
      placeholder="-"
      v-model="location"
      required
    />

    <label>Date:</label>
    <input class="form-control mb-2"
      type="date"
      id="eventDate"
      v-bind:min="today.year + '-' + (today.month+1) + '-' + today.day"
      v-model="eventDate"
      width="50%"
      required
    />

    <label>Start:</label>
    <input class="form-control mb-2"
      type="time"
      id="startTime"
      v-model="startTime"
    />

    <label>End:</label>
    <input class="form-control mb-2"
      type="time"
      id="endTime"
      v-model="endTime"
    />
    </div>
  </div>
</Modal> 

</template>

<script>
import navbar from '@/components/navbar.vue'
import navbarProvider from '@/components/navbarProvider.vue'
import events from '@/components/events.vue'
import petpalsFooter from "@/components/petpalsFooter.vue"
import Modal from "@/components/Modal.vue";
import { ref as modalref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database";

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
    data(){
        return {
            petOwner: false,
            today: {'day': 0, 'month': '', 'year': ''},
            chosenDate: {'day': 0, 'month': '', 'year': ''},
            events: [],
            year: [],

            title: '',
            eventDate: '',
            startTime: '09:00',
            endTime: '10:00',
            location: '',

            addError: false,
            errorMsg: '',

            months: ['January', 'Febuary', 'March', 'April', 'May', 'June','July', 
                        'August', 'September', 'October', 'November', 'December'],
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
                        'Thursday', 'Friday','Saturday'],
        }
    },

    components : {
        navbar,
        navbarProvider,
        events,
        Modal,
        petpalsFooter,
    },

    methods : {
        checkuser(){
            onAuthStateChanged(auth, (user) => {
                if (!user) {
                    console.log('user is not logged in')
                    window.location.href = `/`;
                }
            });
        },

        getYear(){
            for (let i=this.today.month; i<this.today.month+12; i++){
                var sday = 0
                var tdays = 0
                var tyear = this.today.year
                var idx = i

                if (i >= 12){
                    idx -= 12
                    tyear = this.today.year + 1
                }

                sday = new Date(`${this.months[idx]} 1, ${tyear} 01:15:00`).getDay();
                tdays = new Date(tyear, idx+1, 0).getDate()
                

                var obj = {}
                obj['year'] = tyear
                obj['arr'] = this.getMonth(sday,tdays,idx+1,tyear)
                obj['mth'] = this.months[idx].toUpperCase()
                this.year.push(obj)
            
            }
        },

        getMonth(startDay,totalDays, month, year){
            var lst = [];
            var count = 1
            var weeks = 4 
            if (totalDays - 28 > 0){
                if (totalDays - 28 + startDay > 7){
                    weeks = 6
                }else{
                    weeks = 5
                }
            }else if(totalDays == 28 && startDay > 0){
                weeks = 5
            }

            var obj = {}
            for(let i=0; i<(7-startDay); i++){
                var temp = year + '-' + month + '-' + count 
                obj[count] = this.getEvents(temp)
                count ++
            }
            lst.push(obj)
            weeks --

            for (let i=0; i<weeks-1; i++){
                obj = {}
                for (let j=0; j<7; j++){
                    var temp = year + '-' + month + '-' + count 
                    obj[count] = this.getEvents(temp)
                    count ++
                }
                lst.push(obj)
            }

            obj = {}
            for(let i=count; i<=(totalDays); i++){
                var temp = year + '-' + month + '-' + i
                obj[i] = this.getEvents(temp)
            }

            lst.push(obj) 
            return lst
        },

        getEvents(date){
            // date in 'yyyy-mm-dd' format
            var lst = []

            var temp = date.split('-')
            if (temp[1].length == 1){
                temp[1] = '0'.concat(temp[1])
            }
            if (temp[2].length == 1){
                temp[2] = '0'.concat(temp[2])
            }
            date = temp.join('-')

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    get(ref(db, `users/${user.uid}/calendar/${date}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            this.events = []
                            for (let event in snapshot.val()) {
                                var obj = {}

                                obj['title'] = event
                                obj['start'] = snapshot.val()[event].start
                                obj['end'] = snapshot.val()[event].end
                                obj['venue'] = snapshot.val()[event].venue

                                this.events.push(obj)
                                lst.push(obj)
                            }
                            
                        }else{
                            this.events = []
                        }
                        
                    })
                }

            })
            return lst

        },

        addEvent(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    if (this.title != '' && this.startTime <= this.endTime) {
                        if (this.location == ''){
                            this.location = '-'
                        }
                        
                        set(ref(db,`users/${user.uid}/calendar/${this.eventDate}/${this.title}`), {
                            'start': this.startTime,
                            'end': this.endTime,
                            'venue': this.location
                        })

                        this.toggleModal(false); 

                    }else{
                        this.addError = true
                        if (this.title == ''){
                            this.errorMsg = 'Please enter a title.'
                        }else if(this.startTime > this.endTime){
                            this.errorMsg = 'Start time has to be earlier than end time.'
                        }
                    }

                }
            });
        },

        deleteEvent(item){
            var temp = this.chosenDate.year + '-' 
            if ((this.chosenDate.month+1).toString().length == 1){
                temp += '0' + (this.chosenDate.month+1) + '-'
            }else{
                temp += (this.chosenDate.month+1) + '-'
            }
            if (this.chosenDate.day.toString().length == 1){
                temp += '0' + this.chosenDate.day
            }else{
                temp += this.chosenDate.day
            }

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(db,`users/${user.uid}/calendar/${temp}/${item.title}`), null)
                    window.location.href = `/calendar`;
                }
            });
        },

        updateChosen(n, idx){
            this.chosenDate.day = n
            this.chosenDate.month = (this.today.month+idx)%12

            if (this.today.month + idx < 12){
                this.chosenDate.year = this.today.year
            }else{
                this.chosenDate.year = this.today.year + 1
            }

            this.getEvents(this.chosenDate.year + '-' + (this.chosenDate.month+1) + '-' + (this.chosenDate.day))
        }

    },

    mounted(){
        this.checkuser()

        onAuthStateChanged(auth, (user) => {
            if (user) {
                onValue(ref(db, `users/${user.uid}`), (snapshot) => {
                    if (snapshot.val().type == 'Pet Owner'){
                        this.petOwner = true
                    }else{
                        this.petOwner = false
                    }   
                })
            }
        });

        var temp = new Date();
        this.today.day = temp.getDate()
        this.today.month = temp.getMonth()
        this.today.year = temp.getFullYear()

        this.chosenDate.day = this.today.day
        this.chosenDate.month = this.today.month
        this.chosenDate.year = this.today.year

        this.eventDate = this.today.year + '-' + (this.today.month+1) + '-' + this.today.day

        this.getYear()

        this.getEvents(this.today.year + '-' + (this.today.month+1) + '-' + (this.today.day))

    },

    setup() {
        const modalActive = modalref(false);

        const toggleModal = (check) => {
            modalActive.value = !modalActive.value;
            if (modalActive.value == modalref(false).value && check == false){
                window.location.href = `/calendar`;
            }
        };

        return { modalActive, toggleModal };
    },
}
</script>