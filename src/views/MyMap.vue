<template>
  <div class="mymap">
    <Navi />
    <div class="container">

    <div class="profile">
      <div class="profile-right">
        <img src="../assets/profile_icon.png" class="profile-img" alt="" v-if="!userImg">
        <img :src="userImg" alt="" class="profile-img" v-if="userImg">
      </div>
      <div class="profile-left">
        <h3 class="profile-name">{{ name }} </h3>
        <p class="profile-text">{{ profile }}</p>
        <div class="profile-icon">
          <b-icon class="icon" icon="twitter"></b-icon>
          <a href="https://www.instagram.com/ktalow1574/" target="_blank"><b-icon class="icon" icon="instagram"></b-icon></a>
          <b-icon class="icon" icon="gear" @click="$router.push({ name: 'MyMapEdit' })" v-if="$store.state.user.id == this.id"></b-icon>
        </div>
      </div>
    </div>
    <GmapMap
      :center="{lat: this.lat, lng: this.lng}"
      :zoom="9"
      :options="{streetViewControl: false}"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
    >
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
      <div class="card" @click="$router.push({ path: '/spot/' + cardId, params: { id: cardId } })">
        <b-card 
          :title="cardName"
          :img-src="cardImg"
          img-height=200
          img-alt="Image" 
          img-top tag="article" 
          style="max-width: 20rem;" 
          class="mb-2" 
        >
        </b-card>
      </div>
      </GmapInfoWindow>
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow(m.position, m.text.cardName, m.text.cardImg, m.text.cardId)"
      />
    </GmapMap>
    <Cards 
      :id="userId" 
      @getMySpotsData="showMySpotsData"
      @getMyStreetSpotsData="showMyStreetSpotsData"
      @getMyParkSpotsData="showMyParkSpotsData"
      @getMyRainSpotsData="showMyRainSpotsData"
     />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cards from "../components/Cards";
import Navi from "../components/Navi"
export default {
  props: ["id"],
  data() {
    return {
      address: '',
      lat: '',
      lng: '',
      name: '',
      profile: '',
      userImg: '',
      userId: '',
      cardName: '',
      cardImg: '',
      cardId: '',
      mySpots: [],
      myStreetSpots: [],
      myParkSpots: [],
      myRainSpots: [],
      markers: [],
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPos: null,
      infoWinOpen: false
    }
  },
  methods: {
    async getUser() {
      if (this.id == this.$store.state.user.id) {
        this.name = this.$store.state.user.name
        this.profile = this.$store.state.user.profile
        this.userImg = this.$store.state.user.image
        this.userId = this.$store.state.user.id
        this.lat = Number(this.$store.state.user.userLat)
        this.lng = Number(this.$store.state.user.userLng)
      } else {
        await axios
                .get("http://127.0.0.1:8000/api/user/"+this.id)
                .then((response) => {
                  console.log(response.data.data)
                  this.name = response.data.data.name
                  this.profile = response.data.data.profile
                  this.userImg = response.data.data.image
                  this.userId = response.data.data.id
                  this.lat = Number(response.data.data.userLat)
                  this.lng = Number(response.data.data.userLng)
                })
      }
    },
    showMySpotsData(mySpots) {
      this.mySpots = mySpots;
      console.log(this.spots)
    },
    showMyStreetSpotsData(myStreetSpots) {
      this.myStreetSpots = myStreetSpots;
      console.log(this.myStreetSpots);
    },
    showMyParkSpotsData(myParkSpots) {
      this.myParkSpots = myParkSpots;
      console.log(this.myParkSpots);
    },
    showMyRainSpotsData(myRainSpots) {
      this.myRainSpots = myRainSpots;
      console.log(this.myRainSpots);
    },
    mySpotsConversion() {
      this.markers = [];
      for (let i = 0; i < this.mySpots.length; i++) {
        const marker = {}
        const position = {}
        const text  = {}
        position.lat = Number(this.mySpots[i].spot.spotLat)
        position.lng = Number(this.mySpots[i].spot.spotLng)
        text.cardName = this.mySpots[i].spot.spotName
        text.cardImg = this.mySpots[i].spot.spotImg
        text.cardId = this.mySpots[i].spot.id
        marker.position = position
        marker.text = text
        this.markers.push(marker)
      }
      console.log(this.markers)
    },
    myStreetSpotsConversion() {
      this.markers = [];
      for (let i = 0; i < this.myStreetSpots.length; i++) {
        const marker = {}
        const position = {}
        const text  = {}
        position.lat = Number(this.myStreetSpots[i].spot.spotLat)
        position.lng = Number(this.myStreetSpots[i].spot.spotLng)
        text.cardName = this.myStreetSpots[i].spot.spotName
        text.cardImg = this.myStreetSpots[i].spot.spotImg
        text.cardId = this.myStreetSpots[i].spot.id
        marker.position = position
        marker.text = text
        this.markers.push(marker)
      }
      console.log(this.markers)
    },
    myParkSpotsConversion() {
      this.markers = [];
      for (let i = 0; i < this.myParkSpots.length; i++) {
        const marker = {}
        const position = {}
        const text  = {}
        position.lat = Number(this.myParkSpots[i].spot.spotLat)
        position.lng = Number(this.myParkSpots[i].spot.spotLng)
        text.cardName = this.myParkSpots[i].spot.spotName
        text.cardImg = this.myParkSpots[i].spot.spotImg
        text.cardId = this.myParkSpots[i].spot.id
        marker.position = position
        marker.text = text
        this.markers.push(marker)
      }
      console.log(this.markers)
    },
    myRainSpotsConversion() {
      this.markers = [];
      for (let i = 0; i < this.myRainSpots.length; i++) {
        const marker = {}
        const position = {}
        const text  = {}
        position.lat = Number(this.myRainSpots[i].spot.spotLat)
        position.lng = Number(this.myRainSpots[i].spot.spotLng)
        text.cardName = this.myRainSpots[i].spot.spotName
        text.cardImg = this.myRainSpots[i].spot.spotImg
        text.cardId = this.myRainSpots[i].spot.id
        marker.position = position
        marker.text = text
        this.markers.push(marker)
      }
      console.log(this.markers)
    },
  },
  watch: {
    mySpots(newMySpots) {
      if (newMySpots) {
        this.mySpotsConversion();
      }
    },
    myStreetSpots(newMyStreetSpots) {
      if (newMyStreetSpots) {
        this.myStreetSpotsConversion();
      }
    },
    myParkSpots(newMyParkSpots) {
      if (newMyParkSpots) {
        this.myParkSpotsConversion();
      }
    },
    myRainSpots(newMyRainSpots) {
      if (newMyRainSpots) {
        this.myRainSpotsConversion();
      }
    },
  },
  created() {
    this.getUser()
  },
  updated() {
    this.getUser()
  },
  components: {
    Cards,
    Navi
  }
}
</script>

<style scoped>
.profile {
  display: flex;
  height: 350px;
}
.profile-right {
  width: 40%;
  text-align: center;
}
.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 50px 0 50px;
}
.profile-left {
  width: 60%;
}
.profile-name {
  margin: 50px 50px 50px 0;
}
.profile-text {
  width: 80%;
  margin: 50px 50px 50px 0;
}
.profile-icon {
  text-align: end;
  padding-right: 50px;
  cursor: pointer;
}
.icon {
  font-size: 20px;
  margin-left: 20px;
}
</style>
