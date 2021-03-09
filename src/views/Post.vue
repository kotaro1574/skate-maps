<template>
  <div class="post">
    <Navi />
    <div class="post-card">
      <h1 class="post-title">Post</h1>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit()">
          
          <ValidationProvider name="スポットの写真" rules="required|image" v-slot="{ errors }">
            <div class="form-group">
              <label>スポットの写真</label>
              <input type="file" class="form-control" id="files" ref="files" multiple @change="handleFilesUploads()">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <hooper class="image-hooper" v-if="confirmImg">
            <slide v-for="(image, index) in confirmImg" :key="index" class="image-slide">
                <img :src="image" alt="" class="spot-img">
            </slide>
          </hooper>

          <ValidationProvider name="スポットの名前" rules="required|max:150" v-slot="{ errors }">
            <div class="form-group">
              <label>スポットの名前</label>
              <input type="text" class="form-control" v-model="spotName">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="スポットの情報" rules="required|max:500" v-slot="{ errors }">
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
            class="map"
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
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import axios from "axios";
import Navi from "../components/Navi";
export default {
  data() {
    return {
      lat: Number(this.$store.state.user.userLat),
      lng: Number(this.$store.state.user.userLng),
      error: '',
      files: '',
      confirmImg: '',
      spotName: '',
      spotText: '',
      spotType: [],
      position: {
        lat: '',
        lng: ''
      },
      spotId: '',
    }
  },
  methods: {
    handleFilesUploads(){
      this.files = this.$refs.files.files;
      console.log(this.files);
      this.confirmImage();
    },
    confirmImage() {
      let confirmImg = [];
      for (let i = 0; i < this.files.length; i++) {
        const image = this.files[i];
        console.log(image);
        const reader = new FileReader();
        reader.readAsDataURL(image);
  
        reader.onload = e => {
        const url = e.target.result;
        confirmImg.push(url)
        console.log(confirm);
        }
      }
      this.confirmImg = confirmImg;
      console.log(this.confirmImg)
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
      
      axios.post(process.env.VUE_APP_SKATE_MAPS_API + "/api/posts", {
        userId: this.$store.state.user.id,
        spotName: this.spotName,
        spotText: this.spotText,
        spotType: this.spotType,
        spotLat: this.position.lat,
        spotLng: this.position.lng
      }
      ).then((response) => {
        console.log(response.data.data);
        this.spotImgPost(response.data.data.id);
      })
    },
    spotImgPost(id) {
      let formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append('file['+i+']', file);
      }
      formData.append('post_id', id)
      console.log(formData);
      axios.post(process.env.VUE_APP_SKATE_MAPS_API + "/api/files", formData, { 
        headers: {'Content-Type': 'multipart/form-data'}
      })
      .then((response) => {
        console.log(response)
        this.$router.push('/');
      })
    }
  },
  components: {
    Navi,
    Hooper,
    Slide
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
.image-hooper {
  height: 400px;
  width: 100%;
  margin-bottom: 15px;
}
.image-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.spot-img {
  height: 350px;
  width: 80%;
  border-radius: 5px;
}
.error {
  color: #fb0101;
}
.map {
  width: 100%; 
  height: 320px
}

@media screen and (max-width: 768px) {
  .image-hooper {
    height: 300px;
  }
  .spot-img {
    height: 300px;
  }
  .map {
    height: 250px;
  }
}

@media screen and (max-width: 450px) {
  .image-hooper {
    height: 150px;
  }
  .spot-img {
    height: 150px;
  } 
  .map {
    height: 150px;
  }
}
</style>
