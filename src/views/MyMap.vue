<template>
  <div class="mymap">
    <Navi />
    
    <div class="container">
      <div class="profile-container">
        <div class="profile">
          <div class="profile-right">

            <img src="../assets/profile_icon.png" class="profile-img" alt="" v-if="!userImg">
            <img :src="userImg" alt="" class="profile-img" v-if="userImg">
          </div>
          <div class="profile-left">
            <h3 class="profile-name">{{ name }} </h3>
            <p class="profile-text">{{ profile }}</p>
            <div class="profile-icon">
              <a :href="twitterURL" target="_blank"><b-icon class="icon" icon="twitter"></b-icon></a>
              <a :href="instagramURL" target="_blank"><b-icon class="icon" icon="instagram"></b-icon></a>
              <b-icon class="icon" icon="gear" @click="$router.push({ name: 'MyMapEdit' })" v-if="$store.state.user.id == this.id"></b-icon>
            </div>
          </div>
        </div>
        <div class="weather-area" v-if="$store.state.user.id == this.id">
          <a class="weather-button" @click="toggleWeather()">myWeather<img :src="dailyWeathers[0].icon" alt=""></a>
        </div>
        <div class="weather mb-4" v-if="weather">
          <div class="daily" v-for="(weather, index) in dailyWeathers" :key="index">
            <div class="weather-day">{{ weather.day }}</div>
            <div class="weather-icon"><img :src="weather.icon" alt="" class="weather-icon"></div>
            <div class="weather-main">{{ weather.main }}</div>
            <div class="weather-description">({{ weather.description }})</div>
          </div>
        </div>
        <GmapMap
          :center="{lat: lat, lng: lng}"
          :zoom="9"
          :options="{streetViewControl: false}"
          map-type-id="terrain"
          class="map"
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
      </div>
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
      infoWinOpen: false,
      weather: false,
      dailyWeatherData: '',
      dailyWeathers: [],
    }
  },
  methods: {
    async getUser() {
      if (this.id == this.$store.state.user.id) {
        this.name = this.$store.state.user.name;
        this.profile = this.$store.state.user.profile;
        this.userImg = this.$store.state.user.image;
        this.userId = this.$store.state.user.id;
        this.lat = Number(this.$store.state.user.userLat);
        this.lng = Number(this.$store.state.user.userLng);
        this.instagramURL = this.$store.state.user.instagramURL;
        this.twitterURL = this.$store.state.user.twitterURL;
        this.getMyWeater();
      } else {
        await axios
          .get(process.env.VUE_APP_SKATE_MAPS_API+"/api/user/"+this.id)
          .then((response) => {
            console.log(response.data.data);
            this.name = response.data.data.name;
            this.profile = response.data.data.profile;
            this.userImg = response.data.data.image;
            this.userId = response.data.data.id;
            this.instagramURL = response.data.data.instagramURL;
            this.twitterURL = response.data.data.twitterURL;
            this.lat = Number(response.data.data.userLat);
            this.lng = Number(response.data.data.userLng);
          })
      }
    },
     async getMyWeater() {
      const item = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lng}&cnt=6&lang=ja&appid=${process.env.VUE_APP_WEATHER}`
        );
        console.log(item);
        this.dailyWeatherData = item.data.daily;
        for (let i = 0; i < this.dailyWeatherData.length; i++) {
          let weather = {};
          const icon = `https://openweathermap.org/img/w/${this.dailyWeatherData[i].weather[0].icon}.png`
          const main = this.dailyWeatherData[i].weather[0].main;
          const description = this.dailyWeatherData[i].weather[0].description;
          const date = new Date(this.dailyWeatherData[i].dt * 1000);
          const month = date.getMonth() + 1;
          const Week = new Array('(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)');
          const day = month + '/' + date.getDate() + Week[date.getDay()];
          weather.icon = icon;
          weather.main = main;
          weather.description = description;
          weather.day = day;
          this.dailyWeathers.push(weather)
        }
        console.log(this.dailyWeathers);
    },
    toggleWeather() {
      this.weather = !this.weather;
    },
    toggleInfoWindow(marker, name, image, id) {
      this.infoWindowPos = marker;
      this.cardName = name;
      this.cardImg = image;
      this.cardId = id;
      this.infoWinOpen = true;
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
        text.cardId = this.mySpots[i].spot.id
        for (let n = 0; n < this.mySpots[i].image.length; n++) {
          if(n == 0) {
            text.cardImg = this.mySpots[i].image[n].path
          }
        }
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
        text.cardId = this.myStreetSpots[i].spot.id
        for (let n = 0; n < this.myStreetSpots[i].image.length; n++) {
          if(n == 0) {
            text.cardImg = this.myStreetSpots[i].image[n].path
          }
        }
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
        text.cardId = this.myParkSpots[i].spot.id
        for (let n = 0; n < this.myParkSpots[i].image.length; n++) {
          if(n == 0) {
            text.cardImg = this.myParkSpots[i].image[n].path
          }
        }
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
        text.cardId = this.myRainSpots[i].spot.id
        for (let n = 0; n < this.myRainSpots[i].image.length; n++) {
          if(n == 0) {
            text.cardImg = this.myRainSpots[i].image[n].path
          }
        }
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
  components: {
    Cards,
    Navi
  },
  
}
</script>

<style scoped>
.container {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.profile-container {
  padding: 20px 5%;
}
.profile {
  display: flex;
  height: 20%;
}
.profile-right {
  width: 40%;
  text-align: center;
}
.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 50px;
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
.weather-button {
  color: #000;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
}
.weather-button:hover {
  color: rgb(55, 101, 255);
}
.weather {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
}
.daily {
  margin: 20px 0;
}
.weather-day {
  text-align: center;
}
.weather-icon {
  height: 70px;
}
.weather-main {
  text-align: center;
  font-weight: bold;
}
.weather-description {
  text-align: center;
  font-size: 6px;
  font: #727272;
}
.map {
  width: 100%; 
  height: 500px
}
.card {
  border: none;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .profile {
    display: block;
  }
  .profile-right {
    width: 100%;
    text-align: center;
  }
  .profile-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px;
  }
  .profile-left {
    width: 100%;
  }
  .profile-name {
    text-align: center;
    padding: 0 20px;
    margin: 10px 0;
  }
  .profile-text {
    width: 100%;
    padding: 0 20px;
    margin: 20px 0;
  }
  .map {
  width: 100%; 
  height: 400px
  }
}

@media screen and (max-width: 450px) {
  .map {
  width: 100%; 
  height: 300px
  }
}
</style>
