<template>
  <div class="spot">
    <img src="../assets/senda.jpeg" alt="" class="spot-img">
    <Map />
    <div class="spot-content">
      <h3 class="spot-title">千田公園</h3>
      <p class="spot-infomation">6段ステア！3段ステア！の２種類のステアがあります！縁石はWAXでヌルヌルで最高です！</p>
    </div>
  </div>
</template>

<script>
import Map from "../components/Map";
export default {
  components: {
    Map
  }
}
</script>

<style scoped>
.spot-img {
  width: 100%;
  height: 1000px;
}
</style>
