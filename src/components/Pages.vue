<template>
	<div>
    	<header id="header-banner">
    		<div class="container mobile from-right">
            <!-- <font-awesome-icon icon="user"/> -->
    				<router-link v-show="!auth" class="highlight" to="/login">Login</router-link>
            <div v-show="auth">
              <span>{{auth}}</span>
              <span class="highlight" @click="logout">Logout</span>
            </div>
    		
    		</div>
    	</header>
	    <header id="header-logo">
		    <div class="title container mobile">
				<div class="title-img">
				      <img src="static/img/cristiano-ronaldo-to-juventus.jpg">
				</div>
				<div class="goals-number mobile-hide">
				      {{scores}}
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
import NavBar from './NavBar'

export default {
  
  computed:{
     scores(){
        return this.$store.getters.videos.length;
     },
     auth(){
        return this.$store.getters.authUser;
     }
 
  },
  methods:{
        logout(){
        this.$store.commit('logout');
        this.$router.push("/login");
     }
   },
  components:{
    NavBar
  }
}
</script>
<style lang="scss">

#header-banner{
  height: 50px;
  background: black;
  font-weight: 900;
  font-size: 18px;
  
  color: $gold;
}
#header-logo{
	background: black;
}
#header-nav{
	background: black;

}
.title {
    display: flex; 
}
.highlight{
	border: 2px solid $gold;
	padding: 0px 10px;
	border-radius: 5px;
  &:hover{
    cursor: pointer;
  }
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
#section-container{
  background: black;
}
.title-img {
    img {
        min-height: 100%;
        max-width: 100%;
        object-fit: cover;
    }
}
</style>