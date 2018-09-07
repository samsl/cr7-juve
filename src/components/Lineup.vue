<template>
	<div class="lineup-player" :style="position" draggable="true" @dragstart="dragstart"><img :src="'/static/img/players/' + lineup.player.logo" class="medium-img" /></div>
</template>
<script>
	export default {
		props: ["lineup", "idx", "position", "width", "height"],		
		methods:{
			dragstart($event){					
				const left = parseInt(this.position.left.slice(0,-1), 10)*this.width/100;
				const top = parseInt(this.position.top.slice(0,-1), 10)*this.height/100;
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
@media only screen and (max-width: 768px){
	.lineup-player{
		width: 30px;
		height: 30px;
		text-align: center;
	}
}
</style>