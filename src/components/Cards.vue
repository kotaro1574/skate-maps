<template>
  <div class="cards">
    <div class="title">
      <p>New Spots</p>
    </div>
    <div class="cards-flex">
    <div class="card" v-for="(spot, index) in spots" :key="index" @click="$router.push({ path: '/spot/'+spot.id, params: { id: spot.id },})">
      <b-card 
        :title="spot.spotName"
        :img-src="spot.spotImg"
        img-height=200
        img-alt="Image" 
        img-top tag="article" 
        style="max-width: 20rem;" 
        class="mb-2" 
      >
        <b-card-text>Some quick example text to build on the card title and make up the bulk of the card's content. </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      spots: []
    }
  },
  methods: {
    async getSpots() {
      let spot = []; 
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
          })
      }
      this.spots = spot;
    },
    sendSpotsData() {
      this.$emit("getSpotsData", this.spots);
    }
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
