<template>
	<div id="video-list">        
	<div class="video-container mobile mobile-tight" v-for="video in videos">               
        <div class="video" >
             <router-link :to="{name:'video', params:{id: video.title}}">
	    	<video preload muted>
	    		<source :src="'https://drive.google.com/uc?export=download&id='+video.title+'#t=2'" type="video/mp4"/> Your browser does not support the video tag.
	    	</video>
        </router-link>
    	</div>
        <div class="video-opponent"><span class="video-label">Opponent:</span><div class="small-img"><img :src="'/static/img/club logo/'+video.opponent.logo"></div>
        </div>
        <div class="video-opponent"><span class="video-label">Match:</span><div class="small-img"><img :src="'/static/img/league logo/'+video.matchType+'.png'"></div>
        </div>
        <div class="video-opponent"><span class="video-label">Assist:</span><div class="small-img"><img :src="'/static/img/players/'+video.assist.logo"></div>
        </div>
        <div class="video-date">{{video.date | moment("dddd, MMMM Do YYYY")}}
        </div>

   </div>
  <div class="video-container"></div>
  <div class="video-container"></div>
  <div class="video-container"></div>
  <div class="video-container"></div>
  <div class="video-container"></div>
  <div class="video-container"></div>
  <div class="video-container"></div>
</div>
</template>
<script>
export default ({

	props: ["videos"],    
    methods: {       
    	
        playVideo: function(isPlay, $event){    				
    				if (isPlay) {
    					event.target.play();	
    				} else {
    					event.target.load();
    				}
    				
    			}
    }
    
});
</script>
<style lang="scss">

#video-list {
	display: flex;
	flex-wrap: wrap;
    
}
.video-container {
    width: 210px;
    margin: 10px;
    flex-grow:1;
    background: white;
    border: 2px solid white;
    &:nth-last-child(-n+7) {
        height: 0;
        border: none;
        margin: 0px 10px;
    }
}
.video {    
	position: relative;    
    video {
        
    	position: absolute;
        max-width: 100%;
        min-width: 100%;
    }
    &:after {
        @include scale(60%);
    }
}

.video-date, .video-opponent {
    width: 100%;
    white-space: nowrap;
  	padding: 10px 10px;
  	text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: bold;
    
    display: flex;
    align-items: center;
}
.video-date {
    color: $silver;
}


.video-label{
    width: 40%;
    text-align: left;
}

</style>
