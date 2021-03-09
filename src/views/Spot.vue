<template>
  <div class="spot">
    <Navi />
    <div class="container">
      <div class="img-wrap">
        <hooper class="spot-img">
          <slide v-for="(image, index) in spotData.image" :key="index" class="spot-img">
              <img :src="image.path" alt="" class="spot-img">
          </slide>
        </hooper>
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
      <div class="bookmark" v-if="$store.state.auth" >
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
        <b-icon class="setting-icon" icon="gear" @click="$router.push({ name: 'SpotEdit' })" v-if="$store.state.user.id == spotData.spot.user_id && $store.state.auth"></b-icon>
      </div>
    </div>
    <div class="spot-content">
      <div class="comment-area" v-for="(comments, index) in showComments" :key="index">
        <div class="post-user">
          <p class="spot-text">{{ comments.comment.comment }}</p>
          <div class="user" @click="$router.push({ path: '/mymap/'+ comments.commentUser.id, params: { id: comments.commentUser.id } })">
            <img :src="comments.commentUser.image" class="user-img" v-if="comments.commentUser.image">
            <img src="../assets/profile_icon.png" alt="" class="user-img" v-if="!comments.commentUser.image">
            <p class="user-name">{{ comments.commentUser.name }}</p>
          </div>
          <div class="comment-delete">
            <b-icon icon="trash" class="delete-button" @click="alert(comments.comment.id)" v-if="$store.state.user.id == comments.commentUser.id"></b-icon>
          </div>
        </div>
      </div>
      <div class="comment-form" v-if="$store.state.auth">
        <p class="spot-text"><input placeholder="+ spotの情報を追加しよう" type="text" v-model="spotComment" /></p>
        <div class="comment-button">
          <button @click="commentPost()" type="button" class="btn btn-primary">投稿</button>
        </div>
      </div>
    </div>

    <div class="border"></div>
      <div class="best-title">Best trick
        <span> (Video)  </span>
        <b-icon class="best-icon" icon="cloud-plus" @click="toggleBestForm()" v-if="$store.state.auth" ></b-icon>
      </div>
      <div class="file-form" v-if="bestTrick">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit()">
            <ValidationProvider name="動画" rules="required|image" v-slot="{ errors }">
            <div class="form-group">
              <label class="best-label">このスポットの Best trick 動画を投稿しよう</label>
              <input type="file" class="form-control" ref="file" @change="confirm">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <div class="text-center">
            <button type="submit" class="btn btn-primary mt-3" tect="Submit" @click="filePost()">投稿</button>
          </div>
        </form>
        </ValidationObserver>
      </div>

      <div class="best-tricks">
        <div class="best-trick" v-for="(item, index) in files" :key="index" >
          <div class="image-wrap">
            <video :src="item.file.path" alt="" class="best-img" @click="openModal(item)"></video>
          </div>
        </div>
        <Modal :val="postItem" v-show="showContent" @close="closeModal" />
       </div>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import axios from "axios";
import Navi from "../components/Navi";
import Modal from "../components/Modal";
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
      bestTrick: false,
      file: '',
      files: [],
      showContent: false,
      postItem: '',
    }
  },
  methods: {
    async  fileGet() {
      let file = [];
      const files = await axios.get(process.env.VUE_APP_SKATE_MAPS_API + "/api/besttricks", {params: {id: this.id}})
        console.log(files);
      for (let i = 0; i < files.data.data.length; i++) {
        console.log(files.data.data[i].id);
        await axios
          .get(process.env.VUE_APP_SKATE_MAPS_API + "/api/besttricks/" + files.data.data[i].id, {
            params: {
              id: files.data.data[i].id
          }
          })
          .then((response) => {
            file.push(response.data);
          })
      }
      this.files = file;
      console.log(this.files);
    },
    confirm() {
      console.log(this.$refs.file.files)
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    filePost() {
      console.log(this.file);
      let data = new FormData();
      data.append('spot_id', this.id);
      data.append('user_id', this.$store.state.user.id);
      data.append('file', this.file);
      console.log(data.get('file'));
      axios
        .post(process.env.VUE_APP_SKATE_MAPS_API + "/api/besttricks", data, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
          console.log(response.data);
          this.file = '';
          this.bestTrick = false;
          this.fileGet();
        })
    },
    openModal(item) {
      this.showContent = true
      this.postItem = item
    },
    closeModal(update) {
      this.showContent = false
      if (update) {
        this.fileGet();
      }
    },
    async spotShow() {
      await axios
        .get(process.env.VUE_APP_SKATE_MAPS_API + "/api/posts/" + this.id)
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
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.position.lat}&lon=${this.position.lng}&cnt=6&lang=ja&appid=${process.env.VUE_APP_WEATHER}`
        );
        console.log(item);
        this.dailyWeatherData = [];
        this.dailyWeathers = [];
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
          url: process.env.VUE_APP_SKATE_MAPS_API + "/api/like",
          data: {
            post_id: this.id,
            user_id: this.$store.state.user.id
          },
        }).then((response) => {
          console.log(response);
          this.like = false;
          this.spotShow();
        })
    },
    favorite() {
      axios
        .post(process.env.VUE_APP_SKATE_MAPS_API + "/api/like", {
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
        .put(process.env.VUE_APP_SKATE_MAPS_API + "/api/posts/" + this.id, {
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
        .delete(process.env.VUE_APP_SKATE_MAPS_API + "/api/posts/" + this.id)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: 'Home' });
        })
    },
    commentGet() {
      axios
        .get(process.env.VUE_APP_SKATE_MAPS_API + "/api/comments/",
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
        .post(process.env.VUE_APP_SKATE_MAPS_API + "/api/comments/", {
          post_id: this.id,
          user_id: this.$store.state.user.id,
          comment: this.spotComment,
        })
        .then((response) => {
          console.log(response);
          this.spotComment = '';
          this.commentGet();
        })
    },
    alert(id) {
      this.$swal({
       title: "確認",
       text: "削除しますか？",
       icon: "warning",
       buttons: true,
       dangerMode: true,
     })
     .then((willDelete) => {
       if (willDelete) {
         this.commentDelete(id);
         this.$swal("削除されました。", {
           icon: "success",
         });
       } else {
         this.$swal("Cancelされました。");
       }
      });
    },
    commentDelete(id) {
      axios
        .delete(process.env.VUE_APP_SKATE_MAPS_API + "/api/comments/"+id)
        .then((response) => {
          console.log(response);
          this.commentGet();
        })
    },
    toggleBestForm() {
      this.bestTrick = !this.bestTrick;
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
  mounted() {
    this.fileGet();

  },
  components: {
    Navi,
    Modal,
    Hooper,
    Slide
  }
}
</script>

<style scoped>
.spot {
  height: 100%;
}
.container {
  height: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px 10%;
}
.img-wrap {
  padding: 50px 0 20px;
}
.spot-img {
  width: 100%;
  height: 500px;
  border-radius: 5px;
  cursor: pointer;
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
  margin: 30px 30px 30px 0;
  font-size: 25px;
  font-weight: bold;
}
.tag-flex {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
  margin: 20px 10px 10px 15%;
  padding: 0 0 15px 30px;
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
  color: rgb(100, 100, 100);
  cursor: pointer;
}
.setting-icon:hover {
  color: rgb(55, 101, 255);
}
.comment-delete {
  width: 2%;
}
.delete-button {
  height: 20px;
  color: rgb(100, 100, 100);
  cursor: pointer;
}
.delete-button:hover {
  color: rgb(255, 73, 73);
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

.border {
  margin: 50px 0;
  border: 1px solid #000;
}
.best-title {
  font-size: 25px;
  font-weight: bold;
}
.best-icon {
  cursor: pointer;
  font-size: 30px;
  margin: 0 5px;
}
.best-icon:hover {
  color: rgb(96, 120, 255);
}
.best-title span {
  font-size: 15px;
  font-weight: normal;
}
.best-label {
  color: rgb(153, 153, 153);
}
.best-tricks {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 50px;
}
.image-wrap {
  height: 240px;
  margin-top: 50px;
  border-radius: 5px;
}
.best-img {
  background: #c6c8ca;
  border-radius: 5px;
  height: 240px;
  width: 240px;
  cursor: pointer;
}
.image-wrap:hover {
  box-shadow: 10px 10px 10px rgba(0,0,0,0.5);
  transform: translateY(-10px);
  transition-duration: 0.5s;
}
.error {
  color: #fb0101;
}
@media screen and (max-width: 812px) {
  .img-wrap {
    padding: 30px 0 20px;
  }
  .spot-img {
    height: 400px;
  }
  .map {
    height: 200px;
  }
  .best-tricks {
    margin-bottom: 40px;
  }
  .image-wrap {
    height: 180px;
    margin-top: 30px;
  }
  .best-img {
    height: 180px;
    width: 180px;
    cursor: pointer;
  }
}

@media screen and (max-width: 450px) {
  .img-wrap {
    padding: 10px 0 20px;
  }
  .spot-img {
    height: 300px;
  }
  .map {
    height: 150px;
  }
  .spot-info {
    display: block;
  }
  .user-img{ 
    width: 30px;
    height: 30px;
  }
  .user-name {
    font-size: 8px;
  }
  .comment-button button {
    font-size: 12px;
    padding: 5px;
  }
  .image-wrap {
    height: 90px;
    margin: 20px 5px 0;
  }
  .best-img {
    height: 90px;
    width: 90px;
    cursor: pointer;
  }
}
</style>
