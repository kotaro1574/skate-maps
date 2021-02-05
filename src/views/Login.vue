<template>
  <div class="login">
    <div class="login-card">
      <h1 class="login-title">Log in</h1>
      <div class="form">
        <input type="email" placeholder="メールアドレス" v-model="email" />
        <input type="password" placeholder="パスワード" v-model="password" />
        <button @click="auth">ログイン</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      auth() {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        })
      }
    }
  }
</script>

<style scoped>
.login {
  height: 700px;
}
.login-card {
  height: 500px;
  width: 70%;
  margin: 100px auto;
  border: 1px solid #000;
  border-radius: 5px;
}
.login-title {
  margin-top: 10px;
  text-align: center;
}
</style>
