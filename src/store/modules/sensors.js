const defaultState = {
  sensors: [],
  sensorIds: []
}

const getters = {
  getSensors: state => {
    return state.sensors
  }
}

// call by using this.$store.dispatch('actionName')
const actions = {
}

const mutations = {
  setSensors: (state, payload) => {
    state.sensors = payload
  },
  setSensor: (state, payload) => {
    state.sensors.push(payload)
  },
  setSensorIds: (state, payload) => {
    state.sensorIds = payload
  },
  removeSensor: (state, { sensor }) => {
    state.sensors.splice(state.sensors.indexOf(sensor))
  },
  updateSensor: (state, sensor) => {
    state.sensors.splice(state.sensors.indexOf(sensor), 1, sensor)
  }
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}