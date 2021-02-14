<template>
  <div>
    <GmapMap
      :center="{lat: 34.39146551179752, lng: 132.46128012819383}"
      :zoom="7"
      :options="{streetViewControl: false}"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
      @click="place($event)"
    >
    <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
      <img src="../assets/IMG_4195 2.jpg" alt="">
      </GmapInfoWindow>
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow(m)"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: ["marker"],
  data() {
    return {
      markers: [],
      position: {
        lat: '',
        lng: ''
      },
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPos: null,
      infoWinOpen: false
    };
  },
  methods: {
    toggleInfoWindow(marker) {
      this.infoWindowPos = marker.position;
      this.infoWinOpen = true;
    },
    place(event) {
      if (event) {
        // const lat = event.latLng.lat()
        // const lng = event.latLng.lng()
        console.log(this.marker)
      }
    },
    conversion() {
      this.position.lat = Number(this.marker.spotLat)
      this.position.lng = Number(this.marker.spotLng)
      this.markers.push(this.position)
      console.log(this.markers)
    }
  },
  created() {
    this.conversion()
  }
}
</script>

<style scoped>

</style>
