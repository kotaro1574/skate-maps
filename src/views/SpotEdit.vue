<template>
  <div class="post">
    <Navi />
    <div class="post-card">
      <h1 class="post-title">編集</h1>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit()">
          
          <ValidationProvider name="スポットの写真" rules="image" v-slot="{ errors }">
            <div class="form-group">
              <label>写真の追加</label>
              <input type="file" class="form-control" id="files" ref="files" multiple @change="handleFilesUploads()">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="スポットの名前" rules="required|max:150" v-slot="{ errors }">
            <div class="form-group">
              <label>スポットの名前</label>
              <input type="text" class="form-control" v-model="spotName">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="スポットの情報" rules="required|max:500" v-slot="{ errors }">
            <div class="form-group mb-4">
              <label>スポットの情報</label>
              <textarea class="form-control" v-model="spotText" id="" cols="30" rows="5"></textarea>
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="スポットタイプ" rules="required" v-slot="{ errors }">
            <label>スポットタイプ</label>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="ストリート" id="defaultCheck1" v-model="spotType">
              <label class="form-check-label" for="defaultCheck1">
              ストリート
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="パーク" id="defaultCheck2" v-model="spotType">
              <label class="form-check-label" for="defaultCheck2">
              パーク
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="雨スポット" id="defaultCheck3" v-model="spotType">
              <label class="form-check-label" for="defaultCheck3">
              雨スポット
              </label>
            </div>
            <span class="error">{{ errors[0] }}</span><br>
          </ValidationProvider>

          <label>スポットの位置</label>
          <GmapMap
            :center="{lat: lat, lng: lng}"
            :zoom="12"
            :options="{streetViewControl: false}"
            map-type-id="terrain"
            class="map"
            @click="place($event)"
          >
            <GmapMarker
              :position="position"
              :clickable="true"
              :draggable="true"
              @click="toggleInfoWindow()"
            />
          </GmapMap>
          <div class="btn btn-outline-danger delete" @click="alert()">投稿を削除する?  <b-icon icon="trash"></b-icon></div>
          
          <div class="text-center">
            <button type="submit" class="btn btn-primary mt-3" tect="Submit" @click="spotEdit()">投稿する</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navi from "../components/Navi";
export default {
  props: ["id"],
  data() {
    return {
      files: '',
      lat:'',
      lng: '',
      spotName: '',
      spotText: '',
      spotType: [],
      position: {
        lat: '',
        lng: ''
      },
    }
  },
  methods: {
    handleFilesUploads(){
      this.files = this.$refs.files.files;
      console.log(this.files);
    },
    async spotShow() {
      await axios
        .get(process.env.VUE_APP_SKATE_MAPS_API + "/api/posts/" + this.id)
        .then((response) => {
          console.log(response)
          this.lat = Number(response.data.spot.spotLat);
          this.lng = Number(response.data.spot.spotLng);
          this.position.lat = this.lat;
          this.position.lng = this.lng;
          this.spotName = response.data.spot.spotName;
          this.spotText = response.data.spot.spotText;
          this.spotType = response.data.type;
          console.log(this.spotImg);
        })
    },
    confirmImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = e => {
      this.spotImg = e.target.result;
      console.log(this.spotImg);
      }
    },
    place(event) {
       if (event) {
        this.position.lat = event.latLng.lat()
        this.position.lng = event.latLng.lng()
        console.log(this.position)
      }
    },
    spotEdit() {
      axios.put(process.env.VUE_APP_SKATE_MAPS_API + "/api/posts/"+this.id, {
        spotName: this.spotName,
        spotText: this.spotText,
        spotType: this.spotType,
        spotLat: this.position.lat,
        spotLng: this.position.lng,
      })
      .then((response) => {
        console.log(response.data.data);
        this.spotImgPost();
      })
    },
    spotImgPost() {
      let formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append('file['+i+']', file);
      }
      formData.append('post_id', this.id)
      console.log(formData);
      axios.post(process.env.VUE_APP_SKATE_MAPS_API + "/api/files", formData, { 
        headers: {'Content-Type': 'multipart/form-data'}
      })
      .then((response) => {
        console.log(response)
        this.$router.push({ path: '/spot/'+this.id, params: { id: this.id }});
      })
    },
    alert() {
      this.$swal({
       title: "確認",
       text: "本当に削除しますか？",
       icon: "warning",
       buttons: true,
       dangerMode: true,
     })
     .then((willDelete) => {
       if (willDelete) {
         this.spotDelete();
         this.$swal("削除されました。", {
           icon: "success",
         });
       } else {
         this.$swal("Cancelされました。");
       }
      });
    },
    spotDelete() {
      axios
        .delete(process.env.VUE_APP_SKATE_MAPS_API + "/api/posts/" + this.id)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: 'Home' });
        })
    },
  },
  mounted() {
    this.spotShow();
  },
  components: {
    Navi
  }
}
</script>

<style scoped>
.post {
  height: 100%;
}
.post-card {
  height: 80%;
  width: 70%;
  margin: 100px auto;
  padding: 15px 30px 30px;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.post-title {
  margin-top: 10px;
  text-align: center;
}
.spot-img {
  height: 300px;
  width: 80%;
}
.error {
  color: #fb0101;
}
.delete {
  margin: 30px 0;
  cursor: pointer;
}
.delete-img {
  height: 50px;
}
.delete-button {
  color: #fb0101;
  cursor: pointer;
}
.map {
  width: 100%; 
  height: 320px;
}

@media screen and (max-width: 768px) {
  .map {
    height: 250px;
  }
}

@media screen and (max-width: 450px) {
  .map {
    height: 150px;
  }
}
</style>
