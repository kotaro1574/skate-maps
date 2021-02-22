<template>
  <div class="home">
    <div class="home-img">
      <HomeNavi />
    </div>

    <div class="search-wrap">
      <div class="search-flex">
        <div class="search">
          <div class="search-area" @click="areaToggle()">
            <p class="area-title">area</p>
            <p class="area-icon"><b-icon icon="list"></b-icon></p>
          </div>
          <div class="search-items">
            <input placeholder="  検索" type="text" class="search-form" v-model="formAddress">
            <p class="search-icon" @click="formSearch()"><b-icon icon="search"></b-icon></p>
          </div>
        </div>
        <div class="gif">
          <img src="../assets/flip.gif" class="gif" alt="">
        </div>
      </div>

      <div class="area-flex" v-if="area">
        <div class="area-group">
          <p>北海道・東北</p>
          <div class="area-items">
            <p @click="search('北海道')">北海道</p>
            <p @click="search('青森')">青森</p>
            <p @click="search('岩手')">岩手</p>
            <p @click="search('宮城')">宮城</p>
            <p @click="search('秋田')">秋田</p>
            <p @click="search('山形')">山形</p>
            <p @click="search('福島')">福島</p>
          </div>
        </div>
        <div class="area-group">
          <p>関東</p>
          <div class="area-items">
            <p @click="search('茨城')">茨城</p>
            <p @click="search('栃木')">栃木</p>
            <p @click="search('群馬')">群馬</p>
            <p @click="search('埼玉')">埼玉</p>
            <p @click="search('千葉')">千葉</p>
            <p @click="search('東京')">東京</p>
            <p @click="search('神奈川')">神奈川</p>
          </div>
        </div>
        <div class="area-group">
          <p>中部</p>
          <div class="area-items">
            <p @click="search('新潟')">新潟</p>
            <p @click="search('富山')">富山</p>
            <p @click="search('石川')">石川</p>
            <p @click="search('福井')">福井</p>
            <p @click="search('山梨')">山梨</p>
            <p @click="search('長野')">長野</p>
            <p @click="search('岐阜')">岐阜</p>
            <p @click="search('静岡')">静岡</p>
            <p @click="search('愛知')">愛知</p>
          </div>
        </div>
        <div class="area-group">
          <p>近畿</p>
          <div class="area-items">
            <p @click="search('三重')">三重</p>
            <p @click="search('滋賀')">滋賀</p>
            <p @click="search('京都')">京都</p>
            <p @click="search('大阪')">大阪</p>
            <p @click="search('兵庫')">兵庫</p>
            <p @click="search('奈良')">奈良</p>
            <p @click="search('和歌山')">和歌山</p>
          </div>
        </div>
        <div class="area-group">
          <p>中国</p>
          <div class="area-items">
            <p @click="search('鳥取')">鳥取</p>
            <p @click="search('島根')">島根</p>
            <p @click="search('岡山')">岡山</p>
            <p @click="search('広島')">広島</p>
            <p @click="search('山口')">山口</p>
          </div>
        </div>
        <div class="area-group">
          <p>四国</p>
          <div class="area-items">
            <p @click="search('徳島')">徳島</p>
            <p @click="search('香川')">香川</p>
            <p @click="search('愛媛')">愛媛</p>
            <p @click="search('高知')">高知</p>
          </div>
        </div>
        <div class="area-group">
          <p>九州・沖縄</p>
          <div class="area-items">
            <p @click="search('福岡')">福岡</p>
            <p @click="search('佐賀')">佐賀</p>
            <p @click="search('長野')">長野</p>
            <p @click="search('熊本')">熊本</p>
            <p @click="search('大分')">大分</p>
            <p @click="search('宮城')">宮城</p>
            <p @click="search('鹿児島')">鹿児島</p>
            <p @click="search('沖縄')">沖縄</p>
          </div>
        </div>
      </div>
    <GmapMap
      :center="{lat: this.lat, lng: this.lng}"
      :zoom="9"
      :options="{streetViewControl: false}"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
      v-if="address"
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
    <Cards 
      @getSpotsData="showSpotsData" 
      @getStreetSpotsData="showStreetSpotsData"
      @getParkSpotsData="showParkSpotsData"
      @getRainSpotsData="showRainSpotsData"
    />
    </div>
  </div>
</template>

<script>
import HomeNavi from "../components/HomeNavi";
import Cards from "../components/Cards";
export default {
  data() {
    return {
      area: false,
      address: '',
      formAddress: '',
      lat: 34.39146551179752,
      lng: 132.46128012819383,
      cardName: '',
      cardImg: '',
      cardId: '',
      spots: [],
      streetSpots: [],
      parkSpots: [],
      rainSpots: [],
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
    formSearch() {
      this.address = this.formAddress;
    },
    search(i) {
      this.address = i;
    },
    areaToggle() {
      this.area = !this.area;
    },
    // areaChange() {
    //   this.geocoder.geocode({
    //     'address': this.address
    //   },(results, status) => {
    //     if(status === google.maps.GeocoderStatus.OK) {
    //       this.lat = results[0].geometry.location.lat();
    //       this.lng = results[0].geometry.location.lng();
    //       this.area= '';
    //     }
    //   })
    // },
    showSpotsData(spots) {
      this.spots = spots;
      console.log(this.spots)
    },
    showStreetSpotsData(streetSpots) {
      this.streetSpots = streetSpots;
      console.log(this.streetSpots);
    },
    showParkSpotsData(parkSpots) {
      this.parkSpots = parkSpots;
      console.log(this.parkSpots);
    },
    showRainSpotsData(rainSpots) {
      this.rainSpots = rainSpots;
      console.log(this.rainSpots);
    },
    toggleInfoWindow(marker, name, image, id) {
      this.infoWindowPos = marker;
      this.cardName = name;
      this.cardImg = image;
      this.cardId = id;
      this.infoWinOpen = true;
    },
    spotsConversion() {
      this.markers = [];
      for (let i = 0; i < this.spots.length; i++) {
        const marker = {};
        const position = {};
        const text  = {};
        position.lat = Number(this.spots[i].spot.spotLat)
        position.lng = Number(this.spots[i].spot.spotLng)
        text.cardName = this.spots[i].spot.spotName
        text.cardImg = this.spots[i].spot.spotImg
        text.cardId = this.spots[i].spot.id
        marker.position = position
        marker.text = text
        this.markers.push(marker)
      }
      console.log(this.spots)
      console.log(this.markers)
    },
    streetSpotsConversion() {
      console.log(this.streetSpots)
      this.markers = [];
      for (let i = 0; i < this.streetSpots.length; i++) {
        const marker = {};
        const position = {};
        const text  = {};
        position.lat = Number(this.streetSpots[i].spot.spotLat)
        position.lng = Number(this.streetSpots[i].spot.spotLng)
        text.cardName = this.streetSpots[i].spot.spotName
        text.cardImg = this.streetSpots[i].spot.spotImg
        text.cardId = this.streetSpots[i].spot.id
        marker.position = position
        marker.text = text
        this.markers.push(marker)
      }
      console.log(this.markers)
    },
    parkSpotsConversion() {
      console.log(this.parkSpots)
      this.markers = [];
      for (let i = 0; i < this.parkSpots.length; i++) {
        const marker = {};
        const position = {};
        const text  = {};
        position.lat = Number(this.parkSpots[i].spot.spotLat)
        position.lng = Number(this.parkSpots[i].spot.spotLng)
        text.cardName = this.parkSpots[i].spot.spotName
        text.cardImg = this.parkSpots[i].spot.spotImg
        text.cardId = this.parkSpots[i].spot.id
        marker.position = position
        marker.text = text
        this.markers.push(marker)
      }
      console.log(this.markers)
    },
    rainSpotsConversion() {
      console.log(this.rainSpots)
      this.markers = [];
      for (let i = 0; i < this.rainSpots.length; i++) {
        const marker = {};
        const position = {};
        const text  = {};
        position.lat = Number(this.rainSpots[i].spot.spotLat)
        position.lng = Number(this.rainSpots[i].spot.spotLng)
        text.cardName = this.rainSpots[i].spot.spotName
        text.cardImg = this.rainSpots[i].spot.spotImg
        text.cardId = this.rainSpots[i].spot.id
        marker.position = position
        marker.text = text
        this.markers.push(marker)
      }
      console.log(this.markers)
    },
  },
  watch: {
    address(newArea, oldArea) {
      if (newArea) {
        console.log(newArea);
        this.areaChange();
      } else {
        console.log(oldArea);
      }
    },
    spots(newSpot) {
      if (newSpot) {
        this.spotsConversion();
      }
    },
    streetSpots(newStreetSpots) {
      if (newStreetSpots) {
        this.streetSpotsConversion()
      }
    },
    parkSpots(newParkSpots) {
      if (newParkSpots) {
        this.parkSpotsConversion()
      }
    },
    rainSpots(newRainSpots) {
      if (newRainSpots) {
        this.rainSpotsConversion()
      }
    },

  },
  mounted() {
    // this.$gmapApiPromiseLazy().then(() => {
    //    this.geocoder = new google.maps.Geocoder()
    // })
  },
  components: {
    HomeNavi,
    Cards
  },
}
</script>

<style scoped>
.home-img {
  height: 600px;
  background: url("../assets/top.jpg");
  z-index: 100;
}
.search-wrap {
  height: 500px;
  width: 80%;
  margin: 0 auto;
}
.search-flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.search {
  margin: 20px;
  padding: 20px;
  width: 70%;
  background: #fefefe;
  border-radius: 5px;
  border: 1px solid #fefefe;
  box-sizing: border-box;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.search-area {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.area-title {
  margin: 0;
  font-size: 27px;
  font-weight: bold;
  font-family: Roboto;
  font-style: italic;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.area-title:hover {
  color: #565655;
  text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
}
.area-icon {
  margin: 3px 0 0 7px;
  font-size: 30px;
}
.area-icon:hover {
  color: #565655;
}
.search-items {
  width: 450px;
  display: flex;
  align-items: center;
  position: relative;
}
.search-form {
  width: 450px;
  border: 2px solid #565655;
  border-radius: 5px;
}
.search-icon {
  margin: 0;
  padding: 3px 7px;
  position: absolute;
  right: 0;
  color: #fefefe;
  background: #000;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
}
.search-icon:hover {
  background: #616469;
}
.gif {
  margin-right: 30px;
  height: 100px;
}
.area-flex {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.area-group {
  height: 100px;
  padding: 15px;
}
.area-group p {
  font-size: 14px;
  font-weight: bold;
}
.area-items {
  display: flex;
}
.area-items p {
  font-weight: normal;
  margin-right: 13px;
  cursor: pointer;
  color: rgb(62, 82, 255);
}
.area-items p:hover{
  color: rgb(230, 192, 25);
}
</style>
