import Vue from 'vue'
import Vuex from 'vuex'
import missions from './modules/missions'
import personnel from './modules/personnel'
import projects from './modules/projects'
import roles from './modules/roles'
import sensors from './modules/sensors'
import uavs from './modules/uavs'
import user from './modules/user'

import { fetchAssets, fetchAsset } from '@/api'


Vue.use(Vuex)
const actions = {
  INIT_DATA: ({ commit }) => {
    return fetchAsset('user', 1 )
      .then(response => {
        let user_data = {
            id: response.data.id,
            avatar_path: response.data.avatar_path,
            aws_cognito_id: response.data.aws_cognito_id,
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            phone_number: response.data.phone_number
        } 
        commit('setUser', user_data)

      let projectIds = response.data.projects.map( project => project.id )
      let uavIds = response.data.uavs.map( uav => uav.id )
      let sensorIds = response.data.sensors.map( sensor => sensor.id )
      let roleIds = response.data.roles.map( role => role.id )
      let personnelIds = response.data.personnel.map( person => person.id )
      let missionIds = response.data.missions.map( mission => mission.id )
  
      commit('setProjects', response.data.projects)
      commit('setProjectIds', projectIds)
      
      commit('setUavs', response.data.uavs)
      commit('setUavIds', uavIds)

      commit('setSensors', response.data.sensors)
      commit('setSensorIds', sensorIds)

      commit('setRoles', response.data.roles)
      commit('setRoleIds', roleIds)

      commit('setPersonnel', response.data.personnel)
      commit('setPersonnelIds', personnelIds)

      commit('setMissions', response.data.missions)
      commit('setMissionIds', missionIds)

    })
  }
}

const store = new Vuex.Store({
    modules: {
        missions,
        personnel,
        projects,
        roles,
        sensors,
        uavs,
        user,
    },
    actions: actions,
    strict: true,
}) 

export default store