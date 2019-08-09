<template>
  <div>
    <header id="header-banner">
      <div class="container mobile from-right">
        <!-- <font-awesome-icon icon="user"/> -->
        <router-link v-show="!auth" class="banner-link" :to="{name:'login'}">Login</router-link>
        <div v-show="auth">
          <span>{{auth}}</span>
          <span class="banner-link" @click="logout">Logout</span>
        </div>
      </div>
    </header>
    <header id="header-logo">
      <div class="title container mobile">
        <div class="title-img">
          <img src="static/img/cristiano-ronaldo-to-juventus.jpg" />
        </div>
        <div class="goals-number mobile-hide">
          {{scores}}
          <div class="trophies-title">
            <div v-for="(trophy,idx) in trophies" :key="idx" class="title-trophy">
              <div>
                <img :src="'/static/img/trophies/'+ trophy.type + '.png'" class="trophy-title-img" />
              </div>           
            </div>
          </div>
        </div>
      </div>
    </header>
    <header id="header-nav">
      <nav-bar class="container mobile"></nav-bar>
    </header>
    <section id="section-container">
      <router-view class="container mobile"></router-view>
    </section>
  </div>
</template>
<script>
import NavBar from "./NavBar";

export default {
  computed: {
    scores() {
      return this.$store.getters.videos.length;
    },
    auth() {
      return this.$store.getters.authUser;
    },
    trophies() {
      return this.$store.getters.trophies;
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "login" });
    }
  },
  components: {
    NavBar
  }
};
</script>
<style lang="scss">
#header-banner {
  height: 50px;
  background: black;
  font-weight: 900;
  font-size: 18px;

  color: $gold;
}
#header-logo {
  background: black;
}
#header-nav {
  background: black;
}
.title {
  display: flex;
}
.banner-link {
  border: 2px solid $gold;
  padding: 0px 10px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
}
.goals-number {
  font-weight: bold;
  color: $gold;
  font-size: 120px;
  display: flex;
  flex-direction: column;
  @include centralize;

}
#section-container {
  background: black;
}
.title-img {
  img {
    min-height: 100%;
    max-width: 100%;
    object-fit: cover;
  }
}
.trophies-title {
  width: 300px;
  display: flex;
  flex-wrap: wrap;
}
.title-trophy {
  width: 50px;
  margin: 5px;
}
.trophy-title-img {
  height: 60px;
}
</style>