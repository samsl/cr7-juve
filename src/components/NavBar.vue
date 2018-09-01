<template><div>

	<nav>
		<ul>
			<li v-for="nav in navs"><router-link :to="nav.link"><span>{{nav.name}}</span></router-link></li>
		</ul>		
	</nav>
	
</div>
</template>
<script>
	export default ({
		data: function(){
			return {
				navs: [{name:"HOME", link:"/"}, {name:"GOALS", link:"/goals"}, {name:"FIXTURES", link:"/fixtures"}, {name:"LINEUPS", link:"/lineups"},{name:"DRAW", link:'/draw'}]
			}
		}
	})
</script>
<style lang="scss">
	nav {
		ul {
			list-style-type: none;
			@include centralize;
		}
		li {
			margin: 5px auto;
			padding: 0px 10px;
			font-size: 20px;
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