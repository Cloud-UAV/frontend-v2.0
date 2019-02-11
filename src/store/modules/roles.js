import { fetchAssets } from '@/api'


const defaultState = {
    roles: [],
    roleIds: []
}

const getters = {
  getRoles: state => {
    return state.roles
  },
  getRole: ( state ) => ( id ) => {
    return state.roles.find(role => role.id === id)
  }
}

const actions = {
}

const mutations = {
    setRoles: (state, payload) => {
        state.roles = payload
    },
    setRoleIds: (state, payload) => {
        state.roleIds = payload
    }
}

export default {
    state: defaultState,
    getters,
    actions,
    mutations
}