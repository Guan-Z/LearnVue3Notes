<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import learnVuex from './components/learnVuex.vue'
import { onMounted } from 'vue'
function fn(){
  console.log(1);
  console.log(2);
  // debugger关键字，中断代码执行
  // debugger;
  console.log(3);
}
// 组合式的生命周期函数挺怪的，，，
onMounted(()=>{
    fn();
  }
)
</script>

<template>
  <div>
    <learnVuex></learnVuex>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
