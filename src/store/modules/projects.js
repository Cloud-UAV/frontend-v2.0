// import Vue from 'vue'
import { fetchAssets } from '@/api'
import store from '../store';

//************************************************
// IMPORTANT TODO... 
// this user id needs to come from somewhere @ login - it represents the owner
// ************************************************


const defaultState = {
  projects: [],
  projectIds: [],
  selectedProjectId: -1,
  newProject: {},
}

// retrieve the state data
const getters = {
  getProjects: ( state ) => {
    return state.projects
  },       
  
  getProjectById: ( state ) => ( id ) => {
    return state.projects.find(proj => proj.id == id)
  },
}
    
// use for asynchronous tasks such as http calls
// call by using this.$store.dispatch('actionName')
const actions = {
  LOAD_ALL_PROJECT_DETAILS: ({ state, commit }) => {
    state.projectIds.forEach(projectId => {
      return fetchAssets(
        'project', projectId
      ).then(response => {
        response.data.personnel.forEach(person => commit('addOrUpdatePersonnel', person))
        commit('updateProject', response.data)
      })
    })
  }
}

// change the state objects
// call by using this.$store.commit('mutationName')
const mutations = {
  setProjects: (state, payload) => {
    state.projects = payload
  },
  
  setProjectIds: (state, payload) => {
    state.projectIds = payload
  },
  
  setSelectedProjectId: (state, id) => {
    state.selectedProjectId = id
  },
  
  updateProject: (state, project) => {
    let idx = state.projects.findIndex(proj => proj.id == project.id)
    state.projects[idx] = project
  },

  addOrUpdatePersonnel: (state, person) => {
    let foundPersonIdx = state.allProjectPersonnel.findIndex(per => per.id == person.id)
    if (foundPersonIdx == -1) {  // add 
      state.allProjectPersonnel.push(person)
    } else {  // update
      state.allProjectPersonnel[foundPersonIdx] = person
    }
  }
}

export default {
    state: defaultState,
    getters,
    actions,
    mutations
}