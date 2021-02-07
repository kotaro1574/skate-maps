<template>
  <div class="signup">
    <div class="signup-card">
      <h1 class="signup-title">Sign up</h1>
      <div class="form">
        <p v-if="errors.length">
          <ul>
            <li v-for="(error, index) in errors" :key="index" style="color: red;">{{ error }}</li>
          </ul>
        </p>
        <p><input placeholder="ユーザーネーム" type="text" v-model="name" /></p>
        <p><input placeholder="メールアドレス" type="email" v-model="email" /></p>
        <p><input placeholder="パスワード" type="password" v-model="password" /></p>
        <p><input placeholder="住所" type="text" v-model="address" /></p>
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
      errors: [],
      name: '',
      email: '',
      password: '',
      address: ''
    }
  },
  methods: {
    checkForm(e) {
      this.errors = [];
      console.log(this.errors);
      if (!this.name) {
        this.errors.push('名前を入力してください');
      }
      if (!this.email) {
        this.errors.push("メールアドレスを入力してください");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("有効なメールアドレスを入力してください")
      }

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    },
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
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
