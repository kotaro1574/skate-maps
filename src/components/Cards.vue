<template>
  <div class="cards">
    <div class="title">
      <p>New Spots</p>
    </div>
    <div class="cards-flex">
    <div class="card" v-for="(card, index) in cards" :key="index">
      <b-card 
        :title="card.title"
        :img-src="card.img"
        img-height=200
        img-alt="Image" 
        img-top tag="article" 
        style="max-width: 20rem;" 
        class="mb-2" 
      >
        <b-card-text>Some quick example text to build on the card title and make up the bulk of the card's content. </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: "千田公園",
          img: require("../assets/top.jpg")
        },
        {
          title: "La",
          img: require("../assets/top.jpg")
        },
        {
          title: "リサーチパーク",
          img: require("../assets/top.jpg")
        },
        {
          title: "呉ポートピア",
          img: require("../assets/top.jpg")
        },
        {
          title: "send",
          img: require("../assets/top.jpg")
        },
        {
          title: "send",
          img: require("../assets/top.jpg")
        },
      ]
    }
  }
}
</script>

<style scoped>
.cards-flex {
  height: 1100px;
  display: flex;
  flex-wrap: wrap;
  align-items: space-around;
  justify-content: space-around;
}
.card {
  height: 500px;
  width: 300px;
  margin: 0;
}
</style>
