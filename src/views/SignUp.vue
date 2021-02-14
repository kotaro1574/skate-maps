<template>
  <div class="signup">
    <div class="signup-card">
      <h1 class="signup-title">Sign up</h1>
      <div class="form">
        <p><input placeholder="ユーザーネーム" type="text" v-model="name" /></p>
        <p><input placeholder="メールアドレス" type="email" v-model="email" /></p>
        <p><input placeholder="パスワード" type="password" v-model="password" /></p>
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
        <button type="submit" @click="auth">新規登録</button>
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
      email: '',
      position: {
        lat: '',
        lng: ''
      },
      address: ''
    }
  },
  methods: {
    place(event) {
       if (event) {
        this.position.lat = event.latLng.lat()
        this.position.lng = event.latLng.lng()
        console.log(this.position)
      }
    },
    auth() {
      axios
        .post("http://127.0.0.1:8000/api/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          userLat: this.position.lat,
          userLng: this.position.lng,
        })
        .then(response => {
          console.log(response);
          this.$router.replace("/");
        })
        .catch(error => {
          alert(error);
        });
      }
    }
  }
</script>

<style scoped>
.signup {
  height: 700px;
}
.signup-card {
  height: 500px;
  width: 70%;
  margin: 100px auto;
  border: 1px solid #000;
  border-radius: 5px;
}
.signup-title {
  margin-top: 10px;
  text-align: center;
}
</style>
