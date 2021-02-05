<template>
  <div class="navi">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand @click="transitionHome()">Skate Maps</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="transitionLogin()">ログイン</b-nav-item>
            <b-nav-item @click="transitionSignup()">新規登録</b-nav-item>
            <b-nav-item @click="transitionMyMap()">MyMap</b-nav-item>
            <b-nav-item @click="transitionSpot()">Spot</b-nav-item>
            <b-nav-item @click="transitionPost()">Post</b-nav-item>
            <b-nav-item @click="$store.dispatch('logout')">ログアウト</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    transitionHome() {
      this.$router.push({ name: "Home" });
    },
    transitionLogin() {
      this.$router.push({ name: "Login" });
    },
    transitionSignup() {
      this.$router.push({ name: "SignUp"});
    },
    transitionMyMap() {
      this.$router.push({ name: "MyMap" });
    },
    transitionSpot() {
      this.$router.push({ name: "Spot" });
    },
    transitionPost() {
      this.$router.push({ name: "Post" });
    }
  }
}
</script>
