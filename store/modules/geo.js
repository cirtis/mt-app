const state=()=>({
  position:{}
})
//nuxt3中将不再对vuex的经典写法进行支持，如何改造！！！

const mutations={
  setPosition(state,val){
    // state.Postion=val
    //首字母大小写的错误！！！
    state.position=val
  }
}

const actions={
  setPosition:({
    commit
  },position)=>{
    commit('setPosition',position)
  }
}

export default{
  namespaced:true,state,mutations,actions
}


