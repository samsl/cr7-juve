<template>
  <div id="home">
    <div class="tab-panel">
      <ul>
        <li
          v-for="season in seasons"
          @click="current=season['_id'];getRankings(current);getShooters(current)"
          :class="{'active-tab': activeSeason===season['_id'] && current===''||current===season['_id']}"
          :key="season['_id']"
        >
          <span class="tab-title">{{season.name}}</span>
        </li>
      </ul>
    </div>
    <div class="content">
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
            <td class="ranking-logo">
              <div class="small-img">
                <img :src="'/static/img/club logo/' + ranking.team.logo" />
              </div>
            </td>
            <td class="ranking-name mobile-tight">
              <span class="mobile-hide">{{ranking.team.name}}</span>
            </td>
            <td>{{ranking.p}}</td>
            <td>{{ranking.w}}</td>
            <td>{{ranking.d}}</td>
            <td>{{ranking.l}}</td>
            <td>{{ranking.gd}}</td>
            <td>{{ranking.pts}}</td>
            <td class="action-input">
              <font-awesome-icon
                v-if="editRankingIndex!==idx && $store.getters.authUser"
                icon="plus-circle"
                @click="editRankingIndex=idx"
              />
              <input
                class="home-input"
                v-if="editRankingIndex===idx && $store.getters.authUser"
                value
                @change="addResult(ranking.team, $event)"
              />
            </td>
          </tr>
        </table>
      </div>
      <div class="table-container">
        <table class="mobile">
          <caption>
            Top Scores
            <select v-model="match">
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
            <td class="ranking-logo">
              <div class="small-img">
                <img :src="'static/img/league logo/'+shooter.league+'.png'" />
              </div>
            </td>
            <td>{{shooter.appearances}}</td>
            <td>{{shooter.goals}}</td>
            <td class="action-input">
              <font-awesome-icon
                v-if="editShooterIndex!==idx && $store.getters.authUser && match!=='all'"
                icon="plus-circle"
                @click="editShooterIndex=idx"
              />
              <input
                class="home-input"
                v-if="editShooterIndex === idx && $store.getters.authUser"
                value
                @change="addGoal(shooter.name, $event)"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      editRankingIndex: -1,
      editShooterIndex: -1,	  
	  current:"",      
      shooters: [],
	  match: "all",
	  rankings: []
    };
  },
  computed: {
    seasons() {
      return this.$store.getters.seasons;
	},
	activeSeason() {		
		return this.$store.getters.current;
	},
    sorted() {
      const sorted = [];
      this.shooters.forEach(s => {
        if (this.match === "l") {
          sorted.push({
            name: s.name,
            league: s.league,
            appearances: s.appearances[0],
            goals: s.goals[0]
          });
        } else if (this.match === "c") {
          sorted.push({
            name: s.name,
            league: s.league,
            appearances: s.appearances[1],
            goals: s.goals[1]
          });
        } else {
          sorted.push({
            name: s.name,
            league: s.league,
            appearances: s.appearances[0] + s.appearances[1],
            goals: s.goals[0] + s.goals[1]
          });
        }
      });
      sorted.sort((a, b) => {
        if (a.goals > b.goals) return -1;
        else if (a.goals < b.goals) return 1;
        else {
          if (a.appearances < b.appearances) return -1;
          else if (a.appearances > b.appearances) return 1;
        }
      });
      return sorted;
    }
  },
  mounted() {
	  this.current = this.activeSeason;
	  if (this.current!=='') {
		this.getRankings(this.activeSeason);
    	this.getShooters(this.activeSeason);
	  }
  },
  watch: {
  activeSeason: function(newValue, oldValue) {  
	this.current = this.activeSeason;
    this.getRankings(this.activeSeason);
    this.getShooters(this.activeSeason);
  }
  },
  methods: {
    addGoal(shooter, $event) {
      const goals = $event.target.value;
      this.axios
        .put("/api/shooters/" + shooter, { score: goals, type: this.match })
        .then(response => {
          this.getShooters();
          $event.target.value = "";
        })
        .catch(err => {
          $event.target.value = "";
        });
      this.editShooterIndex = -1;
    },
    addResult(team, $event) {
      const result = $event.target.value;
      const results = result.split(":").map(r => parseInt(r));
      if (results.length === 2 && !isNaN(results[0]) && !isNaN(results[1])) {
        this.axios
          .put("/api/rankings/" + team._id, { score: result })
          .then(response => {
            $event.target.value = "";
            this.getRankings();
          })
          .catch(err => {
            $event.target.value = "";
          });
      } else {
        $event.target.value = "";
      }
      this.editRankingIndex = -1;
    },
    getRankings(season) {
		this.axios
        .get(`/api/rankings?season=${season}`)
        .then(response => {
          this.rankings = response.data;
        })
        .catch(err => {
          console.log(err);
        });
	},
    getShooters(season) {
      this.axios
        .get(`/api/shooters?season=${season}`)
        .then(response => {
          this.shooters = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss">
.table-container {
  width: 100%;
  margin-bottom: 1px;
  padding: 20px 0px;
  @include centralize;
  background: white;
  table {
    border-collapse: collapse;
    width: 80%;
    text-align: center;
  }
  caption {
    font-size: 20px;
    text-align: left;
    color: $red;
    height: 40px;
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
  tr:nth-child(odd) {
    background: #dce6e8;
  }
}
.ranking-logo {
  width: 60px;
}
.ranking-name {
  text-align: left;
  padding-left: 50px;
}
.team-container {
  @include centralize;
  justify-content: start;
}
.action-input {
  width: 75px;
}
.home-input {
  border: 2px solid black;
  width: 80%;
  text-align: center;
  font-size: 18px;
}
.content {
  display: flex;
  flex-wrap: wrap;
  border: 3px solid $gold;
}
</style>