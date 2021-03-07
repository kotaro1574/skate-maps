<template>
  <div class="navi">
    <div class="navbar">
      <div class="navi-logo" @click="transitionHome()">
        Skate Maps
        <img src="../assets/google_map_pin.png" alt="" class="navi-img">
      </div>
      <nav class="nav-item">
        <ul>
          <li><a v-if="!$store.state.auth" @click="transitionLogin()">ログイン</a></li>
          <li><a v-if="!$store.state.auth" @click="transitionSignup()">新規登録</a></li>
          <li><a v-if="$store.state.auth" @click="transitionMyMap()">MyMap</a></li>
          <li><a v-if="$store.state.auth" @click="transitionPost()">投稿</a></li>
          <li><a v-if="$store.state.auth" @click="$store.dispatch('logout')">ログアウト</a></li>
        </ul>
      </nav>
    </div>
    <div id="hamburger" @click="hamburger()" :class="{'active':isClass}">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <nav class="menu-content" :class="{'open':isClass}">
      <div class="navi-logo" @click="transitionHome()">
        Skate Maps
        <img src="../assets/google_map_pin.png" alt="" class="navi-img">
      </div>
      <ul class="menu-content_inner">
        <li><a v-if="!$store.state.auth" @click="transitionLogin()">ログイン</a></li>
        <li><a v-if="!$store.state.auth" @click="transitionSignup()">新規登録</a></li>
        <li><a v-if="$store.state.auth" @click="transitionMyMap()">MyMap</a></li>
        <li><a v-if="$store.state.auth" @click="transitionPost()">投稿</a></li>
        <li><a v-if="$store.state.auth" @click="$store.dispatch('logout')">ログアウト</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClass: false
    };
  },
  methods: {
    transitionHome() {
      this.clear();
      this.$router.push({ name: "Home" });
    },
    transitionLogin() {
      this.clear();
      this.$router.push({ name: "Login" });
    },
    transitionSignup() {
      this.clear();
      this.$router.push({ name: "SignUp"});
    },
    transitionMyMap() {
      this.$router.push({ path: '/mymap/'+this.$store.state.user.id, params: { id: this.$store.state.user.id } });
    },
    transitionPost() {
      this.$router.push({ name: "Post" });
    },
    hamburger() {
      this.isClass = !this.isClass;
    },
    clear() {
      this.$store.dispatch("clear");
    }
  }
}
</script>

<style scoped>
.navi {
  /* position: fixed; */
  z-index: 999;
  width: 100%;
}
.navbar {
  height: 60px;
  background: rgb(0, 0, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navi-logo {
  font-family: Roboto;
  font-style: italic;
  font-size: 25px;
  font-weight: bold;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: rgb(255, 255, 255);
  margin-left: 60px;
  cursor: pointer;
}
.navi-img {
  height: 33px;
  margin-left: 5px;
}
.nav-item ul{
  display: flex;
  margin-bottom: 0;
}
.nav-item li {
  margin-right: 35px;
  font-size: 15px;
  list-style: none;
  color: rgb(255, 255, 255);
}
.nav-item a {
  cursor: pointer;
}
.menu-content {
  display: none;
}
@media screen and (max-width: 768px) {
  .navi-logo {
    margin-left: 25px;
  }
  #hamburger {
    width: 40px;
    height: 40px;
    position: absolute;
    cursor: pointer;
    z-index: 100;
    top: 15px;
    right: 20px;
    transition: 0.4s;
  }

  #hamburger span {
    position: absolute;
    left: 2px;
    display: block;
    width: 35px;
    height: 2px;
    background-color: #fff;
    transition: 0.8s;
  }

  #hamburger span:nth-of-type(1) {
    top: 10px;
  }

  #hamburger span:nth-of-type(2) {
    top: 20px;
  }

  #hamburger span:nth-of-type(3) {
    top: 30px;
  }

  .nav-item {
    display: none;
  }

  #hamburger.active span:nth-of-type(1) {
    top: 20px;
    transform: rotate(45deg);
  }

  #hamburger.active span:nth-of-type(2) {
    opacity: 0;
  }

  #hamburger.active span:nth-of-type(3) {
    top: 20px;
    transform: rotate(-45deg);
  }

  .menu-content {
    display: block;
    width: calc(100% - 80px);
    height: 100%;
    text-align: center;
    transition: 0.2s;
    position: fixed;
    top: 0;
    left: calc(-100% - 80px);
    background: #fff;
    color: #333333;
    box-shadow: 80px 0 rgba(38, 98, 213, 0.3);
    z-index: 999;
  }

  .menu-content .navi-logo {
    margin: 40px 20px;
    font-size: 2.2rem;
    color: #333333;
    text-align: left;
    font-weight: bold;
  }

  .menu-content li a {
    color: #333333;
    margin: 15px;
    padding: 5px;
    border-bottom: 0.5px solid #2662d5;
    text-decoration: none;
    display: block;
    cursor: pointer;
  }

  .menu-content li {
    width: 100%;
    text-align: left;
    list-style: none;
  }

  .menu-content.open {
    left: 0;
  }
}
</style>
