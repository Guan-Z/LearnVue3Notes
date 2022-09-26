<template>
<div>
  <div>
    <p @click="add">{{count}}</p>
    <p>计算属性：两倍{{double}}</p>
    <button @click="async_add">异步的数据修改；等一秒</button>
  </div>
</div>
</template>

<script setup>
// 因为要使用计算属性访问Vuex数据，所以导入computed
import { computed } from 'vue'
// 要使用Vuex数据，所以导入
import {useStore} from 'vuex'
// 创建vuex实例
let store = useStore()
// 使用计算属性并且store(实例).state.count的方式访问Vuex数据
let count = computed(()=>store.state.count)
let double = computed(()=>store.getters.double)
// 使用store(实例).commit('fn')调用方法修改数据
function add(){
    store.commit('add')
}
function async_add(){
  store.dispatch('asyncAdd')
}
</script>