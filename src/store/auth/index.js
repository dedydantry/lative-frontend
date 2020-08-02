const state = {
    user:null,
    token:null
}

const getters = {
    user : (state) => {
        return state.user
    },
    
    token: (state) => {
        return state.token
    }
}

const mutations = {
    SET_USER(state, value){
        state.user = value
    },

    SET_TOKEN(state, value){
        state.token = value
    }
}

const actions = {
    setUser({commit}, value){
        commit('SET_USER', value)
    },

    setToken({commit}, value){
        commit('SET_TOKEN', value)
    }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}