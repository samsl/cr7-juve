<template>
	<div class="field-container" @dragover="dragover" @drop="drop">
		<div class="field">		
			<lineup v-for="(lineup, idx) in lineups" :lineup="lineup" :idx="idx" :position="compose(lineup)" :key="lineup._id"></lineup>
			<div class="top-left-corner"></div>
			<div class="top-right-corner"></div>
			<div class="bottom-left-corner"></div>
			<div class="bottom-right-corner"></div>
			<div class="penalty-area top">
				<div class="top-point"></div>
				<div class="goal-area top"></div>		
			</div>
			<div class="top-arc-container">			
			</div>
			<div class="center-line">
				
			</div>
			<div class="center-point"></div>
			<div class="center-circle">
			</div>
			<div class="penalty-area bottom">
				<div class="bottom-point"></div>
				<div class="goal-area bottom"></div>		
			</div>
			<div class="bottom-arc-container">
			
			</div>			
		</div>
		<div class="grass-container">
			<div v-for="n in 10" class="grass"></div>			
		</div>
	</div>
</template>
<script>
import Lineup from "./Lineup"
	export default{
		props: ["lineups"],
		components: {
			 Lineup
		},
		methods:{
			compose(lineup){
				return {
					"top": lineup.top, 
					"left": lineup.left,
					"position": "absolute",
					"cursor": "move",
					 "z-index": 10
				}
			},
			dragover(event){				
				event.preventDefault();
			},
			drop(event){	
			event.preventDefault();			
				const offset = event.dataTransfer.getData("text/plain").split(',');
				const left = (event.clientX + parseInt(offset[0], 10)) + "px";
				const top = (event.clientY + parseInt(offset[1], 10)) + "px";
				const idx = parseInt(offset[2], 10);
				this.lineups[idx].top = top;
				this.lineups[idx].left = left;						
			}
		}
	}
</script>
<style lang="scss">
@mixin arc($up){
	width: 18%;
	padding-bottom: 7%;
	overflow: hidden;
	position: absolute;
	left: 41%;
	z-index: 2;
	@if $up {
		top: 12%;	
	} @else {
		bottom: 12%;
	}
	
	&:after{
		content: "";
		width: 80%;
		padding-bottom: 80%;
		@if $up{
			top: -170%;		
		} @else {
			bottom: -170%;
		}	
		position: absolute;
		left: 10%;
		border-radius: 50%;
		border: 3px solid white;
		overflow: hidden;
		}
	
}
@mixin point($position){
	border-radius: 50%;	
	border: inherit;
	position: absolute;
	width: 6px;
	height: 6px;
	left: 49.9%;
	@if $position == 'center' {
		top: 49.9%;
	}@else if $position == 'top' {
		top: 67%;
	} @else {
		bottom: 67%;
	}
}
@mixin corner($top, $left){	
	position: absolute;
	border-radius: 50%;
	width:20px;
	height:20px;
	border: inherit;
	z-index: 2;
	@if $top{
		top: -10px;
	} @else {
		bottom: -10px;
	}
	@if $left {
		left: -10px;
	} @else {
		right: -10px; 
	}
}
.top-left-corner{
	@include corner(true, true);
}
.top-right-corner{
	@include corner(true, false);
}
.bottom-left-corner{
	@include corner(false, true);
}
.bottom-right-corner{
	@include corner(false, false);
}
.top{
	border-top: none !important; 
	top: 0px;
}
.bottom{
	bottom: 0px;
	border-bottom: none !important;
	
}
.field-container{
	width: 80%;
	position: relative;
	margin: 20px auto;
}
.field{
	position: relative;
	border: 3px solid white;
	width: 100%;
	overflow: hidden;
	background: green;
	padding-top: 150%;
}
.penalty-area{
	position: absolute;
	width: 44%;
	padding-top: 18%;
	left: 28%;
	border: inherit;

	
	
	z-index: 2;
}
.top-arc-container{
	@include arc(true);

}
.bottom-arc-container{
	@include arc(false);
}
.center-point{
	@include point('center');	
}
.top-point{
	@include point('top');	
}
.bottom-point{
	@include point('bottom');	
}
.center-line{
	border: inherit;
	border-width: 1.5px;
	position: absolute;
	top: 50%;
	height: 0px;
	width: 100%;
	z-index: 2;
}
.center-circle{
	position: absolute;
	left: 40%;
	top: 43.3%;
	width: 20%;
	padding-top: 20%;
	border-radius: 50%;
	border: inherit;
	z-index: 2;
}
.goal-area{
	position: absolute;
	padding-top: 15%;
	width: 44%;
	left: 28%;

	border: inherit;
}
.grass-container{
	position: absolute;
	border: 3px solid white;
	width: 100%;
	height: 100%;
	top:0;
	left: 0;
	display: flex;
	z-index: 1;
}
.grass{
	box-sizing: border-box;
	width: 10%;
	
}
.grass:nth-of-type(odd){
	background: #196619;
}
</style>