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
              <input type="file" ref="file" class="form-control" @change="confirm">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          
          <ValidationProvider name="instagramURL" rules="max:255" v-slot="{ errors }">
            <div class="form-group">
              <label>instagramURL</label>
              <input type="text" class="form-control" v-model="instagramURL">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="twitterURL" rules="max:255" v-slot="{ errors }">
            <div class="form-group">
              <label>twitterURL</label>
              <input type="text" class="form-control" v-model="twitterURL">
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
          class="map"
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
      name: this.$store.state.user.name,
      profile: this.$store.state.user.profile,
      profileImg: this.$store.state.user.image,
      position: {
        lat: Number(this.$store.state.user.userLat),
        lng: Number(this.$store.state.user.userLng)
      },
      file: this.$store.state.user.image,
      instagramURL: this.$store.state.user.instagramURL,
      twitterURL: this.$store.state.user.twitterURL,
    }
  },
  methods: {
    confirm() {
      console.log(this.$refs.file.files)
      this.file = this.$refs.file.files[0];
      console.log(this.file);
      this.confirmImage(this.file);
    },
    confirmImage(file) {
      const image = file;
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = e => {
        this.profileImg = e.target.result;
        console.log(this.profileImg);
      }
    },
    deletePreview() {
      this.profileImg = '';
      this.file = '';
    },
    place(event) {
       if (event) {
        this.position.lat = event.latLng.lat()
        this.position.lng = event.latLng.lng()
        console.log(this.position)
      }
    },
    userEdit() {
      let formData = new FormData();
      formData.append('id', this.$store.state.user.id);
      formData.append('name', this.name);
      formData.append('profile', this.profile);
      formData.append('userLat', this.position.lat);
      formData.append('userLng', this.position.lng);
      formData.append('file', this.file);
      formData.append('instagramURL', this.instagramURL);
      formData.append('twitterURL', this.twitterURL);
      axios
      .post("http://127.0.0.1:8000/api/user/" + this.$store.state.user.id, formData, { 
        headers: {'X-HTTP-Method-Override': 'PUT'}
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
.map {
  width: 100%;
  height: 320px
}

@media screen and (max-width: 768px) {
  .map {
    height: 250px;
  }
}

@media screen and (max-width: 450px) {
  .map {
    height: 150px;
  }
}
</style>
