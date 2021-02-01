<template>
  <div class="home">
    <div class="home-img">
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
.home-img {
  height: 600px;
  background: url("../assets/top.jpg");
}
</style>
