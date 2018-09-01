<template>
	<div class="player" @click="substitution"><img class="medium-img" :src="'/static/img/players/' + player.logo" /><font-awesome-icon  v-show="up" icon="plus"/></div>		
</template>
<script>
	export default({
		props: ['player', 'up'],
		// data: function(){
		// 	return {
		// 		up: this.up,
		// 	}
		// },
		methods: {
			substitution(){		
				const parent = this.$parent;
				const positions = parent.lineups[parent.current].lineups		
				if (!this.up) {
					const lineup = {
						"top": "450px",
						"left": "150px",
						"player": this.player
					}
					
					positions.push(lineup);
				} else {
					let target = -1;
					for (const idx in positions){
						if(positions[idx].player._id === this.player._id) {
							target = idx;
							break;
						}
					}
					positions.splice(target, 1);
				}
			}
		}

	})
</script>
<style lang="scss">
.player{
	margin: 0px 5px;
	
	width: 100px;
	height: 80px;
	
	display: flex;
	color: $gold;

}
</style>