import Vue from 'vue'
import Router from 'vue-router'
import Videos from '../components/Videos'
import Fixtures from '../components/Fixtures'
import Lineups from '../components/Lineups'
import Draw from '../components/Draw'
import Video from '../components/Video'
import Home from '../components/Home'
import Pages from '../components/Pages'
import Login from '../components/Login'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/pages',
    component: Pages,
    children:[{
      path: '',
      component: Home
    },{
    path: 'goals',
    name: 'goals',
    component: Videos
  },
    {
      path: 'fixtures',
      name:'fixtures',
      component: Fixtures
    },{
      path: 'lineups',
      name: 'lineups',
      component: Lineups
    },{
      path: 'draw',
      name: 'draw',
      component: Draw
    },{
      path: 'video/:id',
      name: 'video', 
      component: Video
    }
    ]
  },{
     path: '/login',
     name: 'login',
     component: Login
  }
  ]
})
