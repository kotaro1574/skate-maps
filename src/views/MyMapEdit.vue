<template>
  <div class="mymapedit">
    <div class="mymapedit-card">
      <h1 class="mymapedit-title">プロフィール編集</h1>
      <div v-if="confirmedImage">
        <button @click="deletePreview()">X</button>
        <img :src="confirmedImage" class="profile-img">
      </div>
      <div class="form">
        <input placeholder="ユーザーネーム" type="text" v-model="name" />
        <input placeholder="プロフィール" type="text" v-model="profile" />
        <input placeholder="住所" type="text" v-model="address" />
        <p><input type="file" @change="confirmImage"></p>
        <button @click="userEdit()">編集</button>
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
      profileimg: '',
      confirmedImage: ''
    }
  },
  methods: {
    confirmImage(e) {
      this.profileimg = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.profileimg);
      reader.onload = e => {
        this.confirmedImage = e.target.result;
      }
    },
    deletePreview() {
      this.confirmedImage = '';
    },
    userEdit() {
      const data = new FormData();
      data.append('file', this.profileimg);
      axios
      .put("http://127.0.0.1:8000/api/user", {
        email: this.$store.state.user.email,
        name: this.name,
        profile: this.profile,
        address: this.address,
        file: data
      })
      .then((response) => {
        this.$store.dispatch("updateUserData");
        console.log(response);
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
