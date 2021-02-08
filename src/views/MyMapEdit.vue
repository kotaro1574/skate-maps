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
        <input placeholder="住所" type="text" v-model="address" />
        <p><input type="file" name="file" @change="confirmImage"></p>
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
      address: '',
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
    userEdit() {
      axios
      .put("http://127.0.0.1:8000/api/user", {
        email: this.$store.state.user.email,
        name: this.name,
        profile: this.profile,
        address: this.address,
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
