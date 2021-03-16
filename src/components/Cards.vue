<template>
  <div class="cards">
    <div class="home-card" v-if="!id">
      <div class="">
        <b-nav tabs fill class="mb-4">
          <b-nav-item active @click="newSpot()" class="tab">New Spots</b-nav-item>
          <b-nav-item @click="popularSpot()" class="tab">人気 Spots</b-nav-item>
          <b-nav-item @click="streetSpot()" class="tab">Street Spots</b-nav-item>
          <b-nav-item @click="parkSpot()" class="tab">Park Spots</b-nav-item>
          <b-nav-item @click="rainSpot()" class="tab">雨 Spots</b-nav-item>
        </b-nav>
      </div>

      <div class="cards-flex" v-if="type == 1">
        <div class="card" v-for="(spotData, index) in spots" :key="index">
          <div class="card-img" @click="$router.push({ path: '/spot/'+spotData.spot.id, params: { id: spotData.spot.id }})" variant="primary">
            <div v-for="(image, index) in spotData.image" :key="index">
              <img class="card-img"  :src="image.path" alt="" v-if="index === 0">
            </div>
          </div>
          <div class="card-title">
            {{ spotData.spot.spotName }}
          </div>
          <div class="card-text">
            {{ spotData.spot.spotText }}
          </div>
          <div class="tag-flex">
            <div class="tags" v-for="(type, index) in spotData.type" :key="index"> 
              <div class="badge badge-danger tag" v-if="type == 'ストリート'">{{ type }}</div>
              <div class="badge badge-success tag" v-if="type == 'パーク'">{{ type }}</div>
              <div class="badge badge-primary tag" v-if="type == '雨スポット'">{{ type }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="cards-flex" v-if="type == 2">
        <div class="card" v-for="(spotData, index) in streetSpots" :key="index">
          <div class="card-img" @click="$router.push({ path: '/spot/'+spotData.spot.id, params: { id: spotData.spot.id }})" variant="primary">
            <div v-for="(image, index) in spotData.image" :key="index">
              <img class="card-img"  :src="image.path" alt="" v-if="index === 0">
            </div>
          </div>
          <div class="card-title">
            {{ spotData.spot.spotName }}
          </div>
          <div class="card-text">
            {{ spotData.spot.spotText }}
          </div>
          <div class="tag-flex">
            <div class="tags" v-for="(type, index) in spotData.type" :key="index"> 
              <div class="badge badge-danger tag" v-if="type == 'ストリート'">{{ type }}</div>
              <div class="badge badge-success tag" v-if="type == 'パーク'">{{ type }}</div>
              <div class="badge badge-primary tag" v-if="type == '雨スポット'">{{ type }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="cards-flex" v-if="type == 3">
        <div class="card" v-for="(spotData, index) in parkSpots" :key="index">
          <div class="card-img" @click="$router.push({ path: '/spot/'+spotData.spot.id, params: { id: spotData.spot.id }})" variant="primary">
            <div v-for="(image, index) in spotData.image" :key="index">
              <img class="card-img"  :src="image.path" alt="" v-if="index === 0">
            </div>
          </div>
          <div class="card-title">
            {{ spotData.spot.spotName }}
          </div>
          <div class="card-text">
            {{ spotData.spot.spotText }}
          </div>
          <div class="tag-flex">
            <div class="tags" v-for="(type, index) in spotData.type" :key="index"> 
              <div class="badge badge-danger tag" v-if="type == 'ストリート'">{{ type }}</div>
              <div class="badge badge-success tag" v-if="type == 'パーク'">{{ type }}</div>
              <div class="badge badge-primary tag" v-if="type == '雨スポット'">{{ type }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="cards-flex" v-if="type == 4">
        <div class="card" v-for="(spotData, index) in rainSpots" :key="index">
          <div class="card-img" @click="$router.push({ path: '/spot/'+spotData.spot.id, params: { id: spotData.spot.id }})" variant="primary">
            <div v-for="(image, index) in spotData.image" :key="index">
              <img class="card-img"  :src="image.path" alt="" v-if="index === 0">
            </div>
          </div>
          <div class="card-title">
            {{ spotData.spot.spotName }}
          </div>
          <div class="card-text">
            {{ spotData.spot.spotText }}
          </div>
          <div class="tag-flex">
            <div class="tags" v-for="(type, index) in spotData.type" :key="index"> 
              <div class="badge badge-danger tag" v-if="type == 'ストリート'">{{ type }}</div>
              <div class="badge badge-success tag" v-if="type == 'パーク'">{{ type }}</div>
              <div class="badge badge-primary tag" v-if="type == '雨スポット'">{{ type }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="myMap-card" v-if="id">
      <div class="">
        <b-nav tabs fill class="mb-4">
          <b-nav-item active @click="newSpot()" class="tab">My Spots</b-nav-item>
          <b-nav-item @click="popularSpot()" class="tab">人気 Spots</b-nav-item>
          <b-nav-item @click="streetSpot()" class="tab">Street Spots</b-nav-item>
          <b-nav-item @click="parkSpot()" class="tab">Park Spots</b-nav-item>
          <b-nav-item @click="rainSpot()" class="tab">雨 Spots</b-nav-item>
        </b-nav>
      </div>

      <div class="cards-flex" v-if="type == 1">
        <div class="card" v-for="(spotData, index) in mySpots" :key="index">
          <div class="card-img" @click="$router.push({ path: '/spot/'+spotData.spot.id, params: { id: spotData.spot.id }})" variant="primary">
            <div v-for="(image, index) in spotData.image" :key="index">
              <img class="card-img"  :src="image.path" alt="" v-if="index === 0">
            </div>
          </div>
          <div class="card-title">
            {{ spotData.spot.spotName }}
          </div>
          <div class="card-text">
            {{ spotData.spot.spotText }}
          </div>
          <div class="tag-flex">
            <div class="tags" v-for="(type, index) in spotData.type" :key="index"> 
              <div class="badge badge-danger tag" v-if="type == 'ストリート'">{{ type }}</div>
              <div class="badge badge-success tag" v-if="type == 'パーク'">{{ type }}</div>
              <div class="badge badge-primary tag" v-if="type == '雨スポット'">{{ type }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="cards-flex" v-if="type == 2">
        <div class="card" v-for="(spotData, index) in myStreetSpots" :key="index">
          <div class="card-img" @click="$router.push({ path: '/spot/'+spotData.spot.id, params: { id: spotData.spot.id }})" variant="primary">
            <div v-for="(image, index) in spotData.image" :key="index">
              <img class="card-img"  :src="image.path" alt="" v-if="index === 0">
            </div>
          </div>
          <div class="card-title">
            {{ spotData.spot.spotName }}
          </div>
          <div class="card-text">
            {{ spotData.spot.spotText }}
          </div>
          <div class="tag-flex">
            <div class="tags" v-for="(type, index) in spotData.type" :key="index"> 
              <div class="badge badge-danger tag" v-if="type == 'ストリート'">{{ type }}</div>
              <div class="badge badge-success tag" v-if="type == 'パーク'">{{ type }}</div>
              <div class="badge badge-primary tag" v-if="type == '雨スポット'">{{ type }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="cards-flex" v-if="type == 3">
        <div class="card" v-for="(spotData, index) in myParkSpots" :key="index">
          <div class="card-img" @click="$router.push({ path: '/spot/'+spotData.spot.id, params: { id: spotData.spot.id }})" variant="primary">
            <div v-for="(image, index) in spotData.image" :key="index">
              <img class="card-img"  :src="image.path" alt="" v-if="index === 0">
            </div>
          </div>
          <div class="card-title">
            {{ spotData.spot.spotName }}
          </div>
          <div class="card-text">
            {{ spotData.spot.spotText }}
          </div>
          <div class="tag-flex">
            <div class="tags" v-for="(type, index) in spotData.type" :key="index"> 
              <div class="badge badge-danger tag" v-if="type == 'ストリート'">{{ type }}</div>
              <div class="badge badge-success tag" v-if="type == 'パーク'">{{ type }}</div>
              <div class="badge badge-primary tag" v-if="type == '雨スポット'">{{ type }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="cards-flex" v-if="type == 4">
        <div class="card" v-for="(spotData, index) in myRainSpots" :key="index">
          <div class="card-img" @click="$router.push({ path: '/spot/'+spotData.spot.id, params: { id: spotData.spot.id }})" variant="primary">
            <div v-for="(image, index) in spotData.image" :key="index">
              <img class="card-img"  :src="image.path" alt="" v-if="index === 0">
            </div>
          </div>
          <div class="card-title">
            {{ spotData.spot.spotName }}
          </div>
          <div class="card-text">
            {{ spotData.spot.spotText }}
          </div>
          <div class="tag-flex">
            <div class="tags" v-for="(type, index) in spotData.type" :key="index"> 
              <div class="badge badge-danger tag" v-if="type == 'ストリート'">{{ type }}</div>
              <div class="badge badge-success tag" v-if="type == 'パーク'">{{ type }}</div>
              <div class="badge badge-primary tag" v-if="type == '雨スポット'">{{ type }}</div>
            </div>
          </div>
        </div>
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
      streetSpots: [],
      parkSpots: [],
      rainSpots: [],
      type: 1,
      mySpots: [],
      myStreetSpots: [],
      myParkSpots: [],
      myRainSpots: [],
    }
  },
  methods: {
    async getSpots() {
      let spot = [];
      let mySpot = [];
      const spots = await axios.get(process.env.VUE_APP_SKATE_MAPS_API + "/api/posts",  {headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
      });
      console.log(spots);
      for (let i = 0; i < spots.data.data.length; i++) {
        await axios
          .get(process.env.VUE_APP_SKATE_MAPS_API + "/api/posts/" + spots.data.data[i].id)
          .then((response) => {
            spot.push(response.data);
            console.log(response.data);
            for (let i = 0; i < response.data.like.length; i++) {
              if (response.data.like[i].user_id == this.id) {
                console.log(response.data);
                mySpot.push(response.data);
              }
            }
            console.log(mySpot)
            if (!mySpot.some(value => value.spot.id == response.data.spot.id)) {
              if (response.data.spot.user_id == this.id) {
                console.log(response.data, 'これ')
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
    newSpot() {
      this.type = 1;
      if (this.id) {
        this.mySpots.sort((a, b) => {
          return (a.spot.id < b.spot.id) ? 1 : (a.spot.id > b.spot.id) ? -1 : 0; 
        });
      } else {
        this.spots.sort((a, b) => {
          return (a.spot.id < b.spot.id) ? 1 : (a.spot.id > b.spot.id) ? -1 : 0; 
        });
      }
    },
    popularSpot() {
      this.type = 1;
      if (this.id) {
        this.mySpots.sort((a, b) => {
          return (a.like.length < b.like.length) ? 1 : (a.like.length > b.like.length) ? -1 : 0; 
        });
      } else {
        this.spots.sort((a, b) => {
          return (a.like.length < b.like.length) ? 1 : (a.like.length > b.like.length) ? -1 : 0; 
        });
      }
    },
    streetSpot() {
      this.type = 2;
      if (this.id) {
        this.$emit("getMyStreetSpotsData", this.myStreetSpots);
      } else {
        this.$emit("getStreetSpotsData", this.streetSpots);
      }
    },
    parkSpot() {
      this.type = 3;
      if (this.id) {
        this.$emit("getMyParkSpotsData", this.myParkSpots);
      } else {
        this.$emit("getParkSpotsData", this.parkSpots);
      }
    },
    rainSpot() {
      this.type = 4;
      if (this.id) {
        this.$emit("getMyRainSpotsData", this.myRainSpots);
      } else {
        this.$emit("getRainSpotsData", this.rainSpots);
      }
    },
    spotsType() {
      let street = [];
      let park = [];
      let rain = [];
      for (let i = 0; i < this.spots.length; i++){
        for (let n = 0; n < this.spots[i].type.length; n++) {
          if (this.spots[i].type[n] == "ストリート") {
            street.push(this.spots[i])
          }
          if (this.spots[i].type[n] == "パーク") {
            park.push(this.spots[i])
          }
          if (this.spots[i].type[n] == "雨スポット") {
            rain.push(this.spots[i])
          }
        }
      }
      this.streetSpots = street;
      this.parkSpots = park;
      this.rainSpots = rain;
      console.log(this.streetSpots)
    },
    mySpotsType() {
      let myStreet = [];
      let myPark = [];
      let myRain = [];
      for (let i = 0; i < this.mySpots.length; i++){
        for (let n = 0; n < this.mySpots[i].type.length; n++) {
          if (this.mySpots[i].type[n] == "ストリート") {
            myStreet.push(this.mySpots[i])
          }
          if (this.mySpots[i].type[n] == "パーク") {
            myPark.push(this.mySpots[i])
          }
          if (this.mySpots[i].type[n] == "雨スポット") {
            myRain.push(this.mySpots[i])
          }
        }
      }
      this.myStreetSpots = myStreet;
      this.myParkSpots = myPark;
      this.myRainSpots = myRain;
      console.log(this.streetSpots)
    },
    sendSpotsData() {
      this.$emit("getSpotsData", this.spots);
    },
    sendMySpotsData() {
      this.$emit("getMySpotsData", this.mySpots);
    },
  },
  watch: {
    spots(newSpot) {
      if (newSpot) {
        this.spotsType();
      }
    },
    mySpots(newMySpot) {
      if (newMySpot) {
        this.mySpotsType();
      }
    }
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
  height: 400px;
  width: 250px;
  margin: 10px 10px 30px;
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
.tag-flex {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 15px;
  bottom: 15px;
}
.tags {
  margin-right: 10px;
}
.tag {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .tab {
    font-size: 13px;
  }
}

@media screen and (max-width: 375px) {
  
}
</style>
