<template>
  <div class="mymapedit">
    <div class="mymapedit-card">
      <h1 class="mymapedit-title">プロフィール編集</h1>
      <div v-if="profileImg">
        <button @click="deletePreview()">X</button>
        <img :src="profileImg" class="profile-img">
      </div>
      <div class="form">
        <input placeholder="ユーザーネーム" type="text" v-model="name" />
        <input placeholder="プロフィール" type="text" v-model="profile" />
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
          />
        </GmapMap>
        <button type="submit" @click="userEdit()">編集</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: '',
      profile: '',
      position: {
        lat: '',
        lng: ''
      },
      profileImg: ''
    }
  },
  methods: {
    confirmImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = e => {
        this.profileImg = e.target.result;
        console.log(this.profileImg);
      }
    },
    deletePreview() {
      this.profileImg = '';
    },
    place(event) {
       if (event) {
        this.position.lat = event.latLng.lat()
        this.position.lng = event.latLng.lng()
        console.log(this.position)
      }
    },
    userEdit() {
      axios
      .put("http://127.0.0.1:8000/api/user", {
        email: this.$store.state.user.email,
        name: this.name,
        profile: this.profile,
        userLat: this.position.lat,
        userLng: this.position.lng,
        file: this.profileImg
      })
      .then((response) => {
        console.log(response);
        this.$store.dispatch("updateUserData", {
          email: this.$store.state.user.email
        });
      })
    }
  }
}
</script>

<style scoped>
.mymapedit {
  height: 700px;
}
.mymapedit-card {
  height: 500px;
  width: 70%;
  margin: 100px auto;
  border: 1px solid #000;
  border-radius: 5px;
}
.mymapedit-title {
  margin-top: 10px;
  text-align: center;
}
.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 100px 0 50px;
}
</style>
