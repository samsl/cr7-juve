<template>
	<div id="draw-container">
		<div v-show="!finished">
			<div class="pots mobile" v-for="pot in pots">
				<div class="medium-icon">
				<font-awesome-icon  :icon="icon[pot.pot-1]"/>
				</div>
				<div class="medium-img" v-for="club in pot.clubs">
					<img :src="'/static/img/club logo/' + club.logo">
					
				</div>	
				
			</div>
			<div class="pots" v-show="posibleGroup.length>0"><div class="medium-icon"><font-awesome-icon icon="info"/></div><span class="medium-icon mobile-tight" v-for="g in posibleGroup">{{g}}</span></div>
			<div v-show="!finished" id="lucky-box">
			
					<div v-show="clubStage" class="large-img centralize">
					<img  :src="'/static/img/club logo/' + currentClub.logo"/>
					
				</div>
				<div v-show="!clubStage" class="centralize big-icon">
					{{group}}
				</div>
				<div v-show="!start">
					<button @click="draw();start=true">Start</button>
				</div>
				<div v-show="start && !confirm">
					<button @click="stop();confirm=true">Stop</button>
				</div>
				<div v-show="confirm">
					<button @click="start=false;confirm=false;next()">Confirm</button>
				</div>	
			</div>
		</div>
		<div class="groups">
			<div class="group mobile-tight" v-for="group in distribution">			
				<table>
					<th><span class="mobile-hide">Group</span> {{group.group}}</th>
					<tr v-for="club in group.clubs">
						<td>
							<div class="centralize">
							<div v-show="club.logo" class="small-img">
							<img  :src="'/static/img/club logo/' + club.logo"></div>
							<span class="mobile-hide">{{club.name}}</span>
							</div>
						</td>	
					</tr>					
				</table>
			</div>
		</div>	
	</div>
</template>
<script>
	export default ({
		data: function(){
			return{
				icon:["chess-king", "chess-rook", "chess-knight", "chess-pawn"],
				pots:[],
				groups: ["A", "B", "C", "D", "E", "F", "G", "H"],
				currentClub:{},
				start: false,
				currentPot:0,
				clubStage: true,
				animate:{},
				confirm: false,
				distribution:[],
				distributor:{},
				placeholder:{},
				possibleGroups:{},
				finished: false,
				posibleGroup:[],
				group: ""
			}
		},
		created() {
			this.getPots();
			this.distribution = this.groups.map(g =>{ return{
				group: g,
				clubs: new Array({},{},{},{})
			}
			});
			
			this.distributor = new Map();
			this.placeholder = new Map();
			const up = new Map();
			const down = new Map();
			this.possibleGroups = new Map();
			this.placeholder.set("up", up);
			this.placeholder.set("down", down);
			for (let i = 1; i <= 4; i++){
				up.set(i, new Map());
				down.set(i, new Map());
			}
		},
		methods:{
			initializePosibleGroups(){
				this.groups.forEach(g=>{
					this.possibleGroups.set(g, new Map());
					const group = this.possibleGroups.get(g);
					this.pots.forEach(pot=>{
						const candidates = new Map();
						group.set(pot.pot, candidates);
						pot.clubs.forEach(c => {
							if(!candidates.has(c.league)){
								candidates.set(c.league, []);
							}
							candidates.get(c.league).push(c);
						})
					})
				});
			
			},
			removeGroup(club, group, pot, remove=true){
				if (group === "up" || group === "down"){
					const groups = group==="up"? ["A","B","C","D"] : ["E","F","G","H"];
					groups.forEach(g=>{
						if (this.possibleGroups.get(g).has(pot) && this.possibleGroups.get(g).get(pot).has(club.league)){
							const potMap = this.possibleGroups.get(g).get(pot);
							const leagueArray = potMap.get(club.league)|| [];
							const idx = leagueArray.indexOf(club);
							if (idx>=0){
								if (!remove){
									let deleteClubs = [];				
									if (!potMap.has("deleted")){
										potMap.set("deleted", deleteClubs);
									} else {
										deleteClubs = potMap.get("deleted")
									}
									deleteClubs.push(leagueArray[idx]);
								}
								leagueArray.splice(idx, 1);
							}
					}
					})
					return;
				}
			
				this.possibleGroups.get(group).get(pot).forEach((clubArray, league)=>{
						if (league === "deleted") return;
						const potMap = this.possibleGroups.get(group).get(pot);
						if (!remove){
							let deleteClubs = [];				
							if (!potMap.has("deleted")){
								potMap.set("deleted", deleteClubs);
							} else {
								deleteClubs = potMap.get("deleted")
							}
							clubArray.forEach(c=>{
								if (c!==club)
									deleteClubs.push(c);
							})
						}
						if (league === club.league) {
							const leagueArray = []
							leagueArray.push(club);
							potMap.set(league, leagueArray);
						} else {
							potMap.set(league, []);
						}

				});			
				this.possibleGroups.forEach((groupMap, g)=>{
					if (g === group) return;
					if (groupMap.has(pot) && groupMap.get(pot).has(club.league)){
						const leagueArray = groupMap.get(pot).get(club.league)|| [];
						const idx = leagueArray.indexOf(club);

						if (idx>=0){
							if (!remove) {							
								let deleteClubs = [];	
								const potMap = groupMap.get(pot);		
								if (!potMap.has("deleted")){
									potMap.set("deleted", deleteClubs);
								} else {
									deleteClubs = potMap.get("deleted")
								}
								deleteClubs.push(leagueArray[idx]);
							}
							leagueArray.splice(idx, 1);
						}
					}
				});
				for (let pp = pot + 1; pp <= 4; pp++){
					const potMap = this.possibleGroups.get(group).get(pp);
					let removeLeague = [];					
					if (club.league === "Russia" || club.league === "Ukraine") {
						removeLeague.push("Russia");
						removeLeague.push("Ukraine");
					} else {
						removeLeague.push(club.league);
					}
					removeLeague.forEach(l=>{
						if (!potMap.has(l)) return;
						if (!remove){
							let deleteClubs = [];
							if (!potMap.has("deleted")){
								potMap.set("deleted", deleteClubs);
							} else {
								deleteClubs = potMap.get("deleted")
							}
							potMap.get(l).forEach(c=>{
								deleteClubs.push(c);
							})
						}		
					
						potMap.delete(l);
					})				
			
				}				
			},			
			remove(club, remove=true){
				for (let i = 1; i <= 4; i++){
					const potMap = this.distributor.get(i);
					if (potMap.has(club.league)){
						const idx = potMap.get(club.league).indexOf(club);
						if (idx >=0 ){
							if(!remove){
								let deleteClubs = [];
								if (!potMap.has("deleted")){
									potMap.set("deleted", deleteClubs);
								} else {
									deleteClubs = potMap.get("deleted");
								}
								deleteClubs.push(potMap.get(club.league)[idx])
								potMap.set("deleted", deleteClubs)
							}
							potMap.get(club.league).splice(idx, 1);
							break;
						}
					}
				}				

			},
			restore(){
				this.groups.forEach(g =>{
					const groupMap = this.possibleGroups.get(g);
					[1,2,3,4].forEach(p =>{
						const potMap = groupMap.get(p);					
						if (potMap.has("deleted")){
							const deleteClubs = potMap.get("deleted");
							deleteClubs.forEach(c=>{
								if (!potMap.has(c.league)){
									potMap.set(c.league, []);
								}
								potMap.get(c.league).push(c);
							})
							potMap.delete("deleted");
						}
					})
				});
				[1,2,3,4].forEach( p=>{
					const potMap = this.distributor.get(p);
					if (potMap.has("deleted")){
							const deleteClubs = potMap.get("deleted");
							deleteClubs.forEach(c=>{
								if (!potMap.has(c.league)){
									potMap.set(c.league, []);
								}
								potMap.get(c.league).push(c);
							})
							potMap.delete("deleted");
						} 
				});
				
				this.placeholder.forEach((halfMap, h)=>{
					[1,2,3,4].forEach(i=>{
						const potMap = halfMap.get(i);
						if (potMap.has("replaced")){
							potMap.get("replaced").forEach(c=>{
								const idx = potMap.get(c.league).indexOf(c);
								potMap.get(c.league).splice(idx,1, {name:"x", league: c.league});
								halfMap.set(c.league, halfMap.get(c.league)-1);
							});
							potMap.delete("replaced");
						}
						if (potMap.has("deleted")){
							potMap.get("deleted").forEach(c=>{
								const idx = potMap.get(c.league).indexOf(c);
								potMap.get(c.league).splice(idx,1);
								if (c.name!=='x'){
									halfMap.set(c.league, halfMap.get(c.league)-1);
								}	
							});
							potMap.delete("deleted");
						}
						
					})				
					
				})
			},
			opposite(half){
				return half === "up"? "down": "up"
			},
			place(league, pot, half, club, remove=true){
				const halfMap = this.placeholder.get(half)
				const potMap = halfMap.get(pot);
				let leagueArray = [];
				if (!potMap.get(league)){
					potMap.set(league, leagueArray)
				} else {
					leagueArray = potMap.get(league);
				}
				if (club.name === 'x') {
					if (!remove) {
						let deleteClubs = [];
						if (!potMap.has("deleted")){
							potMap.set("deleted", deleteClubs);
						} else {
							deleteClubs = potMap.get("deleted")
						}
						deleteClubs.push(club);
					}

					leagueArray.push(club);
					return;
				} else {					
					if (leagueArray.indexOf(club) >= 0){
						return
					}
					this.remove(club, remove);
					let flag = false;
					for(const idx in leagueArray){
						if (leagueArray[idx].name ==='x'){
							flag = true;
							if (!remove){
								let replacedClubs = [];
								if (!potMap.has("relaced")){
									potMap.set("replaced", replacedClubs);
								} else {
									replacedClubs = potMap.get("replaced")
								}
								replacedClubs.push(club);
									
							}
							
							leagueArray.splice(idx, 1, club);								
						} 
					}
					if (!flag){
						if (!remove) {
							let deleteClubs = [];
							if (!potMap.has("deleted")){
								potMap.set("deleted", deleteClubs);
							} else {
								deleteClubs = potMap.get("deleted")
							}
							deleteClubs.push(club);
						}
						leagueArray.push(club);
					}
						
					}
					let count = 0;
					if (halfMap.has(league)){
						count = halfMap.get(league);
					}
					halfMap.set(league, count + 1);
					const total = this.distributor.get(league);
					const average = Math.floor(total / 2 );
					if (total - halfMap.get(league) <= average) {				
						for (let i = 1; i <= 4; i++){
							const leftClubs = this.distributor.get(i).get(league)|| [];
							if (leftClubs.length) {
								leftClubs.forEach(c=>{
									const deleteClubs = this.distributor.get(i).get("deleted") ||[]
									if (deleteClubs.indexOf(c)>=0) return;
									this.place(league, i, this.opposite(half), c, remove);
									this.remove(c, remove)
									this.removeGroup(c, half, i, remove)
								});
								
							}
						}
					} else {
						let halfCount = 0;
						for (let j = 1; j <= 4; j++){
							const potMap = halfMap.get(j);
							if (potMap.has(league)){
								halfCount += potMap.get(league).length;
							}
						}
						for (let j = pot + 1; j <= 4; j++){
							const potMap = halfMap.get(j);
							let leftCount;
							if (this.distributor.get(j).has(league))
								leftCount = this.distributor.get(j).get(league).length; 
							else leftCount = 0;
							if (potMap.has(league)){
								 leftCount -= potMap.get(league).length;
							}
							const oppositePotMap = this.placeholder.get(this.opposite(half)).get(j);
							if (oppositePotMap.has(league)){
								leftCount -= oppositePotMap.get(league).length;
							}

							
							for (let s = total - (halfCount + leftCount);s < average && leftCount > 0; s++) {
								leftCount -=1;
								this.place(league, j, this.opposite(half), {name: "x", league: league}, remove);
							}


						}

					}			

			},
			analyze(){
				for (let i = 1; i<=4; i++) {
					const potMap = this.distributor.get(i);
					potMap.forEach((clubArray, league) =>{
						const total = this.distributor.get(league);
						const average = Math.floor(total/2);
						if (average > 0) {
							for (let j = total - potMap.get(league).length; j < average; j++){
								this.place(league, i, "up", {name: 'x', league: league});
								this.place(league, i, "down", {name: 'x', league: league});
							}
						}
					})
				}		
			},
			distributeClubs(){
				this.pots.forEach(pot=>{
					pot.clubs.forEach(club=>{
						let potMap;
						
						if(!this.distributor.has(pot.pot)){
							potMap = new Map();
							this.distributor.set(pot.pot, potMap);
						} else {
							potMap = this.distributor.get(pot.pot);
						}
						let clubArray = []
						if (!potMap.has(club.league)){
							potMap.set(club.league, clubArray);
						} else {
							clubArray = potMap.get(club.league);
							
						}
						let total = this.distributor.get(club.league) || 0;
						clubArray.push(club);
						total ++;
						this.distributor.set(club.league, total);
					})
				})
				this.analyze();
			},
			getPots(){
				this.axios.get("/api/pots").then(response=>{
					this.pots = response.data;
					this.currentClub = this.pots[this.currentPot].clubs[0];
					this.distributeClubs();
					this.initializePosibleGroups();
				}).catch(error =>{
					console.log(error);
				});
			},
			stop(){
				cancelAnimationFrame(this.animate);
				
			},
			getPosibleGroup(){
				
				this.groups.forEach(g=>{
					const clubMap = this.possibleGroups.get(g).get(this.currentPot + 1);
					if (clubMap.has(this.currentClub.league)) {
						const idx = clubMap.get(this.currentClub.league).indexOf(this.currentClub);
						
						if (idx>=0) {
							this.removeGroup(this.currentClub, g, this.currentPot+1, false);
							const half = ["A","B","C","D"].indexOf(g)>=0?"up":"down";
							this.place(this.currentClub.league, this.currentPot+1, half, this.currentClub, false);
							if (["up", "down"].filter(half =>{
								const halfMap = this.placeholder.get(half);
								return [1,2,3,4].filter(pot=>{
									const potMap = halfMap.get(pot);
									let total = 0;
									potMap.forEach((leagueArray, league)=>{
										
										if (league!=="deleted" && league !=="replaced"){
											total += leagueArray.length;
										}
									});
									return total>4;
								}).length > 0;
							}).length > 0) {
								this.restore();
							} else {
								const leftClubs = this.pots[this.currentPot].clubs;
								let flag = true;
								if (leftClubs.filter(c=>{				
								    return this.groups.filter(g=>{
									const potMap = this.possibleGroups.get(g).get(this.currentPot + 1);
									return potMap.has(c.league) && potMap.get(c.league).indexOf(c)>=0
									}).length > 0
							}).length < leftClubs.length){		
							
									this.restore();

								} else if (this.groups.filter(gg=>{
								let flag = false;
								for (let i = this.currentPot + 1; i<=4; i++){
									if (gg===g && i === this.currentPot+1) continue;
									let total = 0;
									this.possibleGroups.get(gg).get(i).forEach((clubs, league)=>{
										if (league!=="deleted"){
											total += clubs.length;
										}
									})
									if (total == 0) {
										flag = true;

										break;
										}	
								}
								this.restore();
								return flag=== true;
								
							}).length == 0){
								this.posibleGroup.push(g);	
							}
							}
						}
					}

				})	
			},
			draw(){
				if (this.clubStage) {
					const clubs = this.pots[this.currentPot].clubs;
					const club = clubs[Math.floor(Math.random()*clubs.length)];
					this.currentClub = club;
					

				} else {
					this.group = this.posibleGroup[Math.floor(Math.random()*this.posibleGroup.length)]
				}
				
				this.animate = requestAnimationFrame(this.draw);
			},
			next(){
				if (this.clubStage)	{
					this.getPosibleGroup();					
					const clubs = this.pots[this.currentPot].clubs
					const idx = clubs.indexOf(this.currentClub);
					clubs.splice(idx,1);
					this.remove(this.currentClub);				
					this.group = this.posibleGroup[0];
				} else {
					this.removeGroup(this.currentClub, this.group, this.currentPot + 1);
					this.distribution[this.groups.indexOf(this.group)].clubs[this.currentPot] = this.currentClub;
					
					const half = this.groups.indexOf(this.group) > 3?"down":"up";

					//put to placeholder
					this.place(this.currentClub.league, this.currentPot+1, half, this.currentClub);
					
									
					if (this.pots[this.currentPot].clubs.length == 0){
						if (this.currentPot === 3) {
							this.finished = true;
							return
						} else {
							
							this.currentPot += 1;
						}
					}
					this.group = this.posibleGroup[0];
					this.currentClub = this.pots[this.currentPot].clubs[0];	
					this.posibleGroup = [];
				}
				this.clubStage=!this.clubStage;

			}
		}
	})
</script>
<style lang="scss">
	#draw-container{
		background: white;
		margin: 20px auto;
		padding: 50px 0px;
	}
	.medium-icon{
		font-size: 50px;
		color: black;
		width: 50px;
		text-align: center;
	}
	.big-icon{
		font-size: 120px;
		font-size: 80px;
		color: black;
		text-align: center;
	}	
	.pots{
		width: 600px;
		display: flex;
		align-items: center;
		font-size: 50px;
		margin: 20px auto;
		span {
			width: 50px;
			text-align:  center;
			margin: 0 10px;
		}
		
	}
	.pot-clubs{
		flex-grow: 1;
		flex-shrink: 1;
	}
	.groups{
		display: flex;
		flex-wrap: wrap;
	}
	
	.group {
		width: 25%;
		padding: 20px 20px;
		font-size: 24px;
		table {
			
			width: 100%;
		}
		caption {
			margin-bottom: 10px;
		}
		th{
			background: $blue;
			color: white;
		}
		tr {
			background: $grey;
			margin: 5px 0;
		}
		td{			
			font-size: 18px;
			height: 42px;			
		}
	}
	#lucky-box{
		margin: 20px auto;
		text-align: center;
		.draw-group{
			width: 120px;
			height: 100px;
			margin: 0 auto;
			margin-bottom: 10px;
			font-size: 80px;		
		}
		
	}

</style>