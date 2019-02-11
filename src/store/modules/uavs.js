const defaultState = {
    uavs: [],
    uavIds: []
}

const getters = {
    getUavs: state => {
        return state.uavs
    },

    getUavById: ( state ) => ( id ) => {
      return state.uavs.find(uav => uav.id == id)
    },
}

// call by using this.$store.dispatch('actionName')
const actions = {}

const mutations = {
    setUavs: (state, payload) => {
        state.uavs = payload
    },
    setUav: (state, payload) => {
      state.uavs.push(payload)
    },
    setUavIds: (state, payload) => {
        state.uavIds = payload
    },
    removeUav:  (state, { uav }) => {
      state.uavs.splice(state.uavs.indexOf(uav))
    },
    updateUav: (state, uav) => {
      state.uavs.splice(state.uavs.indexOf(uav), 1, uav)
    }
}

export default {
    state: defaultState,
    getters,
    actions,
    mutations
}