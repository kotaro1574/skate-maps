
<template>
  <div class="cards">
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      mySpots: [],
      myRainSpots: [],
    }
  },
  methods: {
    async getSpots() {
      let mySpot = [];
      let myRainSpot = [];
      const spots = await axios.get("http://127.0.0.1:8000/api/posts/")
      console.log(spots);
      for (let i = 0; i < spots.data.data.length; i++) {
        await axios
          .get(
            "http://127.0.0.1:8000/api/posts/" + 
            spots.data.data[i].id
          )
          .then((response) => {
            console.log(response.data);
            if (response.data.spot.user_id == this.id) {
              mySpot.push(response.data);
            }
            for (let i = 0; i < response.data.like.length; i++) {
              if (response.data.like[i].user_id == this.id) {
                mySpot.push(response.data);
              }
            }
            if (mySpot.spot.rain == true) {
              myRainSpot.push(mySpot);
            }
          })
      }
      this.mySpots = mySpot;
      this.myRainSpot = myRainSpot;
      console.log(this.mySpots);
      console.log(this.myRainSpot);
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
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: space-around;
  justify-content: space-around;
}
.card {
  height: 450px;
  width: 300px;
  margin-bottom: 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
}
.card-img {
  height: 250px;
}
.card-title {
  margin: 15px;
  font-weight: bold;
}
.card-text {
  margin: 0 15px;
}
.rain {
  width: 80px;
  position: absolute;
  left: 15px;
  bottom: 15px;
}
</style>
