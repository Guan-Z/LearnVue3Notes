<template>
<!-- 在 <script setup> 标签内定义的变量和函数，都可以在模板中直接使用 -->
  <h1 @click="add">{{count}}</h1>
</template>
<script setup>
// 引入的 ref 函数包裹数字，返回的 count 变量就是响应式的数据
  import {ref} from 'vue';
  let count = ref(1);
  let textColor = ref('');//初始颜色
  function add(){
    // 对于 ref 返回的响应式数据，需要修改 .value 才能生效
    count.value++;
    textColor.value = Math.random()>0.5? "blue":"red";
  }
</script>
<style scoped>
  h1{
    /* color: red; */
    color: v-bind(textColor);
  }
</style>