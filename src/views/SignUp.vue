<template>
  <div class="signup">
    <div class="signup-card">
      <h1 class="signup-title">Sign up</h1>
      <div>
        <b-form-group id="fieldset-1" 
          label="name" 
          label-for="input-1" 
        >
          <b-form-input id="input-1" v-model="name" trim></b-form-input>
        </b-form-group>
      </div>
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
      <div>
        <b-form-group id="fieldset-1" 
          label="address" 
          label-for="input-1" 
        >
          <b-form-input id="input-1" v-model="address" trim></b-form-input>
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
        name: '',
        email: '',
        password: '',
        address: ''
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
