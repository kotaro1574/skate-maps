<template>
  <div class="mymap">
    <div class="profile">
      <img :src="userImg" alt="" class="profile-img">
      <h3 class="profile-name">{{ name }} </h3>
      <p>{{ profile }}</p>
      <button 
        @click="$router.push({ name: 'MyMapEdit' })"
        v-if="$store.state.user.id == this.id"
      >編集</button>
    </div>
    <Map />
    <Cards />
  </div>
</template>

<script>
import axios from "axios";
import Map from "../components/Map";
import Cards from "../components/Cards";
export default {
  props: ["id"],
  data() {
    return {
      name: '',
      profile: '',
      userImg: ''
    }
  },
  methods: {
    async getUser() {
      if (this.id == this.$store.state.user.id) {
        this.name = this.$store.state.user.name
        this.profile = this.$store.state.user.profile
        this.userImg = this.$store.state.user.image
      } else {
        await axios
                .get("http://127.0.0.1:8000/api/user/"+this.id)
                .then((response) => {
                  console.log(response.data.data)
                  this.name = response.data.data.name
                  this.profile = response.data.data.profile
                  this.userImg = response.data.data.image
                })
      }
    }
  },
  created() {
    this.getUser()
  },
  components: {
    Map,
    Cards
  }
}
</script>

<style scoped>
.profile {
  text-align: center;
}
.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 100px 0 50px;
}
.profile-name {
  margin-bottom: 30px;
}
</style>
