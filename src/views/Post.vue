<template>
  <div class="post">
    <Navi />
    <div class="post-card">
      <h1 class="post-title">Post</h1>
      <div v-if="spotImg">
        <button @click="deletePreview()">X</button>
        <img :src="spotImg" class="spot-img">
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit()">
          
          <ValidationProvider name="スポットの写真" rules="required|image" v-slot="{ errors }">
            <div class="form-group">
              <label>スポットの写真</label>
              <input type="file" class="form-control" @change="confirmImage">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="スポットの名前" rules="required" v-slot="{ errors }">
            <div class="form-group">
              <label>スポットの名前</label>
              <input type="text" class="form-control" v-model="spotName">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="スポットの情報" rules="required" v-slot="{ errors }">
            <div class="form-group mb-4">
              <label>スポットの情報</label>
              <textarea class="form-control" v-model="spotText" id="" cols="30" rows="5"></textarea>
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="スポットタイプ" rules="required" v-slot="{ errors }">
            <label>スポットタイプ</label>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="ストリート" id="defaultCheck1" v-model="spotType">
              <label class="form-check-label" for="defaultCheck1">
              ストリート
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="パーク" id="defaultCheck2" v-model="spotType">
              <label class="form-check-label" for="defaultCheck2">
              パーク
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="雨スポット" id="defaultCheck3" v-model="spotType">
              <label class="form-check-label" for="defaultCheck3">
              雨スポット
              </label>
            </div>
            <span class="error">{{ errors[0] }}</span><br>
          </ValidationProvider>

          <label>スポットの位置</label>
          <GmapMap
            :center="{lat: lat, lng: lng}"
            :zoom="12"
            :options="{streetViewControl: false}"
            map-type-id="terrain"
            style="width: 100%; height: 320px"
            @click="place($event)"
          >
            <GmapMarker
              :position="position"
              :clickable="true"
              :draggable="true"
              @click="toggleInfoWindow()"
            />
          </GmapMap>
          <span class="error">{{ error }}</span><br>
          <div class="text-center">
            <button type="submit" class="btn btn-primary mt-3" tect="Submit" @click="spotPost()">投稿する</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navi from "../components/Navi";
export default {
  data() {
    return {
      lat: Number(this.$store.state.user.userLat),
      lng: Number(this.$store.state.user.userLng),
      error: '',
      spotImg: '',
      spotName: '',
      spotText: '',
      spotType: [],
      position: {
        lat: '',
        lng: ''
      },
    }
  },
  methods: {
    confirmImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = e => {
      this.spotImg = e.target.result;
      console.log(this.spotImg);
      }
    },
    deletePreview() {
      this.spotImg = '';
    },
    place(event) {
       if (event) {
        this.position.lat = event.latLng.lat()
        this.position.lng = event.latLng.lng()
        console.log(this.position)
      }
    },
    spotPost() {
      if (!this.position.lat || !this.position.lng) {
        this.error = 'マップの位置を指定してください'
      }
      axios
        .post("http://127.0.0.1:8000/api/posts", {
          userId: this.$store.state.user.id,
          spotName: this.spotName,
          spotText: this.spotText,
          spotImg: this.spotImg,
          spotType: this.spotType,
          spotLat: this.position.lat,
          spotLng: this.position.lng,
          rain: this.rain
        })
        .then((response) => {
          console.log(response);
          console.log(response.data.data)
          this.$router.push('/');
          
        })
    }
  },
  components: {
    Navi
  }
}
</script>

<style scoped>
.post {
  height: 100%;
}
.post-card {
  height: 80%;
  width: 70%;
  margin: 100px auto;
  padding: 15px 30px 30px;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.post-title {
  margin-top: 10px;
  text-align: center;
}
.spot-img {
  height: 300px;
  width: 80%;
}
.error {
  color: #fb0101;
}
</style>
