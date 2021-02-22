<template>
  <div class="mymapedit">
    <Navi />
    <div class="mymapedit-card">
      <h1 class="mymapedit-title">プロフィール編集</h1>
      <div v-if="profileImg" class="profile-image">
        <img :src="profileImg" class="profile-img">
        <div class="img-delete" @click="deletePreview()">X</div>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit()">

          <ValidationProvider name="プロフィール写真" rules="image" v-slot="{ errors }">
            <div class="form-group">
              <label>プロフィール写真</label>
              <input type="file" class="form-control" @change="confirmImage">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          
          <ValidationProvider name="名前" rules="max:255" v-slot="{ errors }">
            <div class="form-group">
              <label>名前</label>
              <input type="text" class="form-control" v-model="name">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          
          <ValidationProvider name="プロフィール" rules="max:600" v-slot="{ errors }">
            <div class="form-group">
              <label>プロフィール</label>
              <textarea class="form-control" v-model="profile" id="" cols="30" rows="5"></textarea>
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

        <label>マップの位置</label>
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
          />
        </GmapMap>
          <div class="text-center">
            <button type="submit" class="btn btn-primary mt-3" tect="Submit" @click="userEdit()">編集</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navi from "../components/Navi"
export default {
  data() {
    return {
      lat: Number(this.$store.state.user.userLat),
      lng: Number(this.$store.state.user.userLng),
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
  },
  components: {
    Navi
  }
}
</script>

<style scoped>
.mymapedit {
  height: 100%;
}
.mymapedit-card {
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
.mymapedit-title {
  margin-bottom: 25px;
  text-align: center;
}

.profile-image {
  position: relative;

  text-align: center;
}
.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 15px;
}
.img-delete {
  position: absolute;
  right: 40%;
  bottom: 15%;
  cursor: pointer;
}
.error {
  color: #fb0101;
}
</style>
