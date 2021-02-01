<template>
  <div class="mymap">
    <div class="profile">
      <img src="../assets/IMG_4195 2.jpg" alt="" class="profrle-img">
      <h3 class="profile-name">Ktalow1574</h3>
      <p>広島でスケボーしています!</p>
    </div>
    <Map />
    <Cards />
  </div>
</template>

<script>
import Map from "../components/Map";
import Cards from "../components/Cards";
export default {
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
.profrle-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 100px 0 50px;
}
.profile-name {
  margin-bottom: 30px;
}
</style>
