import Vue from 'vue'
import Router from 'vue-router'
import Videos from '../components/Videos'
import Fixtures from '../components/Fixtures'
import Lineups from '../components/Lineups'
import Draw from '../components/Draw'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/goals',
    name: 'GOALS',
    component: Videos
  },
  	{
  		path: '/fixtures',
  		name:'FIXTURES',
  		component: Fixtures
  	},{
      path: '/lineups',
      name: 'LINEUPS',
      component: Lineups
    },{
      path: '/draw',
      name: 'DRAW',
      component: Draw
    }]
})
