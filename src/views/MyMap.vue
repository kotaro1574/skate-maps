<template>
  <div class="mymap">
    <div class="profile">
      <img :src="userImg" alt="" class="profile-img">
      <h3 class="profile-name">{{ name }} </h3>
      <p>{{ profile }}</p>
      <p>
      {{userImag}}
      </p>
      <button @click="$router.push({ name: 'MyMapEdit' })">編集</button>
    </div>
    <Map />
    <Cards />
  </div>
</template>

<script>
import Map from "../components/Map";
import Cards from "../components/Cards";
export default {
  data() {
    return {
      name: this.$store.state.user.name,
      profile: this.$store.state.user.profile,
      userImg: this.$store.state.userImag
    }
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
