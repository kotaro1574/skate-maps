<template>
  <div class="post">
    <div class="post-card">
      <h1 class="post-title">Post</h1>
      <div v-if="spotImg">
        <button @click="deletePreview()">X</button>
        <img :src="spotImg" class="spot-img">
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit()">

          <ValidationProvider name="スポットの名前" rules="required" v-slot="{ errors }">
            <div class="form-group">
              <label>スポットの名前</label>
              <input type="text" class="form-control" v-model="spotName">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="スポットの写真" rules="required|image" v-slot="{ errors }">
            <div class="form-group">
              <label>スポットの写真</label>
              <input type="file" class="form-control" @change="confirmImage">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <GmapMap
            :center="{lat: 34.39146551179752, lng: 132.46128012819383}"
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
          <span>{{ error }}</span><br>
        <button type="submit" class="btn btn-primary mt-3" tect="Submit" @click="spotPost()">投稿する</button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      error: '',
      spotName: '',
      spotImg: '',
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
      console.log(
        this.error,
        this.spotName,
        this.position.lat,
        this.position.lng
      )
      axios
        .post("http://127.0.0.1:8000/api/posts", {
          userId: this.$store.state.user.id,
          spotName: this.spotName,
          spotImg: this.spotImg,
          spotLat: this.position.lat,
          spotLng: this.position.lng,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data.data)
          this.$router.push('/');
          
        })
    }
  }
}
</script>

<style scoped>
.post {
  height: 700px;
}
.post-card {
  height: 500px;
  width: 70%;
  margin: 100px auto;
  border: 1px solid #000;
  border-radius: 5px;
}
.post-title {
  margin-top: 10px;
  text-align: center;
}
.spot-img {
  height: 300px;
  width: 80%;
}
</style>
