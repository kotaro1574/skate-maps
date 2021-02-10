<template>
  <div class="spot">
    <img :src="spot.spotImg" alt="" class="spot-img">
    <Map />
    <div class="spot-content">
      <h3 class="spot-title">{{ spot.spotName }}</h3>
      <button @click="spotEditToggle()">設定</button>
      <div class="spot-edit-form" v-if="spotEditForm">
        <p><input placeholder="スポットの名前" type="text" v-model="spotName" /></p>
        <p><input type="file" @change="confirmImage" /></p>
        <div v-if="spotImg">
          <button @click="deletePreview()">X</button>
          <img :src="spotImg" class="spot-edit-img">
        </div>
        <button @click="spotEdit()">編集する</button>
      </div>
    </div>
    <button @click="spotDelete()">削除</button>
  </div>
</template>

<script>
import axios from "axios";
import Map from "../components/Map";
export default {
  props: ["id"],
  data() {
    return {
      spot: '',
      spotName: '',
      spotImg: '',
      spotEditForm: false
    }
  },
  methods: {
    spotShow() {
      axios
        .get("http://127.0.0.1:8000/api/posts/" + this.id)
        .then((response) => {
          console.log(response)
          this.spot = response.data;
          console.log(this.spot)
        })
    },
    spotEditToggle() {
      this.spotEditForm = !this.spotEditForm;
    },
    confirmImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = e => {
        this.spotImg = e.target.result;
        console.log(this.spotImg);
      }
    },
    spotEdit() {
      axios
        .put("http://127.0.0.1:8000/api/posts/" + this.id, {
          spotId: this.id,
          spotName: this.spotName,
          spotImg: this.spotImg
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
    }
  },
  created() {
    this.spotShow()
    console.log(this.id);
  },
  components: {
    Map
  }
}
</script>

<style scoped>
.spot-img {
  width: 100%;
  height: 1000px;
}
.spot-edit-img {
  width: 40%;
  height: 300px;
}
</style>
