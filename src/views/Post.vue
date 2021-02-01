<template>
  <div class="post">
    <div class="post-card">
      <h1 class="post-title">Post</h1>
      <div>
        <b-form-group id="fieldset-1" 
          label="title" 
          label-for="input-1" 
        >
          <b-form-input id="input-1" v-model="title" trim></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group id="fieldset-1" 
          label="information" 
          label-for="input-1" 
        >
          <b-form-input id="input-1" v-model="information" trim></b-form-input>
        </b-form-group>
      </div>
      <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
      <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
      <div>
        <b-form-group id="fieldset-1" 
          label="address" 
          label-for="input-1" 
        >
          <b-form-input id="input-1" v-model="address" trim></b-form-input>
        </b-form-group>
      </div>
      <button>投稿する</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        information: '',
        file: null,
        address: ''
      }
    }
  }
</script>

<style scoped>
.post {
  height: 700px;
}
.post-card {
  height: 500px;
  width: 70%;
  margin: 100px auto;
  border: 1px solid #000;
  border-radius: 5px;
}
.post-title {
  margin-top: 10px;
  text-align: center;
}
</style>
