/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

import auth from './auth/index'


const authCookies = new VuexPersistence({
    restoreState: (key) => Cookies.getJSON(key),
    saveState: (key, state) => Cookies.set(key, state, {
        expires: 1
    }),
    modules: ['auth'],
})


Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules:{
        auth:auth
    },
    plugins: [authCookies.plugin],
    strict: process.env.NODE_ENV !== 'production'
})
