<template>
	<div class="lineup-player" :style="position" draggable="true" @dragstart="dragstart"><img :src="'/static/img/players/' + lineup.player.logo" class="medium-img" /></div>
</template>
<script>
	export default {
		props: ["lineup", "idx", "position"],		
		methods:{
			dragstart($event){				
				const left = parseInt(this.position.left.slice(0,-2), 10);
				const top = parseInt(this.position.top.slice(0,-2), 10);
				
				const offset_data = (left-event.clientX) + "," + (top-event.clientY) + "," + this.idx; 
				event.dataTransfer.setData("text/plain", offset_data);
			}
			
			
		}
	}
</script>
<style lang="scss">
.lineup-player{
	width: 80px;
	height: 80px;
	text-align: center;
}
</style>