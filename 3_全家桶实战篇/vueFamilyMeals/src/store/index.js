import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 666
    }
  },
  // getters中配置Vuex的计算属性
  getters:{
    double(state){
      return state.count*2;
    }
  },
  // mutations是修改数据的方法
  mutations: {
    add (state) {
      state.count++
    }
  },
  // 异步
  actions:{
    asyncAdd({commit}){
        setTimeout(()=>{
          commit('add')
        },1000)
    }
  }
})

// vuex最后得暴露出去才能其他地方访问
export default store;