<template>
    <div v-if="review" class="m-4">
        <div class="card mb-3">
            <div class="d-flex justify-content-between mt-3 mx-3">

                <div class="d-flex justify-content-start align-items-center">
                    <img class="rounded-circle" v-bind:src='img' style="max-width:70px">

                    <div class="ms-2">
                        <h6>{{ name }}</h6>
                        <small style="font-style:italic;">{{ service }}</small>

                        <div class="ratings">
                            <i v-if='ratings >= 1' class="bi bi-star-fill"></i>
                            <i v-if='ratings >= 2' class="bi bi-star-fill"></i>
                            <i v-if='ratings >= 3' class="bi bi-star-fill"></i>
                            <i v-if='ratings >= 4' class="bi bi-star-fill"></i>
                            <i v-if='ratings == 5' class="bi bi-star-fill"></i>
                            <i v-if='!Number.isInteger(ratings)' class="bi bi-star-half"></i>
                            <i v-else class="bi bi-star"></i>
                            <i v-if='ratings < 1' class="bi bi-star"></i>
                            <i v-if='ratings < 2' class="bi bi-star"></i>
                            <i v-if='ratings < 3' class="bi bi-star"></i>
                            <i v-if='ratings < 4' class="bi bi-star"></i>
                        </div>

                    </div>
                </div>


                <h2 class="pe-2"><i class="bi bi-check-circle-fill" style="color:#F8AA9D;"></i></h2>

            </div>

            <div class="card-body p-4">
                <label class="form-label">Your Rating:</label>
                <select class="form-select" v-model="rating">
                    <option value=5 >5</option>
                    <option value=4 >4</option>
                    <option value=3 >3</option>
                    <option value=2 >2</option>
                    <option value=1 >1</option>
                    <option value=0 >0</option>
                </select>
                <div class="ratings mt-2 text-end">
                    <i v-for='a in parseInt(rating)' class="bi bi-star-fill"></i>
                    <i v-for='b in parseInt(5-rating)' class="bi bi-star"></i>
                </div>
            
                <label for="reviewTextArea" class="form-label">Your Review:</label>
                <textarea class="form-control" id="reviewTextArea" rows="3" v-model="userReview" maxlength="200"></textarea>
                <div class="text-end">
                    <small> {{limit}}/200</small>
                </div>

            </div>

            <div v-if='type != "Pet Owner"' class="card-footer">
                <div class="text-end">
                    <small v-if='type == "Pet Service Provider"' class="profile-details"><i
                            class="bi bi-currency-dollar"></i> {{ rates }}/h, </small>
                    <small class="profile-details"><i class="bi bi-geo"></i> {{ location }}, </small>
                    <small v-if='type == "Pet Service Provider"' class="profile-details"><i
                            class="bi bi-house-heart"></i> {{ yrsOfExp }} Yrs of Experience</small>
                </div>
            </div>


        </div>

        <!-- submit review -->
        <div class="buttons m-2 d-flex justify-content-end">
            <button class="btn btn-cancel p-2" @click="addReview">Submit Review</button>
        </div>
    </div>

    <div v-else class="m-4">
        <div class="card mb-3">
            <div class="d-flex justify-content-between mt-3 mx-3">

                <div class="d-flex justify-content-start align-items-center">
                    <img class="rounded-circle" v-bind:src='img' style="max-width:70px">

                    <div class="ms-2">
                        <h6>{{ name }}</h6>
                        <small style="font-style:italic;">{{ service }}</small>

                        <div class="ratings">
                            <i v-if='ratings >= 1' class="bi bi-star-fill"></i>
                            <i v-if='ratings >= 2' class="bi bi-star-fill"></i>
                            <i v-if='ratings >= 3' class="bi bi-star-fill"></i>
                            <i v-if='ratings >= 4' class="bi bi-star-fill"></i>
                            <i v-if='ratings == 5' class="bi bi-star-fill"></i>
                            <i v-if='!Number.isInteger(ratings)' class="bi bi-star-half"></i>
                            <i v-else class="bi bi-star"></i>
                            <i v-if='ratings < 1' class="bi bi-star"></i>
                            <i v-if='ratings < 2' class="bi bi-star"></i>
                            <i v-if='ratings < 3' class="bi bi-star"></i>
                            <i v-if='ratings < 4' class="bi bi-star"></i>
                        </div>

                    </div>
                </div>


                <h2 class="pe-2"><i class="bi bi-check-circle-fill" style="color:#F8AA9D;"></i></h2>

            </div>

            <div class="card-body">
                <h6 v-if='type == "Pet Owner"' class="card-title">Bio:</h6>
                <h6 v-else class="card-title">Description:</h6>
                <small class="card-text">{{ desc }}</small>
            </div>

            <div v-if='type != "Pet Owner"' class="card-footer">
                <div class="text-end">
                    <small v-if='type == "Pet Service Provider"' class="profile-details"><i
                            class="bi bi-currency-dollar"></i> {{ rates }}/h, </small>
                    <small class="profile-details"><i class="bi bi-geo"></i> {{ location }}, </small>
                    <small v-if='type == "Pet Service Provider"' class="profile-details"><i
                            class="bi bi-house-heart"></i> {{ yrsOfExp }} Yrs of Experience</small>
                </div>
            </div>


        </div>

        <div v-if="reviewLeft" class="buttons m-2 d-flex justify-content-end">
            <small style="color:brown;font-style:italic">Review sent!</small>
        </div>

        <div v-else class="buttons m-2 d-flex justify-content-end">
            <button class="btn btn-cancel p-2" @click="review=true">Leave Review</button>
        </div>
    </div>

</template>

<script>

export default {
    data() {
        return {
            total: 0,
            count: 0,
            review: false,
            reviewLeft: false,
            userReview: "",
            rating: 5
        }

    },
    props: ['name', 'desc', 'rates', 'location', 'img', 'yrsOfExp', 'ratings', 'service', 'type', 'otherid'],
    methods: {
        addReview(review, rating) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(db, `users/${this.otherid}/reviews/${user.uid}/${this.service}`), {
                        'rating': rating,
                        'review': review
                    })
                    set(ref(db, `users/${user.uid}/bookings/${this.otherid}/${this.service}/status`), 'cancelled')
                    set(ref(db, `users/${this.otherid}/bookings/${user.uid}/${this.service}/status`), 'cancelled')

                    this.calculateRatings()

                    // switch back to profile card but review sent
                    this.reviewLeft = true
                    this.review = false

                } else {
                    console.log('user is signed out')
                }
            });

        },

        calculateRatings() {
            onAuthStateChanged(auth, (user) => {
                onValue(ref(db, `users/${user.id}/reviews`), (snapshot) => {
                    for (let oid in snapshot.val()) {
                        for (let serv in snapshot.val()[oid]) {
                            this.count++
                            this.total += snapshot.val()[oid].rating
                        }
                    }
                    const rating = ((this.total / this.count) * 2).toFixed() / 2

                    set(ref(db, `users/${user.uid}/ratings`), ratings)
                    if (this.type == 'Pet Owner') {
                        window.location.href = `/bookingsProvider`;
                    } else {
                        window.location.href = `/bookingsOwner`;
                    }
                });

            });



        },
    },
    computed: {
        limit() {
            return this.userReview.length.toString()
        }
    }

}

</script>