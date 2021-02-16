<template>
  <div class="cards">
    <div class="title">
      <p>New Spots</p>
      <p>{{ id }}</p>
    </div>
    <div class="cards-flex" v-if="!id">
      <div class="card" v-for="(spotData, index) in spots" :key="index">
        <b-card 
          :title="spotData.spot.spotName"
          :img-src="spotData.spot.spotImg"
          img-height=200
          img-alt="Image" 
          img-top tag="article" 
          style="max-width: 20rem;" 
          class="mb-2" 
        >
          <b-card-text>Some quick example text to build on the card title and make up the bulk of the card's content. </b-card-text>
          <b-button @click="$router.push({ path: '/spot/'+spotData.spot.id, params: { id: spotData.spot.id }})" variant="primary">Go somewhere</b-button>
        </b-card>
      </div>
    </div>
    <div class="cards-flex" v-if="id">
      <div class="card" v-for="(spotData, index) in mySpots" :key="index">
        <b-card 
          :title="spotData.spot.spotName"
          :img-src="spotData.spot.spotImg"
          img-height=200
          img-alt="Image" 
          img-top tag="article" 
          style="max-width: 20rem;" 
          class="mb-2" 
        >
          <b-card-text>Some quick example text to build on the card title and make up the bulk of the card's content. </b-card-text>
          <b-button @click="$router.push({ path: '/spot/'+spotData.spot.id, params: { id: spotData.spot.id }})" variant="primary">Go somewhere</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      spots: [],
      mySpots: []
    }
  },
  methods: {
    async getSpots() {
      let spot = [];
      let mySpot = [];
      const spots = await axios.get("http://127.0.0.1:8000/api/posts/")
      console.log(spots);
      for (let i = 0; i < spots.data.data.length; i++) {
        await axios
          .get(
            "http://127.0.0.1:8000/api/posts/" + 
            spots.data.data[i].id
          )
          .then((response) => {
            spot.push(response.data);
            if (this.id) {
              if (
               response.data.like.user_id == this.id ||
               response.data.spot.user_id == this.id
             ) {
               mySpot.push(response.data);
             }
            }
          })
      }
      this.spots = spot;
      this.mySpots = mySpot;
      console.log(this.spots);
      console.log(this.mySpots);
    },
    sendSpotsData() {
      this.$emit("getSpotsData", this.spots);
    },
    sendMySpotsData() {
      this.$emit("getMySpotsData", this.mySpots);
    },
  },
  beforeCreate() {
    },
  created() {
    this.getSpots();
  },
  mounted() {
    },
  updated() {
    this.sendSpotsData();
    this.sendMySpotsData();
  }
}
</script>

<style scoped>
.cards-flex {
  height: 1100px;
  display: flex;
  flex-wrap: wrap;
  align-items: space-around;
  justify-content: space-around;
}
.card {
  height: 500px;
  width: 300px;
  margin: 0;
}
</style>
