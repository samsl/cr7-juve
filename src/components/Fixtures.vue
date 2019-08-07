<template>
  <div>
    <div class="tab-panel">
      <ul>
        <li
          v-for="season in seasons"
          @click="current=season['_id'];getAllMatches(current)"
          :class="{'active-tab': activeSeason===season['_id'] && current===''||current===season['_id']}"
          :key="season['_id']"
        >
          <span class="tab-title">{{season.name}}</span>
        </li>
      </ul>
    </div>
    <div id="fixtures-content">
      <upload-form
        v-if="auth"
        :title="'Add a new match?'"
        :button="'YES'"
        :fields="fields"
        :uploadEvent="uploadMatch"
      ></upload-form>
      <div id="fixtures">
        <table class="mobile" v-for="group in groupMatch">
          <caption>{{group.key | moment("MMMM YYYY")}}</caption>
          <tr v-for="(match, idx) in group.matches">
            <td class>{{match.date | moment("Do")}}</td>
            <td class>{{match.date | moment("HH:mm:ss")}}</td>
            <td class="match-logo">
              <div class="small-img">
                <img :src="'/static/img/league logo/'+ match.matchType + '.png'" />
              </div>
            </td>
            <td class="team-home">
              <div class="team-home-container">
                <span class="mobile-hide">{{match.home.name}}</span>
                <div class="small-img">
                  <img :src="'/static/img/club logo/'+match.home.logo" />
                </div>
              </div>
            </td>
            <td class="result-board">
              <div @dblclick="edit_line=idx;edit_group=group.key">
                <div v-if="edit_line===idx&&group.key===edit_group&&auth">
                  <input
                    type="text"
                    :value="result(match.result)"
                    @change="editResult(match,$event)"
                  />
                </div>
                <span v-else>{{result(match.result)}}</span>
              </div>
            </td>
            <td class="team-away">
              <div class="team-away-container">
                <div class="small-img">
                  <img :src="'/static/img/club logo/'+match.away.logo" />
                </div>
                <span class="mobile-hide">{{match.away.name}}</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import UploadForm from "./UploadForm";
export default {
  data: function() {
    return {
      current: "",
      edit_line: -1,
      edit_group: -1,
      location: null,
      date: "",
      opponent: null,
      matchTypes: [
        {
          src: "/static/img/league logo/Serie A.png",
          alt: "Serie A",
          value: "Serie A"
        },
        {
          src: "/static/img/league logo/Champions League.png",
          alt: "Champions League",
          value: "Champions League"
        },
        {
          src: "/static/img/league logo/Coppa Italia.png",
          alt: "Coppa Italia",
          value: "Coppa Italia"
        }
      ],

      locations: [
        {
          alt: "Away",
          fontAwesome: true,
          class: "plane",
          value: "Away"
        },
        {
          alt: "Home",
          fontAwesome: true,
          class: "home",
          value: "Home"
        }
      ],
      matches: [],
      clubs: [],
      matchType: null
    };
  },
  mounted() {
	  this.current = this.activeSeason;
	  if (this.current!=='')
    this.getAllMatches(this.current);
  },
  watch: {
    activeSeason: function(newValue, oldValue) {
	  this.current = newValue;
	  this.getAllMatches(this.current);
    }
  },
  computed: {
    seasons() {
      return this.$store.getters.seasons;
    },
    activeSeason() {
      return this.$store.getters.current;
    },
    auth() {
      return this.$store.getters.authUser;
    },
    fields() {
      return [
        {
          name: "Date",
          type: "datetime",
          vueName: "date"
        },
        {
          name: "Match",
          type: "imgSelect",
          vueName: "matchType",
          options: this.matchTypes,
          changeEvent: this.getClubs
        },
        {
          name: "Opponent",
          type: "imgSelect",
          options: this.clubs,
          vueName: "opponent"
        },
        {
          name: "Location",
          type: "imgSelect",
          options: this.locations,
          vueName: "location"
        }
      ];
    },
    myClub() {
      return this.clubs.find(c => {
        return c.alt === "Juventus";
      }).value;
    },
    groupMatch() {
      let groups = [];
      let lastMonth = 0;
      let lastYear = 0;
      let group = {};
      this.matches.forEach(m => {
        const date = new Date(m.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        if (lastMonth != month || lastYear != year) {
          if (Object.keys(group).length !== 0) {
            groups.push(group);
            group = {};
          }
          group = {
            key: year + "-" + (month + 1).toString().padStart(2, "0"),
            matches: group["matches"] || []
          };

          lastYear = year;
          lastMonth = month;
        }
        group["matches"].push(m);
      });
      if (Object.keys(group).length !== 0) {
        groups.push(group);
      }
      return groups;
    }
  },
  methods: {
    result(result) {
      if (result.length === 0) {
        return "-:-";
      } else {
        return result[0] + ":" + result[1];
      }
    },
    editResult(match, $event) {
      const result = $event.target.value;
      const results = result.split(":").map(r => parseInt(r));
      if (results.length === 2 && !isNaN(results[0]) && !isNaN(results[1])) {
        match.result = results;
        match.season = this.current || this.activeSeason;
        this.axios
          .put("/api/matches/" + match._id, match)
          .then(response => {})
          .catch(err => {
            match.result = [];
          });
      } else {
        match.result = [];
      }
      this.edit_line = -1;
    },
    getClubs: function() {
      this.axios
        .get("/api/clubs?competition=" + this.matchType.value)
        .then(response => {
          this.clubs = response.data.map(c => {
            return {
              value: c._id,
              src: "/static/img/club logo/" + c.logo,
              alt: c.name
            };
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    uploadMatch: function() {
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

      match.season = this.current || this.activeSeason;
      this.axios
        .post("/api/matches", match)
        .then(response => {
          console.log(match);
          this.getAllMatches(this.current);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAllMatches: function(season) {
      this.axios
        .get(`/api/matches?season=${season}`)
        .then(response => {
          this.matches = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    UploadForm
  }
};
</script>
<style lang="scss">
#fixtures-content {
  border: 3px solid $gold;
}
#fixtures {
  padding: 20px 0px;
  @include centralize;
  background: white;
  flex-wrap: wrap;

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
    &:last-child {
      margin-bottom: 0px;
    }
  }

  tr,
  caption {
    border-bottom: 1px solid $silver;
  }
  td:first-child {
    width: 30%;
    padding-left: 20px;
    padding-right: 0;
  }
}
.match-logo {
  width: 4%;
}
.team-home {
  width: 25%;
}
.team-home-container {
  justify-content: flex-end;
  display: flex;
  align-items: center;
}
.team-away {
  width: 25%;
}
.team-away-container {
  justify-content: flex-start;
  display: flex;
  align-items: center;
}
.result-board {
  width: 4%;
  background: $grey;
  text-align: center;
  input {
    font-size: 18px;
    text-align: center;
    width: 100%;
  }
}
</style>