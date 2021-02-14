<template>
  <div class="home">
    <div class="home-img">
    </div>
    <GmapMap
      :center="{lat: 34.39146551179752, lng: 132.46128012819383}"
      :zoom="9"
      :options="{streetViewControl: false}"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
    >
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
      <div class="card" @click="$router.push({ path: '/spot/' + cardId, params: { id: cardId } })">
        <b-card 
          :title="cardName"
          :img-src="cardImg"
          img-height=200
          img-alt="Image" 
          img-top tag="article" 
          style="max-width: 20rem;" 
          class="mb-2" 
        >
        </b-card>
      </div>
      </GmapInfoWindow>
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow(m.position, m.text.cardName, m.text.cardImg, m.text.cardId)"
      />
    </GmapMap>
    <div>
      <v-text-field label="スポット名を入力" v-model="address" @change="onChange">
      </v-text-field>
    </div>
    <Cards @getSpotsData="showSpotsData" />
  </div>
</template>

<script>
import Cards from "../components/Cards";
export default {
  data() {
    return {
      address: "",
      lat: "",
      lng: "",
      cardName: '',
      cardImg: '',
      cardId: '',
      spots: [],
      markers: [],
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
    onChange() {
     this.geocoder.geocode({
       'address': this.address
     },(results, status) =>{
       if(status === google.maps.GeocoderStatus.OK) {
       // 緯度を取得
        this.lat = results[0].geometry.location.lat();
       // 経度を取得
        this.lng = results[0].geometry.location.lng();

       }
     }
     )
    },
    showSpotsData(spots) {
      this.spots = spots;
      console.log(this.spots)
    },
    toggleInfoWindow(marker, name, image, id) {
      this.infoWindowPos = marker;
      this.cardName = name;
      this.cardImg = image;
      this.cardId = id;
      this.infoWinOpen = true;
    },
    conversion() {
      for (let i = 0; i < this.spots.length; i++) {
        const marker = {}
        const position = {}
        const text  = {}
        position.lat = Number(this.spots[i].spotLat)
        position.lng = Number(this.spots[i].spotLng)
        text.cardName = this.spots[i].spotName
        text.cardImg = this.spots[i].spotImg
        text.cardId = this.spots[i].id
        marker.position = position
        marker.text = text
        this.markers.push(marker)
        console.log(this.markers)
      }
    }
  },
  watch: {
    spots(newSpots, oldSpots) {
      if (newSpots) {
        console.log(newSpots)
        this.conversion()
      } else {
        console.log(oldSpots)
      }
    }
  },
  created() {
  },
  mounted() {
    this.$gmapApiPromiseLazy()
    .then((response) => {
       console.log(response) 
      this.geocoder = new google.maps.Geocoder()
    })
  },
  components: {
    Cards
  },
}
</script>

<style scoped>
.home-img {
  height: 600px;
  background: url("../assets/top.jpg");
}
</style>
