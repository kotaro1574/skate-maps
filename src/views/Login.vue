<template>
  <div class="login">
    <Navi />
    <div class="login-card">
      <h1 class="login-title">Log in</h1>
      <div class="alert alert-danger" role="alert" v-if="$store.state.error">
        <span>{{ $store.state.error }}</span>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit()">
          
          <ValidationProvider name="メールアドレス" rules="required|email" v-slot="{ errors }">
            <div class="form-group">
              <label>メールアドレス</label>
              <input type="email" class="form-control" v-model="email">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          
          <ValidationProvider name="パスワード" rules="required|max:12|min:6" v-slot="{ errors }">
            <div class="form-group">
              <label>パスワード</label>
              <input type="password" class="form-control" v-model="password">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <div class="text-center">
            <button type="submit" class="btn btn-primary mt-3" tect="Submit" @click="auth">ログイン</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi";
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    auth() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      })
    }
  },
  components: {
  Navi
  }
}
</script>

<style scoped>
.login {
  height: 100%;
}
.login-title {
  margin-bottom: 25px;
  text-align: center;
}
.login-card {
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
.error {
  color: #fb0101;
}
</style>
