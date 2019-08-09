<template>
	<nav>
		<ul>
			<li class="mobile-tight" v-for="nav in navs"><router-link :to="{name:nav.link}"><span>{{nav.name}}</span></router-link></li>
		</ul>		
	</nav>	
</template>
<script>
	export default ({
		data: function(){
			return {
				navs: [{name:"HOME", link:"home"}, {name:"GOALS", link:"goals"}, {name:"FIXTURES", link:"fixtures"}, {name:"TROPHIES", link:"trophies"}, {name:"LINEUPS", link:"lineups"},{name:"DRAW", link:'draw'}]
			}
		}
	})
</script>
<style lang="scss">
	nav {
		
		ul {
			width: 100%;
			list-style-type: none;
			@include centralize;
			font-size: 20px;
		}
		li {
			margin: 5px auto;
			padding: 0px 10px;
			
			color: $silver !important;
			
			span {

				&:hover{
					border-bottom: 2px solid white;
					color: white;
				}
			}
		}

	}
	
	
</style>