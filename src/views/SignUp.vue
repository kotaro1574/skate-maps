<template>
  <div class="signup">
    <div class="signup-card">
      <h1 class="signup-title">Sign up</h1>
      <div class="form">
        <input placeholder="ユーザーネーム" type="text" v-model="name" />
        <input placeholder="メールアドレス" type="email" v-model="email" />
        <input placeholder="パスワード" type="password" v-model="password" />
        <input placeholder="住所" type="text" v-model="address" />
        <button @click="auth">新規登録</button>
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
      password: '',
      address: ''
    }
  },
  methods: {
    auth() {
      axios
        .post("http://127.0.0.1:8000/api/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          address: this.address
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
