import store from '../store';

const defaultState = {
    personnel: [],
    personnelIds: []
}

// retrieve the state data
const getters = {
  getPersonnel: state => {
      return state.personnel
  },
  getPerson: state => (id) => {
    // check if personnel is main user
    if (store.state.user.user.id == id) {
      return store.state.user.user
    } else {
      return state.personnel.find(person => person.id === id)
  
    }
  }
}

const actions = {
}

// change the state objects
const mutations = {
    setPersonnel: (state, payload) => {
      state.personnel = payload
    },
    setPerson: (state, payload) => {
      state.personnel.push(payload)
    },
    setPersonnelIds: (state, payload) => {
      state.personnelIds = payload
    },
    removePerson: (state, { person }) => {
      state.personnel.splice(state.personnel.indexOf(person))
    },
    updatePerson: (state, person) => {
      state.personnel.splice(state.personnel.indexOf(person), 1, person)
    }
}

export default {
    state: defaultState,
    getters,
    actions,
    mutations
}