<template>
  <div class="login">
    <div class="login-card">
      <h1 class="login-title">Log in</h1>
      <div>
        <b-form-group id="fieldset-1" 
          label="email" 
          label-for="input-1" 
        >
          <b-form-input id="input-1" v-model="email" trim></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group id="fieldset-1" 
          label="password" 
          label-for="input-1"  
        >
          <b-form-input id="input-1" v-model="password" trim></b-form-input>
        </b-form-group>
      </div>
      <button>ログイン</button>
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
