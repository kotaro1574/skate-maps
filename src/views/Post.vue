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
        <input placeholder="スポットの住所" type="text" v-model="spotAddress" />
        <p><input type="file" name="file" @change="confirmImage"></p>
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
      spotAddress: '',
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
    spotPost() {
      axios
        .post("http://127.0.0.1:8000/api/posts", {
          spotName: this.spotName,
          spotAddress: this.spotAddress,
          spotImg: this.spotImg
        })
        .then((response) => {
          console.log(response);
          this.spotName = '',
          this.spotAddress = '',
          this.spotImg = '',
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true
          })
        })
      this.$router.push('/spot');
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
