import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import About from './views/About.vue'
// import Project2 from './views/Project2.vue'
import Project from './views/Project.vue'
import UAV from './views/UAV.vue'
import Mission from './views/Mission.vue'
import Personnel from './views/Personnel.vue'
import Role from './views/Role.vue'
import Sensor from './views/Sensor.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    // {
    //   path: '/project',
    //   name: 'Project',
    //   component: Project2
    // },
    {
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/uav',
      name: 'UAV',
      component: UAV
    },
    {
      path: '/mission',
      name: 'Mission',
      component: Mission
    },
    {
      path: '/personnel',
      name: 'Personnel',
      component: Personnel
    },
    {
      path: '/role',
      name: 'Role',
      component: Role
    },
    {
      path: '/sensor',
      name: 'Sensor',
      component: Sensor
    }
  ]
})
