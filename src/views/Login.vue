<template>
  <div class="login">
    <div class="login-card">
      <h1 class="login-title">Log in</h1>
      <span>{{ $store.state.error }}</span>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit()">
          
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

          <button type="submit" class="btn btn-primary mt-3" tect="Submit" @click="auth">ログイン</button>
        </form>
      </ValidationObserver>
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
