<template>
	<div class="player" @click="substitution"><div class="medium-img"><img :src="'/static/img/players/' + player.logo" /></div><div class="badge" :class="{up: up}"><font-awesome-icon icon="plus"/></div></div>		
</template>
<script>
	export default({
		props: ['player', 'up'],

		methods: {
			substitution(){		
				const parent = this.$parent;
				const positions = parent.lineups[parent.current].lineups		
				if (!this.up) {
					const lineup = {
						"top": "50%",
						"left": "50%",
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
.badge {
	position: absolute;
	right: 0px;
	top: 0px;
}
.up{
	color: $gold;
}
.player{
	width: 80px;
	margin: 0px 5px;
	position: relative;
	
	color: $blue;
	font-size: 20px;
}
</style>