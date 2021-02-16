<template>
  <div class="spot">
    <img :src="spotData.spot.spotImg" alt="" class="spot-img">
    <GmapMap
      :center="position"
      :zoom="12"
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
      <div class="card">
        <b-card 
          :title="spotData.spot.spotName"
          :img-src="spotData.spot.spotImg"
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
        :position="position"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow()"
      />
    </GmapMap>
    <div class="spot-content">
      <h3 class="spot-title">{{ spotData.spot.spotName }}</h3>
      <div>
        <img src="../assets/heart.png" alt="" @click="fav()">
        <p>{{ spotData.like.length }}</p>
      </div>
      <button @click="formToggle(1)">設定</button>
      <div class="modal-form" v-if="spotEditForm">
        <div class="form-content">
          <p><input placeholder="スポットの名前" type="text" v-model="spotName" /></p>
          <p><input type="file" @change="confirmImage" /></p>
          <div v-if="spotImg">
            <button @click="deletePreview()">X</button>
            <img :src="spotImg" class="preview-img">
          </div>
          <GmapMap
            :center="position"
            :zoom="12"
            :options="{streetViewControl: false}"
            map-type-id="terrain"
            style="width: 100%; height: 200px"
            @click="place($event)"
          >
            <GmapMarker
              :position="position"
              :clickable="true"
              :draggable="true"
            />
          </GmapMap>
          <button @click="spotEdit()">編集する</button>
          <button @click="spotDelete()">削除</button>
          <button @click="formToggle(1)">閉じる</button>
        </div>
      </div>
      <button @click="formToggle(2)">コメント</button>
      <div class="modal-form" v-if="spotCommentForm">
        <div class="form-content">
          <p><input placeholder="コメント" type="text" v-model="spotComment" /></p>
          <p><input type="file" @change="confirmImage" /></p>
          <div v-if="spotCommentImg">
            <button @click="deletePreview()">X</button>
            <img :src="spotCommentImg" class="preview-img">
          </div>
          <button @click="commentPost()">コメントを投稿する</button>
          <button @click="formToggle(2)">閉じる</button>
        </div>
      </div>
      
      <div class="comment-area" v-for="(comments, index) in spotData.comments" :key="index">
        <div class="comment-user">
          <img 
            :src="comments.commentUser.image"
            class="profile-img"
            @click="$router.push({ path: '/mymap/'+ comments.commentUser.id, params: { id: comments.commentUser.id } })"
          >
          <p>{{ comments.commentUser.name }}</p>
        </div>
        <p class="comment-text">{{ comments.comment.comment }}</p>
        <div class="comment-image">
          <img :src="comments.comment.commentImg" class="comment-img">
        </div>
        <button 
          class="comment-delete" 
          v-if="$store.state.user.id == comments.commentUser.id"
          @click="commentDelete(comments.comment.id)"
        >
          削除
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      spotData: '',
      spotName: '',
      spotImg: '',
      spotEditForm: false,
      spotComment: '',
      spotCommentImg: '',
      spotCommentForm: false,
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
    }
  },
  methods: {
    async spotShow() {
      await axios
        .get("http://127.0.0.1:8000/api/posts/" + this.id)
        .then((response) => {
          console.log(response)
          this.spotData = response.data;
          console.log(this.spotData)
        })
    },
    conversion() {
      this.position.lat = Number(this.spotData.spot.spotLat)
      this.position.lng = Number(this.spotData.spot.spotLng)
      console.log(this.position)
    },
    toggleInfoWindow() {
      this.infoWindowPos = this.position;
      this.infoWinOpen = true;
    },
    fav() {
      const result = this.spotData.like.some((value) => {
        return value.user_id == this.$store.state.user.id;
      });
      console.log(result);
      if (result) {
        this.spotData.like.forEach((element) => {
          if (element.user_id == this.$store.state.user.id) {
            axios({
              method: "delete",
              url: "http://127.0.0.1:8000/api/like",
              data: {
                post_id: this.id,
                user_id: this.$store.state.user.id
              },
            }).then((response) => {
              console.log(response);
              this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
            })
          }
        })
      } else {
        axios
          .post("http://127.0.0.1:8000/api/like", {
            post_id: this.id,
            user_id: this.$store.state.user.id
          })
          .then((response) => {
            console.log(response)
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
          })
      }
    },
    formToggle(i) {
      if(i == 1) {
        this.spotEditForm = !this.spotEditForm;
      } else if (i == 2) {
        this.spotCommentForm = !this.spotCommentForm;
      }
    },
    confirmImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);

      if (this.spotEditForm) {
        reader.onload = e => {
          this.spotImg = e.target.result;
          console.log(this.spotImg);
        }
      } else if (this.spotCommentForm) {
        reader.onload = e => {
          this.spotCommentImg = e.target.result;
          console.log(this.spotCommentImg);
        }
      }
    },
    deletePreview() {
      if (this.spotEditForm) {
        this.spotImg = '';
      } else if (this.spotCommentForm) {
        this.spotCommentImg = ''
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
      axios
        .put("http://127.0.0.1:8000/api/posts/" + this.id, {
          spotId: this.id,
          spotName: this.spotName,
          spotImg: this.spotImg,
          spotLat: this.position.lat,
          spotLng: this.position.lng
        })
        .then((response) => {
          console.log(response);
          this.spotName = '';
          this.spotImg = '';
          this.spotEditForm = false;
          this.spotShow();
        })
    },
    spotDelete() {
      axios
        .delete("http://127.0.0.1:8000/api/posts/" + this.id)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: 'Home' });
        })
    },
    // async commentGet() {
    //   let commentData = [];
    //   const comments = await axios.get("http://127.0.0.1:8000/api/comments/", { params: { post_id: this.id }})
    //   console.log(comments.data.data);
    //   for (let i = 0; i < comments.data.data.length; i++) {
    //     await axios
    //       .get(
    //         "http://127.0.0.1:8000/api/comments/" + comments.data.data[i].id)
    //       .then((response) => {
    //         console.log(response);
    //         commentData.push(response.data);
    //         console.log(commentData);
    //       })
    //   }
    //   this.comments = commentData;
    // },
    commentPost() {
      axios
        .post("http://127.0.0.1:8000/api/comments/", {
          post_id: this.id,
          user_id: this.$store.state.user.id,
          comment: this.spotComment,
          commentImg: this.spotCommentImg
        })
        .then((response) => {
          console.log(response);
          this.comment = '';
          this.commentImg = '';
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        })
    },
    commentDelete(commentId) {
      axios
        .delete("http://127.0.0.1:8000/api/comments/"+commentId)
        .then((response) => {
          console.log(response)
          this.$router.go({
                path: this.$router.currentRoute.path,
                force: true,
              });
        })
    }
  },
  created() {
    this.spotShow();
  },
  updated() {
    this.conversion();
  }
}
</script>

<style scoped>
.spot-img {
  width: 100%;
  height: 1000px;
}
.preview-img {
  width: 80%;
  height: 300px;
}
.modal-form {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-content {
  text-align: center;
  z-index: 2;
  width: 30%;
  padding: 10px;
  background: #fff;
}
.comment-area{
  height: 140px;
  width: 80%;
  display: flex;
  justify-content: space-around;
}
.comment-user {
  height: 100%;
  width: 20%;
}
.comment-text{
  text-align: center;
  width: 60%;
  height: 100%;
}
.comment-image {
  margin: 0;
  height: 100%;
  width: 20%;
  text-align: center;
}
.comment-img {
  height: 90px;
  width: 90px;
}
.profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 30px;
}
.comment-delete {
  height: 50px;
  width: 30px;
}
</style>
