<template>
  <div id="app">
    <div class="title">
      <div class="title-img">
              <img src="./assets/img/cristiano-ronaldo-to-juventus.jpg">
          </div>
          <div class="goals-number">
              {{scores}}
          </div>
      </div>
      <nav-bar></nav-bar>
      <router-view></router-view>
  </div>
</template>

<script>
import navBar from './components/NavBar'

export default {

  name: 'app',
  
  computed:{
     scores(){
        return this.$store.state.videos.length;
     }  
  },
  components:{
    navBar
  }
}
</script>

<style lang="scss">




body {
    background: black;
    font-family: $font;
     min-width:1700px;        /* Suppose you want minimum width of 1000px */
   width: auto !important;  /* Firefox will set width as auto */
   
}

#app{
  width: 60%;
  margin: 0 auto;
}
.title {
    display: flex;
    width: 100%;    
}

.goals-number {
    font-weight: bold;
    color: $gold;
    width: 60%;
    font-size: 120px;
    @include centralize;
    &:after {
        @include scale(100%);
    }
}

.title-img {
    img {
        min-height: 100%;
        max-width: 100%;
        object-fit: cover;
    }
}
</style>
