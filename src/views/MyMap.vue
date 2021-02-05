<template>
  <div class="mymap">
    <div class="profile">
      <img src="../assets/IMG_4195 2.jpg" alt="" class="profile-img">
      <h3 class="profile-name">{{ name }} </h3>
      <p>広島でスケボーしています!</p>
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
      name: this.$store.state.user.name
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
