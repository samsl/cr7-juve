<template>
	<div id="lineup-container">
		<div class="tab-panel">
			<ul>
				<li v-for="(lineup, idx) in lineups" @click="edit=idx===current?edit:false;choose(idx)" :class="{'active-tab': idx===current}" @dblclick="edit=true;input=lineup.name">
					<span class="tab-title" v-show="!edit || idx !==current" >{{lineup.name}}</span>
					<div class="tab-form" v-show="edit && idx===current">
					<input type="text" v-model="input"/>
					<font-awesome-icon icon="edit" @click="edit=false;lineup.name=input"/>
					</div>
				</li>
			</ul>
		</div>
		<div class="content">
			<div class="players">
				<player v-for="player in players" :player="player" :key="player._id" :up="existing(player)"></player>
			</div>
			<div class="lineup">			
				<field :lineups="currentLineup"></field>		
				<button v-if="auth" @click="save">Save</button>
			</div>
		</div>

	</div>
</template>
<script>
	import Player from "./Player"	
	import Field from "./Field"
	export default ({
		data: function(){
			return {
				input: "",	
				edit: false,					
				players: [],
				current: 0,
				lineups:[]
			}
		},
		mounted: function(){
			this.getLineup();
			this.getPlayer();
			
		},
		computed:{
			auth(){
				return this.$store.getters.authUser;
			},
			currentLineup(){
				if (this.lineups[this.current]) {
					return this.lineups[this.current].lineups;
				} 
				return [];
			}
		},
		methods: {	
			existing(player){
				if (this.lineups.length > 0 &&this.lineups[this.current].lineups.filter(l=>{
					return l.player._id === player._id
				}).length>0) {
					return true;
				}
				return false;
			},
			choose(idx){
				this.current = idx;
			},	
			getLineup(){
				this.axios.get("/api/lineups").then(response=>{
					this.lineups = response.data;
					this.lineups.push({name: "New", lineups:[]});
				}).catch(error=>{
					console.log(error);
				})
			},
			getPlayer(){
				this.axios.get("/api/mates").then(response=>{
					this.players = response.data;
					
				}).catch(error=>{
					console.log(error);
				})
			},
			save(){
				const positions = [];
				const currentLinueup = this.lineups[this.current];
				currentLinueup.lineups.forEach(l=>{
					const position = {
						player: l.player._id,
						top: l.top,
						left: l.left
					}
					delete l.style;
					positions.push(position)
				});
				const id = currentLinueup._id;
				if (id) {
					this.axios.put("/api/lineups/" + id, {lineups: positions, name: currentLinueup.name}).then(response=>{
						this.getLineup();
					}).catch(err =>{
						console.log(err);
					})
				} else {
					this.axios.post("/api/lineups", {lineups:positions, name: currentLinueup.name}).then(response=>{
						this.getLineup();
					}).catch(err=>{
						console.log(err);
					})
				}
			}	
					
				
		},
		components: {
			Player, Field
		}
	})
</script>
<style lang="scss">
.tab-form{
	width: 100%;
	text-align: center;
	input {
	    font-size: 18px;
		width: 80%;
	}
			
}
	
.players{
	width: 360px;
	padding: 20px 0px;
	display: flex;
	align-items: center;

	flex-wrap: wrap;

	background: $blue;
	&:after{
		content: "";
		flex-grow: 999;
	}

}
.content {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	border: 3px solid $gold;
}
.lineup{

	background: green;
	flex-grow: 1;
	margin: 0 auto;	

	
}

.header{
	width: 100%;
	color: white;
	font-size: 20px;
	padding-left: 20px;
	background: green;

}
.tab-title{
	max-width: inherit;
	 overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
}

#lineup-container{
	
	display:flex;
	flex-wrap: wrap;
	margin: 0 auto;
	
}
@media only screen and (max-width: 768px){
  .lineup, .players{
    width:100%;
  }
  .lineup-panel{
  	ul{
  		li{
  			flex-basis: 100px;
  		}
  	}
  }
}

</style>