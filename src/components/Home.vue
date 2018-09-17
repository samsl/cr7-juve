<template>
	<div id="home">
	<div class="table-container">
		<table class="mobile">
			<caption>Serie A</caption>
			<th>Pos.</th>
			<th></th>
			<th></th>
			<th>P</th>
			<th>W</th>
			<th>D</th>
			<th>L</th>
			<th>GD</th>
			<th>Pts</th>
			<tr v-for="(ranking, idx) in rankings">
				<td>{{idx + 1}}</td>
				<td class="ranking-logo"><div class="small-img"><img :src="'/static/img/club logo/' + ranking.team.logo"></div></td>
				<td class="ranking-name mobile-tight"><span class="mobile-hide">{{ranking.team.name}}</span></td>
				<td>{{ranking.p}}</td>
				<td>{{ranking.w}}</td>
				<td>{{ranking.d}}</td>
				<td>{{ranking.l}}</td>
				<td>{{ranking.gd}}</td>
				<td>{{ranking.pts}}</td>
			</tr>
		</table>
	</div>
		<div class="table-container">
		<table class="mobile">
			<caption>Top Scores
				<select v-model="match" @onchange="sort()">
					<option value="l">League</option>
					<option value="c">Champions League</option>
					<option value="all">All</option>
				</select>
			</caption>
			<th>Pos.</th>
			<th>Name</th>
			<th>League</th>
			<th>App.</th>
			<th>Goals</th>
			<tr v-for="(shooter, idx) in sorted">
				<td>{{idx +1 }}</td>
				<td>{{shooter.name}}</td>
				<td class="ranking-logo"><div class="small-img"><img :src="'static/img/league logo/'+shooter.league+'.png'"></div></td>
				<td>{{shooter.appearances}}</td>
				<td>{{shooter.goals}}</td>
			</tr>
		</table>
	</div>
	</div>
</template>
<script>
	export default{
		data:function(){
			return{
				rankings:[],
				shooters:[],
				match: "all"
			}
		},
		computed:{
		sorted(){
			const sorted=[];
			this.shooters.forEach(s=>{
				if (this.match === "l") {
					sorted.push({
						name: s.name,
						league: s.league,
						appearances: s.appearances[0],
						goals: s.goals[0]
					})

				} else if (this.match === "c") {
					sorted.push({
						name: s.name,
						league: s.league,
						appearances: s.appearances[1],
						goals: s.goals[1]
					})
				} else {
					sorted.push({
						name: s.name,
						league: s.league,
						appearances: s.appearances[0] + s.appearances[1],
						goals: s.goals[0] + s.goals[1]

					})
				}
			});
			sorted.sort((a, b) =>{
				if (a.goals > b.goals) return -1;
				else if (a.goals < b.goals) return 1;
				else {
					if (a.appearances < b.appearances) return -1;
					else if (a.appearances > b.appearances)return 1;
				}
			});
			return sorted;
			}
		},
		mounted: function(){
			this.getRankings();
			this.getShooters();
		},
		methods:{
			getRankings(){
				this.axios.get("/api/rankings").then(response=>{
					this.rankings = response.data;	

				}).catch(err=>{
					console.log(err);
				})
			},
			getShooters(){
				this.axios.get("/api/shooters").then(response=>{
					this.shooters = response.data;
				}).catch(err=>{
					console.log(err);
				})
			}
		}
	}
</script>
<style lang="scss">
	.table-container {
		margin-bottom: 1px;
		padding: 20px 0px;
		@include centralize;
		background: white;
		table {
			border-collapse: collapse;;
		width: 80%;
		text-align: center;
		
		}
		caption{
			font-size: 20px;
			text-align: left;
			color: $red;
			height:40px;
			border-bottom: 5px solid $red;
			select {
				margin-left: 20px;
				font-size: 18px;
				
			}
		}
		td {
			padding: 5px;
		}
		th {
			height: 40px;
			vertical-align: middle;
		}
		tr:nth-child(odd){
			background: #DCE6E8;
		}

	}
	.ranking-logo{
		width: 60px;
	}
	.ranking-name{
		text-align: left;
		padding-left: 50px;
	}
	.team-container{
		@include centralize;
		justify-content: start;
	}
</style>