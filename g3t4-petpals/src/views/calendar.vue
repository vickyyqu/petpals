<style>

span, p {
    color: #856658;
}

.current {
    color: white;
    background-color: #856658;
    border-radius: 25%;
    padding: 4px;
    width: 5px;
    height: 5px;
}

.current2 {
    color: #856658;
    background-color: #dfd1cd;
    border-radius: 35%;
    padding: 4px;  
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
                <div class = 'col-9'>
                    <!-- days of the week -->
                    <h3 class = 'text-center mt-5'>{{today.month.toUpperCase()}}</h3>
                    <h4 class = 'text-center mb-5'>{{today.year}}</h4>

                    <div class = 'row my-3'>
                        <div class = 'col text-center' style='width:16px;' v-for='day in days'>
                            <h6>{{day.slice(0,3).toUpperCase()}}</h6>
                        </div>
                    </div>

                    <div class = 'row my-1' v-for="week in month.slice(0,1)">
                        <div class = 'row mb-1'>
                            <div class = 'col' style='width:100px;' v-for='n in (7-Object.keys(week).length)'>
                                <span></span>
                            </div>
                            <div class = 'col' style='width:100px;' v-for='n in (Object.keys(week))'>
                                <span :class="{current: n==today.day, current2: n==chosenDay}"  v-on:click="chosenDay = n">{{n}}</span>
                            </div>
                        </div>
                        <div class = 'row '>
                            <div class = 'col' style='width:100px; height:75px;' v-for='n in (7-Object.keys(week).length)'>
                                <span></span>
                            </div>
                            <div class = 'col days' style='width:100px; height:75px;' v-for='n in (Object.keys(week))'>
                                <p class="event" v-for="event in week[n]">{{event.title}}</p>
                            </div>
                        </div>
                    </div>

                    <div class = 'row my-1' v-for="week in month.slice(1,month.length)">
                        <div class = 'row mb-1'>
                            <div class = 'col' style='width:100px;' v-for='n in (Object.keys(week))'>
                                <span :class="{current: n==today.day, current2: n==chosenDay}"  v-on:click="chosenDay = n">{{n}}</span>
                            </div>
                            <div class = 'col' style='width:100px;' v-for='n in (7-Object.keys(week).length)'>
                                <span></span>
                            </div>
                        </div>
                        <div class = 'row'>
                            <div class = 'col days' style='width:100px; height:75px;' v-for='n in (Object.keys(week))'>
                                <p class="event" v-for="event in week[n]">{{event.title}}</p>
                            </div>
                            <div class = 'col' style='width:100px; height:75px;' v-for='n in (7-Object.keys(week).length)'>
                                <span></span>
                            </div>
                        </div>
                    </div>



                    <div class = 'row'>
                        <!-- <div id="carouselExampleControls" class="carousel carousel-dark slide">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <h3 class = 'text-center my-5'>NOVEMBER</h3>

                                <div class = 'row my-3'>
                                    <div class = 'col' v-for='day in days'>
                                        <span>{{day.slice(0,3).toUpperCase()}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <small class = 'text-center'>2022</small>
                                <h3 class = 'text-center my-5'>OCTOBER</h3>
                                

                                <div class = 'row my-3'>
                                    <div class = 'col' v-for='day in days'>
                                        <span>{{day.slice(0,3).toUpperCase()}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <h3 class = 'text-center my-5'>DECEMBER</h3>

                                <div class = 'row my-3'>
                                    <div class = 'col' v-for='day in days'>
                                        <span>{{day.slice(0,3).toUpperCase()}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div> -->
                    </div>
                </div>

                <div class = 'col-3'>
                    <div class="my-5 w-100 body" >
                        <h6 class = 'text-center p-2'>{{chosenDay}}-{{today.month}}-{{today.year}}</h6>
                        <h4 class = 'text-center'>BOOKINGS</h4>
                        <div class="bookings mt-3">
                            <events v-for="n in 5" :day="chosenDay" :month="today.month" :year="today.year" :title='"hello"'  class="mt-5"></events>
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

export default {
    data(){
        return {
            petOwner: false,
            today: {'day': 0, 'month': '', 'year': ''},
            start: '',
            month: [],
            totalDays: 28,

            chosenDay: 0,



            months: ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November','December'],

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
                    obj[count] = this.getEvents(count,month,year)
                    count ++
                }
                lst.push(obj)
            }

            obj = {}
            for(let i=count; i<=(totalDays); i++){
                obj[i] = this.getEvents(count,month,year)
            }
            lst.push(obj) 

            return lst
        },

        getEvents(day,month,year){
            var obj = {'title': 'pet walking', 'date': '', 'time': ''}
            return []
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

        var temp = new Date().toString().split(' ');
        this.today.day = temp[2]
        this.today.month = temp[1]
        this.today.year = temp[3]
        this.chosenDay = this.today.day

        temp = new Date(`${this.today.month} 1, ${this.today.year} 01:15:00`).getDay();
        this.start = temp

        temp = new Date(this.today.year, 11, 0).getDate()
        this.totalDays = temp

        this.month = this.getMonth(this.start,this.totalDays)
    },
}
</script>