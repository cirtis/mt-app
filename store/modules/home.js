const state = () => ({
  menu: [],
  hotPlace: []
})
//nuxt3中将不再对vuex的经典写法进行支持，如何改造！！！

const mutations = {
  setMenu(state, val) {
    state.menu = val
  },
  setHotPlace(state, val) {
    state.hotPlace = val
  }
}

const actions = {
  setMenu: ({
              commit
            }, menu) => {
    commit('setMenu', menu)
  },
  setHotPlace: ({
                  commit
                }, hotPlace) => {
    commit('setHotPlace', hotPlace)
  }
}

export default {
  namespaced: true, state, mutations, actions
}


