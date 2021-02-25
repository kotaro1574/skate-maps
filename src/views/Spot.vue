<template>
  <div class="spot">
    <Navi />
    <div class="container">
      <div class="img-wrap">
        <img :src="spotData.spot.spotImg" alt="" class="spot-img">
      </div>
      <div class="toggle-area">
        <div class="weather-area">
          <a class="weather-button" @click="toggleWeather()">weather<img :src="dailyWeathers[0].icon" alt=""></a>
        </div>
        <div class="map-area">
          <a class="map-button" @click="toggleMap()">Map <img src="../assets/google_map_pin.png" class="map-button-imag" alt=""></a>
        </div>
      </div>
      <div class="weather mt-4 mb-4" v-if="weather">
        <div class="daily" v-for="(weather, index) in dailyWeathers" :key="index">
          <div class="weather-day">{{ weather.day }}</div>
          <div class="weather-icon"><img :src="weather.icon" alt="" class="weather-icon"></div>
          <div class="weather-main">{{ weather.main }}</div>
          <div class="weather-description">({{ weather.description }})</div>
        </div>
      </div>
    <GmapMap
      :center="position"
      :zoom="12"
      :options="{streetViewControl: false}"
      map-type-id="terrain"
      class="map"
      v-if="map"
    >
    <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
      <div class="card">
        <b-card 
          :title="spotData.spot.spotName"
          :img-src="spotData.spot.spotImg"
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
        :position="position"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow()"
      />
    </GmapMap>
    <div class="spot-title">
      <div class="spot-info">
        <div class="spot-name">{{ spotData.spot.spotName }}</div>
        <div class="tag-flex">
          <div class="tags" v-for="(type, index) in spotData.type" :key="index"> 
            <div class="badge badge-danger tag" v-if="type == 'ストリート'">{{ type }}</div>
            <div class="badge badge-success tag" v-if="type == 'パーク'">{{ type }}</div>
            <div class="badge badge-primary tag" v-if="type == '雨スポット'">{{ type }}</div>
          </div>
        </div>
      </div>
      <div class="bookmark">
         <p><b-icon class="fav-icon" icon="bookmark-check" @click="favorite()" v-if="!like"></b-icon></p>
         <p><b-icon class="fav-icon" icon="bookmark-check-fill" @click="favoriteDelete()" v-if="like"></b-icon></p>
        <p>{{ spotData.like.length }}</p>
      </div>
    </div>
    <div class="post-user">
      <p class="spot-text">{{ spotData.spot.spotText }}</p>
      <div class="user" @click="$router.push({ path: '/mymap/'+ spotData.user.id, params: { id: spotData.user.id } })">
        <img class="user-img" src="../assets/profile_icon.png" alt="" v-if="!spotData.user.image">
        <img class="user-img" :src="spotData.user.image" alt="" v-if="spotData.user.image">
        <p class="user-name">{{ spotData.user.name }}</p>
      </div>
      <div class="setting">
        <b-icon class="setting-icon" icon="gear" @click="$router.push({ name: 'SpotEdit' })" v-if="$store.state.user.id == spotData.spot.user_id"></b-icon>
      </div>
    </div>
    <div class="spot-content">
      <div class="comment-area" v-for="(comments, index) in showComments" :key="index">
        <div class="post-user">
          <p class="spot-text">{{ comments.comment.comment }}</p>
          <div class="user" @click="$router.push({ path: '/mymap/'+ comments.commentUser.id, params: { id: comments.commentUser.id } })">
            <img :src="comments.commentUser.image" class="user-img" v-if="comments.commentUser.image">
            <img src="../assets/profile_icon.png" alt="" v-if="!comments.commentUser.image">
            <p class="user-name">{{ comments.commentUser.name }}</p>
          </div>
          <div class="comment-delete">
            <img class="delete-button" src="../assets/delete.png" alt="" v-if="$store.state.user.id == comments.commentUser.id" @click="commentDelete(comments.comment.id)">
          </div>
        </div>
      </div>
      <div class="comment-form">
        <p class="spot-text"><input placeholder="+ spotの情報を追加しよう" type="text" v-model="spotComment" /></p>
        <div class="comment-button">
          <button @click="commentPost()" type="button" class="btn btn-primary">投稿</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navi from "../components/Navi";
export default {
  props: ["id"],
  data() {
    return {
      spotData: '',
      spotName: '',
      spotImg: '',
      map: false,
      showComments: '',
      spotComment: '',
      like: false,
      position: {
        lat: '',
        lng: ''
      },
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
    async spotShow() {
      await axios
        .get("http://127.0.0.1:8000/api/posts/" + this.id)
        .then((response) => {
          console.log(response)
          this.spotData = response.data;
          this.showComments = response.data.comments
          console.log(this.spotData)
          this.favoriteData();
        })
    },
    conversion() {
      this.position.lat = Number(this.spotData.spot.spotLat)
      this.position.lng = Number(this.spotData.spot.spotLng)
        console.log(this.position)
    },
    async getSpotWeater() {
      const item = await axios.get(
          `http://api.openweathermap.org/data/2.5/onecall?lat=${this.position.lat}&lon=${this.position.lng}&cnt=6&lang=ja&appid=${process.env.VUE_APP_WEATHER}`
        );
        console.log(item);
        this.dailyWeatherData = [];
        this.dailyWeathers = [];
        this.dailyWeatherData = item.data.daily;
        for (let i = 0; i < this.dailyWeatherData.length; i++) {
          let weather = {};
          const icon = `http://openweathermap.org/img/w/${this.dailyWeatherData[i].weather[0].icon}.png`
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
    toggleMap() {
      this.map = !this.map;
    },
    toggleWeather() {
      this.weather = !this.weather;
    },
    toggleInfoWindow() {
      this.infoWindowPos = this.position;
      this.infoWinOpen = true;
    },
    favoriteData() {
      const result = this.spotData.like.some((value) => {
        return value.user_id == this.$store.state.user.id;
      });
      if (result) {
        this.like = true;
      }
    },
    favoriteDelete() {
        axios({
          method: "delete",
          url: "http://127.0.0.1:8000/api/like",
          data: {
            post_id: this.id,
            user_id: this.$store.state.user.id
          },
        }).then((response) => {
          console.log(response);
          this.like = false;
          this.spotShow()
        })
    },
    favorite() {
      axios
        .post("http://127.0.0.1:8000/api/like", {
          post_id: this.id,
          user_id: this.$store.state.user.id
        })
        .then((response) => {
          console.log(response);
          this.like = true;
          this.spotShow()
        })
    },
    spotEdit() {
      axios
        .put("http://127.0.0.1:8000/api/posts/" + this.id, {
          spotId: this.id,
          spotName: this.spotName,
          spotImg: this.spotImg,
          spotLat: this.position.lat,
          spotLng: this.position.lng
        })
        .then((response) => {
          console.log(response);
          this.spotName = '';
          this.spotImg = '';
          this.spotEditForm = false;
          this.spotShow();
        })
    },
    spotDelete() {
      axios
        .delete("http://127.0.0.1:8000/api/posts/" + this.id)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: 'Home' });
        })
    },
    commetnGet() {
      axios
        .get("http://127.0.0.1:8000/api/comments/",
          {
            params: {
              post_id: this.id
            }
          }
        )
      .then((response) => {
        console.log(response);
        this.showComments = response.data.comments;
      }) 
    },
    commentPost() {
      axios
        .post("http://127.0.0.1:8000/api/comments/", {
          post_id: this.id,
          user_id: this.$store.state.user.id,
          comment: this.spotComment,
        })
        .then((response) => {
          console.log(response);
          this.spotComment = '';
          this.commetnGet();
        })
    },
    commentDelete(commentId) {
      axios
        .delete("http://127.0.0.1:8000/api/comments/"+commentId)
        .then((response) => {
          console.log(response);
          this.commetnGet();
        })
    }
  },
  watch: {
    spotData(newSpotData) {
      if (newSpotData) {
        this.conversion();
        this.getSpotWeater();
      }
    },
  },
  created() {
    this.spotShow();
  },
  components: {
    Navi
  }
}
</script>

<style scoped>
.container {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px 10%;
}
.img-wrap {
  padding: 50px 0 20px;
}
.spot-img {
  width: 100%;
  height: 500px;
}
.weather {
  display: flex;
  justify-content: space-around;
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
.toggle-area {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.weather-area {
  margin-right: 5px;
}
.weather-button {
  color: #000;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
}
.map-button {
  color: #000;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
}
.map-button-imag {
  height: 21px;
}
.weather-button:hover {
  color: rgb(55, 101, 255);
}
.map-button:hover {
  color: rgb(55, 101, 255);
}
.map {
  width: 100%; 
  height: 300px;
  margin: 0 auto;
}
.spot-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.spot-info {
  display: flex;
}

.spot-name {
  margin: 30px;
  font-size: 25px;
  font-weight: bold;
}
.tag-flex {
  display: flex;
  align-items: center;
}
.tags {
  margin-right: 5px;
}
.bookmark {
  margin: 20px 10px;
  display: flex;
}
.bookmark p {
  margin: 0 5px;
  font-size: 20px;
}
.fav-icon {
  cursor: pointer;
}
.post-user {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.spot-text {
  width: 70%; 
  margin: 20px 0 10px 15%;
  padding: 0 0 15px 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(197, 197, 197);
}
.post-user {
  margin-bottom: 10px;
}
.user {
  width: 20%;
  text-align: center;
  cursor: pointer;
}
.user-img{ 
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-name {
  font-size: 12px;
  margin: 0;
}
.setting {
  width: 2%;
}
.setting-icon {
  cursor: pointer;
}
.comment-delete {
  width: 2%;
}
.delete-button {
  height: 20px;
  cursor: pointer;
}
.comment-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.spot-text input {
  border: none;
  width: 70%;
}
.comment-button {
  width: 20%;
  padding-left: 4%;
}
</style>
