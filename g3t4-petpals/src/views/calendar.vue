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
    height: 600px;
    background-color: white;
    border-radius: 20px;
}

.bookings {
    overflow: scroll;
    height: 500px;
}

.event{
    background-color: #F8AA9D;
    color:white;
    border-radius: 25%;
    padding: 5px;
}

.days{
    overflow: scroll;
    height: 125px;
}

</style>

<template>
<div class = 'container-fluid'>
    <navbar v-if="petOwner"></navbar>
    <navbarProvider v-else></navbarProvider>

    <div class = 'row mt-5 pt-3 justify-content-center' >
        <div class="col sides">
            <div class = 'row mx-2'>
                <div class="col-9">
                    <div id="carouselExampleControls" class="carousel carousel-dark slide"  data-bs-interval="false" data-bs-wrap="false">
                        <div class="carousel-inner" >
                            <div class="carousel-item" v-for="(obj,idx) of year" :class="{'active': idx==0}" >
                                <h3 class = 'text-center mt-5'>{{obj.mth}}</h3>
                                <h4 class = 'text-center mb-5'>{{obj.year}}</h4>

                                <div class = 'row my-3'>
                                    <div class = 'col text-center' style='width:16px;' v-for='day in days'>
                                        <h6>{{day.slice(0,3).toUpperCase()}}</h6>
                                    </div>
                                </div>

                                <div class = 'row my-1' v-for="week in obj.arr.slice(0,1)">
                                    <div class = 'row mb-1'>
                                        <div class = 'col' style='width:100px;' v-for='n in (7-Object.keys(week).length)'>
                                            <p></p>
                                        </div>
                                        <div class = 'col' style='width:100px;' v-for='n in (Object.keys(week))'>
                                            <p v-if='today.day==n && months[today.month].toUpperCase()==obj.mth' v-on:click="chosenDate.day = n, chosenDate.month=(today.month+idx)%12">
                                                <span class=" btn current">{{n}}</span>
                                            </p>
                                            <p v-else  v-on:click="chosenDate.day = n, chosenDate.month=(today.month+idx)%12">
                                                <span :class="{current2: n==chosenDate.day && months[chosenDate.month].toUpperCase()==obj.mth}">{{n}}</span></p>
                                        </div>
                                    </div>
                                    <div class = 'row '>
                                        <div class = 'col' style='width:100px; height:75px;' v-for='n in (7-Object.keys(week).length)'>
                                            <p></p>
                                        </div>
                                        <div class = 'col days' style='width:100px; height:75px;' v-for='n in (Object.keys(week))'>
                                            <p class="event" v-for="event in week[n]">{{event.title}}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class = 'row my-1' v-for="week in obj.arr.slice(1,obj.arr.length)">
                                    <div class = 'row mb-1'>
                                        <div class = 'col' style='width:100px;' v-for='n in (Object.keys(week))'>
                                            <p v-if='today.day==n && months[today.month].toUpperCase()==obj.mth' v-on:click="chosenDate.day = n, chosenDate.month=(today.month+idx)%12">
                                                <span class="current">{{n}}</span> 
                                            </p>
                                            <p v-else v-on:click="chosenDate.day = n, chosenDate.month=(today.month+idx)%12">
                                                <span :class="{current2: n==chosenDate.day && months[chosenDate.month].toUpperCase()==obj.mth}">{{n}}</span></p>
                                        </div>
                                        <div class = 'col' style='width:100px;' v-for='n in (7-Object.keys(week).length)'>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div class = 'row'>
                                        <div class = 'col days' style='width:100px; height:75px;' v-for='n in (Object.keys(week))'>
                                            <p class="event" v-for="event in week[n]">{{event.title}}</p>
                                        </div>
                                        <div class = 'col' style='width:100px; height:75px;' v-for='n in (7-Object.keys(week).length)'>
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

                <div class = 'col-3'>
                    <button class="btn btn-select px-3 mt-5 mb-3 w-100" v-on:click="">Add Event</button>
                    <div class="w-100 body" >
                        <h6 class = 'text-center p-2'>{{chosenDate.day}}-{{months[chosenDate.month]}}-{{chosenDate.year}}</h6>
                        <h4 class = 'text-center'>BOOKINGS</h4>
                        <div class="bookings mt-3">
                            <events v-for="n in 5" :date="chosenDate" :title='"hello"'  class="mt-5"></events>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    
</div>

<petpalsFooter></petpalsFooter>
</template>

<script>
import navbar from '@/components/navbar.vue'
import navbarProvider from '@/components/navbarProvider.vue'
import events from '@/components/events.vue'
import petpalsFooter from "@/components/petpalsFooter.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

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

export default {
    data(){
        return {
            petOwner: false,
            today: {'day': 0, 'month': '', 'year': ''},
            chosenDate: {'day': 0, 'month': '', 'year': ''},
            events: [],
            year: [],

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
        petpalsFooter,
    },

    methods : {
        getMonth(startDay,totalDays,month,year){
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
                obj[count] = this.getEvents(count,month,year)
                count ++
            }
            lst.push(obj)
            weeks --

            for (let i=0; i<weeks-1; i++){
                obj = {}
                for (let j=0; j<7; j++){
                    obj[count] = this.getEvents()
                    count ++
                }
                lst.push(obj)
            }

            obj = {}
            for(let i=count; i<=(totalDays); i++){
                obj[i] = this.getEvents()
            }
            lst.push(obj) 

            return lst
        },

        getEvents(date){
            var lst = []
            var obj = {'title': '     ', 'date': '', 'time': ''}
            return lst.push(obj)
        },

        addEvent(date){

        },

    },

    mounted(){
        const auth = getAuth();
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

        this.chosenDay = this.today.day
        this.chosenDate.day = this.today.day
        this.chosenDate.month = this.today.month
        this.chosenDate.year = this.today.year

        console.log(this.today)

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
            obj['arr'] = this.getMonth(sday,tdays)
            obj['mth'] = this.months[idx].toUpperCase()
            this.year.push(obj)
           
        }

        // console.log(this.year)
    },
}
</script>