<template>
	 <div >  
        <upload-form :title="'Add a new match?'" :button="'YES'" :fields="fields" :uploadEvent="uploadMatch">
        </upload-form>
        <div id="fixtures">
        <table v-for="group in groupMatch">
            <caption>{{group.key | moment("MMMM YYYY")}}</caption>
            <tr v-for="match in group.matches">
                <td>{{match.date | moment("dddd, MMMM Do YYYY")}}</td>
                <td>{{match.date | moment("h:mm:ss a")}}</td>
                <td class="match-logo"><img class="small-img" :src="'/static/img/league logo/'+ match.matchType + '.png'"></td>
                <td class="team-home">{{match.home.name}}
                    <img class="small-img" :src="'/static/img/club logo/'+match.home.logo">
                </td>
                <td class="result-board">{{result(match.result)}}</td>
                <td class="team-away"><img class="small-img" :src="'/static/img/club logo/'+match.away.logo">{{match.away.name}}</td>
            </tr>
            
        </table>
    	</div>
    </div>
</template>
<script>	
	import UploadForm from './UploadForm'	
	export default ({
		data: function(){
			return {
				location:null,
				date: "",
				opponent: null,				
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
		        
		        locations:[{
		        	alt: "Away",
		        	fontAwesome: true,
		        	class: "plane",
		        	value: "Away"
		        },{
		        	alt: "Home",
		        	fontAwesome: true,
		        	class: "home",
		        	value: "Home"
		        }],
		        matches: [],
		        clubs: [],
		        matchType: null
			}

		},
		mounted: function(){
		this.getAllMatches();

	},
	computed: {				
		fields(){			
			return [{
						name: "Date",
						type: "datetime",
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
						name: "Location",
						type: "imgSelect",					
						options: this.locations,
						vueName: "location"
					 }]
		},
		myClub(){
			return this.clubs.find(c => {
        			return c.alt === "Juventus";
        		}).value;
		},
		groupMatch(){
			let groups=[]
			let lastMonth = 0;
			let lastYear = 0;
			let group = {};
			this.matches.forEach(m =>{
				const date = new Date(m.date);
				const year = date.getFullYear();
				const month = date.getMonth();
				if (lastMonth != month || lastYear != year) {
					if (Object.keys(group).length !==0) {
						groups.push(group);
						group = {};
					}
					group = {
						"key": year + "-" + (month+1).toString().padStart(2,"0"),
						"matches": group["matches"] || []
					}

					lastYear = year;
					lastMonth = month;

				} 
				group["matches"].push(m);
				

			});
			if (Object.keys(group).length !==0) {
						groups.push(group);
			}
			return groups;
		}
	},
	methods: {	
		result(result){
			if (result.length === 0 ){
				return "-:-";
			} else {
				return result[0] + ":" + result[1];
			}
		},	
		getClubs: function() {            
            this.axios.get("/api/clubs?competition=" + this.matchType.value).then(response => {
                this.clubs = response.data.map(c => {
                    return {
                        value: c._id,
                        src: "/static/img/club logo/" + c.logo,
                        alt: c.name
                    }
                });

            }).catch(error => {
                console.log(error);
            });
            
        },        
        uploadMatch: function(){
        	let home, away;
        	if (this.location.value === "Home") {
        		home = this.myClub;
        		away = this.opponent.value;	
        	} else {
				away = this.myClub;
        		home = this.opponent.value;	
        	}
        	let match = {
        		date: this.date,
        		home: home,
        		away: away,
        		matchType: this.matchType.value
        	};
        	this.axios.post("/api/matches", match).then(response=>{
        		console.log(match);	
        		this.getAllMatches();        		
        	}).catch(error=>{
        		console.log(error);
        	});
        },
        getAllMatches: function(){
        	this.axios.get("/api/matches").then(response=>{
        			this.matches = response.data;
        		}).catch(error=>{
        			console.log(error);
        		});
        }
	},
	components: {
			UploadForm
		}
	})
</script>
<style lang="scss">
 #fixtures{
 	@include centralize;
 	background: white;
 	flex-wrap: wrap;
 	padding: 40px 0px;
  caption {
  	color: black;
  	font-weight: bold;
  	 width: 100%;
    text-align: left;
    padding: 5px 20px;
    background: $grey;
    height: 36px;
  }
  table {
  	
    border-collapse: collapse;
    width: 80%;
    margin-bottom: 36px;
    color: $silver;
		&:last-child{
		margin-bottom: 0px;
		}
	}
	

	tr, caption {
		border-bottom: 1px solid $silver;	
	}
	td:first-child {
  	width: 30%;
    padding-left: 20px;
    padding-right: 0; 
    }
	
}
.match-logo{
	width: 4%;
}
  .team-home {
  	text-align: right;
  	width: 25%;
    }
 	.team-away {
    text-align: left;
    width: 25%;   
	}
 .result-board {
 	width: 4%;
    background: $grey;
    text-align: center; }
</style>