import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import common from './modules/common'
import routesLink from './modules/routesLink'
import user from './modules/user'
import tagsView from './modules/tagsView'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    app,
    common,
    routesLink,
    user,
    tagsView
  },
  getters
})

export default store