<template>
  <div class="post">
    <div class="post-card">
      <h1 class="post-title">Post</h1>
      <div v-if="spotImg">
        <button @click="deletePreview()">X</button>
        <img :src="spotImg" class="spot-img">
      </div>
      <div class="form">
        <input placeholder="スポットの名前" type="text" v-model="spotName" />
        <p><input type="file" name="file" @change="confirmImage"></p>
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
        <button @click="spotPost()">投稿する</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      spotName: '',
      position: {
        lat: '',
        lng: ''
      },
      spotImg: '',
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
      axios
        .post("http://127.0.0.1:8000/api/posts", {
          spotName: this.spotName,
          spotLat: this.position.lat,
          spotLng: this.position.lng,
          spotImg: this.spotImg
        })
        .then((response) => {
          console.log(response);
          this.spotName = '',
          this.position.lat = '',
          this.position.lng = '',
          this.spotImg = '',
          console.log(response.data.data)
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true
          })
        })
      this.$router.push('/');
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
