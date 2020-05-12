import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store=()=>new Vuex.Store({
  modules:{
    geo,
    home
  },
  actions:{
    async nuxtServerInit({//nuxt的生命周期
      commit
    },{req,app}){
      const {status:status1,data:{province,city}}=await app.$axios.get('/geo/getPosition')
      //console.log(province,city)
      commit('geo/setPosition',status1===200?{city,province}:{city:'',province:''})
      //   不是/geo/setPosition

      const {status:status2,data:{menu}}=await app.$axios.get('geo/menu')
      commit('home/setMenu',status2===200?menu:[])
      //SSR
      const {status:status3,data:{result}}=await app.$axios.get('/search/hotPlace',{
        params:{//如果采取本地数据库查询的话，怎么做呢
          city:app.store.state.geo.position.city.replace('市','')
        }
      })
      commit('home/setHotPlace',status3===200?result:[])
      // console.log(result)
    }
  }
})

export default store

