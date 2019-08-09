<template>
  <div>
    <div class="tab-panel">
      <ul>
        <li
          v-for="season in seasons"
          @click="current=season['_id']"
          :class="{'active-tab': activeSeason===season['_id'] && current===''||current===season['_id']}"
          :key="season['_id']"
        >
          <span class="tab-title">{{season.name}}</span>
        </li>
      </ul>
    </div>
    <div id="trophy-content">
      <span class="trophy-title">TROPHY ROOM</span>
      <div class="trophies">
        <div v-for="(trophy,idx) in trophies" :key="idx" class="trophy">
          <div >
            <img :src="'/static/img/trophies/'+ trophy.type + '.png'" class="trophy-img" />
          </div>
          <span>{{trophy.type}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      current: ""
     
    };
  },
  mounted() {
    this.current = this.activeSeason;   
  },
  watch: {
    activeSeason: function(newValue, oldValue) {
      this.current = newValue;
    }
  },
  computed: {
    seasons() {
      return this.$store.getters.seasons;
    },
    activeSeason() {
      return this.$store.getters.current;
    },
    trophies() {
      return this.$store.getters.trophies.filter(t => t.season === this.current);
    }
  }

};
</script>
<style lang="scss">
#trophy-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border: 3px solid $gold;
  min-height: 400px;
}
.trophies {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.trophy-img {
  height: 150px;
}
.trophy {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  margin: 20px 20px

}
.trophy-title {
  margin: 30px auto;
  font-size: 40px;

}
</style>