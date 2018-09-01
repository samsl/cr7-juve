<template>
	<div id="videos">		
        <upload-form :title="'Upload a CR7 goal video now ?'" :button="'GOAL!'" :fields="fields" :uploadEvent="uploadVideo"></upload-form>
        <video-list :videos="videos">            
        </video-list>   
       
     </div>    
</template>
<script>
	
    import VideoList from './VideoList'    
    import UploadForm from './UploadForm'
    import {mapGetters} from 'vuex'
	export default {
		   
    data: function() {
        return {
        importance: "",
        date: "",
        assist: "",
        opponent: "",
        shotType: "",
        matchType: "",
        file: "",
        time: 0,
        choose: false,
        error: "",
        form: false,
        matchTypes: [{
            src: "/static/img/league logo/Serie A.png",
            alt: "Serie A",
            value: "Serie A"
        }, {
            src: "/static/img/league logo/Champions League.png",
            alt: "Champions League",
            value: "Champions League"
        }, {
            src: "/static/img/league logo/Coppa Italia.png",
            alt: "Coppa Italia",
            value: "Coppa Italia"
        }],
        importances:[{
            alt: "LEAD",
            noImg: true,
            value: "LEAD"
        }, {
            alt: "EQUALIZER",
            noImg: true,
            value: "EQUALIZER"
        },{
            alt: "WINNING",
            noImg: true,
            value: "WINNING"

        },{
            alt: "GOAL",
            noImg: true,
            value: "GOAL"
        }],
        shotTypes:[{
            alt: "KICK",
            value: "KICK",
            noImg: true
        },{
            alt: "FREE-KICK",
            value: "FREE-KICK",
            noImg: true
        },{
            alt: "PENALTY",
            value: "PENALTY",
            noImg: true
        },{
            alt: "HEADER",
            value: "HEADER",
            noImg: true
        },{
            alt: "VOLLEY",
            value: "VOLLEY",
            noImg: true
        },{
            alt: "BACKHEEL",
            value: "BACKHEEL",
            noImg: true
        }],
        clubs: [],
        mates: []
    }
    },
    computed: {
        videos(){
            return this.$store.state.videos;
        },      
        fields(){
            return [
                    {
                        name: "Date",
                        type: "date",
                        value: this.date,
                        vueName: "date"

                    }, {
                        name: "Match",
                        type: "imgSelect",
                        vueName: "matchType",
                        options: this.matchTypes,
                        changeEvent: this.getClubs
                    }, {
                        name: "Opponent",
                        type: "imgSelect",
                        options: this.clubs,
                        vueName: "opponent"                        
                    }, {
                        name: "Match Time",
                        type: "number",
                        value: this.time,
                        vueName: "time"

                    }, {
                        name: "Importance",
                        type: "imgSelect",
                        options: this.importances,
                        vueName: "importance"
                    }, {
                        name: "Shot Type",
                        type: "imgSelect",
                        options: this.shotTypes,
                        vueName: "shotType"
                    }, {
                        name: "Assist",
                        type: "imgSelect",
                        options: this.mates,
                        vueName: "assist"
                    }, {
                        name: "Video",
                        type: "file",
                        vueName: "file"
                    }
            ]
        }
    },
    mounted: function(){
    	this.getMates();
        
    },
    methods: {        	
        getMates: function() {
            this.axios.get("/api/mates").then(response => {
            	this.mates = response.data.map(p =>  {
                    return {
                	src: "/static/img/players/" + p.logo,
                    alt: p.name,
                    value: p._id
                    }}
                )
            }).catch(error => {
                console.log(error);
            })
        },        
        getClubs: function() {      
            if (this.matchType){
                this.axios.get("/api/clubs?competition=" + this.matchType.value).then(response => {
                    const clubs = response.data;
                    this.clubs = clubs.map(c => {
                        return {
                            value: c._id,
                            src: "/static/img/club logo/" + c.logo,
                            alt: c.name
                        }
                    });
                }).catch(error => {
                    console.log(error);
                });
            }
        },       
        uploadVideo: function(event) {
            let video = {
                importance: this.importance.value,
                date: this.date,
                assist: this.assist.value,
                opponent: this.opponent.value,
                shotType: this.shotType.value,
                matchType: this.matchType.value,
                title: this.file.name,
                time: this.time
            };

            this.axios.post('/api/videos', video).then(response => {
                this.$store.dispatch('getVideos');
            }).catch(error => {
                console.log(error);
            });
            const formData = new FormData();
            formData.append("file", this.file);
            this.axios.post('/api/files', formData).then(response => {
                console.log(response);                
            }).catch(error => {
                console.log(error);
            });
        }
    },
	components: {
			VideoList, UploadForm
		}
	}
</script>
