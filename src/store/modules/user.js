import { fetchAssets } from '@/api'
import store from '../store';


const userId = 1


const defaultState = {
    user: {}
}

const getters = {
  getUser: state => {
    return state.user
  }
}

// call by using this.$store.dispatch('actionName')
const actions = {
    initUser: ({ commit }) => {
        return fetchAssets(
            'user', userId
        ).then(response => {
            commit('setUser', response.data.object)
        })
    }
}

const mutations = {
    setUser: (state, payload) => {
        state.user = payload
    }
}

export default {
    state: defaultState,
    getters,
    actions,
    mutations
}