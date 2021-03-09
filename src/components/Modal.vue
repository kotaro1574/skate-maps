<template>
  <div class="overlay">
    <div class="close" @click="$emit('close')">
      <b-icon icon="x-circle" class="close-button"></b-icon>
    </div>
    <div class="content">
      <div class="user-wrap">
        <div class="user">
          <div class="user-image" @click="$router.push({ path: '/mymap/'+ val.user.id, params: { id: val.user.id } })">
            <img :src="val.user.image" alt="" class="user-img" v-if="val.user.image">
            <img src="../assets/profile_icon.png" class="user-img" alt="" v-if="!val.user.image">
          </div>
          <p class="user-name">{{ val.user.name }}</p>
        </div>
        <div class="delete">
          <b-icon icon="trash" class="delete-button" @click="alert(val.file.id)" v-if="$store.state.user.id == val.user.id"></b-icon>
        </div>
      </div>
      <div class="best-image">
        <video :src="val.file.path" controls alt="" class="best-img" ></video>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['val'],
  data() {
    return {
      update: false,
    }
  },
  methods: {
    alert(id) {
      this.$swal({
       title: "確認",
       text: "削除しますか？",
       icon: "warning",
       buttons: true,
       dangerMode: true,
     })
     .then((willDelete) => {
       if (willDelete) {
         this.fileDelete(id);
         this.$swal("削除されました。", {
           icon: "success",
         });
       } else {
         this.$swal("Cancelされました。");
       }
      });
    },
    fileDelete(id) {
      this.update = true
      axios .delete(process.env.VUE_APP_SKATE_MAPS_API + "/api/besttricks/"+id, {params: {id: id}})
      .then((response) => {
        console.log(response);
        this.$emit('close', this.update);
      })
    }
  }
}
</script>

<style scoped>
.overlay {
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
.close {
  width: 40px;
  height: 40px;
  position: absolute;
  cursor: pointer;
  z-index: 100;
  top: 15px;
  right: 20px;
  color: #fff;
}
.close-button {
  font-size: 40px;
}
.content {
  text-align: center;
  z-index: 2;
  height: 600px;
  width: 50%;
  background: #fff;
  border-radius: 10px;
}
.user-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user {
  display: flex;
  align-items: center;
  padding: 13px;
  height: 12%;
}
.user-image {
  cursor: pointer;
  
}
.user-img{ 
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-name {
  margin: 0 10px;
}
.delete {
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: 20px;
}
.delete-button {
  width: 20px;
  height: 20px;
  color: rgb(100, 100, 100);
}
.delete-button:hover {
  color: rgb(255, 73, 73);
}
.best-image {
  height: 88%;
  width: 100%;
  background: #727272;
  border-radius: 0 0 10px 10px;
}
.best-img {
  height: 100%;
  width: 100%;
  border-radius: 0 0 10px 10px;
} 

@media screen and (max-width: 768px) {
  .content {
  height: 450px;
  }
}
@media screen and (max-width: 450px) {
  .content {
    height: 350px;
  }
  .user {
  display: block;
}
.user-img{ 
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.user-name {
  font-size: 8px;
}
}
</style>
