import { fetchAssets } from '@/api'


const defaultState = {
    missions: [],
    missionIds: [],
    editMission: {}
}

// retrieve the state data
const getters = {
  getMissions: state => {
      return state.missions
  },
  getMission: state => (id) => {
      return state.missions.find(mission => mission.id === id)
  },
  getMissionsByProjectId: state => (projectId) => {
    return state.missions.filter(mission => mission.project_id === projectId)
  }
}

const actions = {
  // load all missions
  LOAD_MISSION: ({ commit }) => {
    return fetchAssets(
      'mission'
    ).then(response => {
      commit('setMission', response.data.missions)
    })
  }
}

// change the state objects
const mutations = {
    setMissions: (state, payload) => {
      state.missions = payload
    },
    setMission: (state, payload) => {
      state.missions.push(payload)
    },
    setMissionIds: (state, payload) => {
      state.missionIds = payload
    },
    removeMission: (state, { mission }) => {
      state.missions.splice(state.missions.indexOf(mission, 1, mission))
    },
    setEditMission: (state, mission) => {
      state.editMission = mission
    },
    clearEditMission: (state) => {
      state.editMissionId = {}
    }
  }

export default {
    state: defaultState,
    getters,
    actions,
    mutations
}