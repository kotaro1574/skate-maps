<template>
  <div class="signup">
    <div class="signup-card">
      <h1 class="signup-title">新規登録</h1>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit()">
          <ValidationProvider name="名前" rules="required" v-slot="{ errors }">
            <div class="form-group">
              <label>名前</label>
              <input type="text" class="form-control" v-model="name">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="メールアドレス" rules="required|email" v-slot="{ errors }">
            <div class="form-group">
              <label>メールアドレス</label>
              <input type="email" class="form-control" v-model="email">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          
          <ValidationProvider name="パスワード" rules="required|max:12|min:6" v-slot="{ errors }">
            <div class="form-group">
              <label>パスワード</label>
              <input type="password" class="form-control" v-model="password">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

            <label>マップの中心を選択してください</label>
            <GmapMap
              :center="{lat: 34.39146551179752, lng: 132.46128012819383}"
              :zoom="12"
              :options="{streetViewControl: false}"
              map-type-id="terrain"
              style="width: 100%; height: 400px"
              @click="place($event)"
            >
             <GmapMarker
                :position="position"
                :clickable="true"
                :draggable="true"
              />
            </GmapMap>
            <span>{{ error }}</span><br>
            <div class="text-center">
              <button type="submit" class="btn btn-primary mt-3" tect="Submit" @click="auth">新規登録</button>
            </div>
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
      name: '',
      email: '',
      password: '',
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
      if (!this.position.lat || !this.position.lng) {
        this.error = 'マップの位置を指定してください'
      }
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
      }
    }
  }
</script>

<style scoped>
.signup {
  height: 1000px;
}
.signup-card {
  height: 900px;
  width: 70%;
  margin: 100px auto;
  padding: 15px 30px 30px;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;  
}
.signup-title {
  margin-bottom: 25px;
  text-align: center;
}
</style>
