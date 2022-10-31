<template>
    <div class="m-4">
    <div class="card mb-3">
        <div class="d-flex justify-content-between mt-3 mx-3" >

            <div class="d-flex justify-content-start align-items-center">
                <img class="rounded-circle"
                    v-bind:src = 'img'
                    style="max-width:70px">

                <div class="ms-2">
                    <h6>{{name}}</h6>
                    <small v-if="type=='Pet Owner'" style="font-style:italic;">Looking for {{service}}</small>
                    <small v-else style="font-style:italic;">{{service}}</small>

    
                    <div class="ratings">
                        <i v-if = 'ratings >= 1' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 2' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 3' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings >= 4' class="bi bi-star-fill"></i>
                        <i v-if = 'ratings == 5' class="bi bi-star-fill"></i>
                        <i v-if = '!Number.isInteger(ratings)' class="bi bi-star-half"></i>
                        <i v-else class="bi bi-star"></i>
                        <i v-if = 'ratings < 1' class="bi bi-star"></i>
                        <i v-if = 'ratings < 2' class="bi bi-star"></i>
                        <i v-if = 'ratings < 3' class="bi bi-star"></i>
                        <i v-if = 'ratings < 4' class="bi bi-star"></i>
                    </div>
    
                </div>
            </div>

            
            <h2 class="pe-2"><i class="bi bi-check-circle-fill" style="color:#F8AA9D;"></i></h2>
            
        </div>

        <div class="card-body">
            <h6 v-if='type == "Pet Owner"' class="card-title">Bio:</h6>
            <h6 v-else class="card-title">Description:</h6>
            <small class="card-text">{{desc}}</small>
        </div>

        <div v-if='type != "Pet Owner"' class="card-footer">
            <div class="text-end">
                <small v-if='type == "Pet Service Provider"' class="profile-details"><i class="bi bi-currency-dollar"></i>{{rates}} </small>
                <small class="profile-details"><i class="bi bi-geo"></i> {{location}} </small>
                <small v-if='type == "Pet Service Provider"' class="profile-details"><i class="bi bi-house-heart"></i> {{yrsOfExp}} Years of experience</small>
            </div>
        </div>

     
    </div>

    <!-- to add modal and review functionality -->
    <div class="buttons m-2 d-flex justify-content-end">
        <button class="btn btn-cancel p-2">Leave Review</button>
    </div>
    </div>

</template>

<style>
.card {
    border: none;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
    background-color: rgb(251, 248, 248);

}

</style>

<script>
export default {
    data() {
        return {
            total : 0,
            count : 0,
        }

    },
    props: ['name', 'desc', 'rates', 'location', 'img', 'yrsOfExp', 'ratings','service', 'type','otherid'],
    methods: {
        addReview(review,rating){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(db, `users/${this.otherid}/reviews/${user.uid}/${this.service}`), {
                        'rating' : rating, 
                        'review' : review
                    }) 
                    set(ref(db, `users/${user.uid}/bookings/${this.otherid}/${this.service}/status`), 'cancelled') 
                    set(ref(db, `users/${this.otherid}/bookings/${user.uid}/${this.service}/status`), 'cancelled') 

                    this.calculateRatings()                    
                } else {
                    console.log('user is signed out')
                }
            });

        },

        calculateRatings(){
            onAuthStateChanged(auth, (user) => {
                onValue(ref(db, `users/${user.id}/reviews`), (snapshot) => {
                    for (let oid in snapshot.val()){
                        for (let serv in snapshot.val()[oid]){
                            this.count ++
                            this.total += snapshot.val()[oid].rating
                        }
                    }
                    const rating = ((this.total / this.count)*2).toFixed()/2
                    
                    set(ref(db, `users/${user.uid}/ratings`), ratings) 
                    if (this.type == 'Pet Owner'){
                        window.location.href = `/bookingsProvider`;
                    }else{
                        window.location.href = `/bookingsOwner`;
                    }                    
                });
            
            });


            
        },
    }

}

</script>