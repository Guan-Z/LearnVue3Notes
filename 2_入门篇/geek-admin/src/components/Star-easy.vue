<template>
<div>
  <h1>{{star}}</h1>
  <button @click="addStar">加一星</button>
  <button @click="subtractStar">减一星</button>
</div>
</template>
<script setup>
  import {ref} from 'vue';
  let rate = ref(0);
  let star = ref('');
  star.value = "☆☆☆☆☆";
  function addStar(){
    if(rate.value === 5){
      alert('已五星');
      return;
    }
    rate.value++;
    star.value = "★★★★★☆☆☆☆☆".slice(5 - rate.value, 10 - rate.value);  //处处.value才有效还真是不习惯...
    // console.log(star)
    // console.log(star.value)
  }
  function subtractStar(){
    if(rate.value === 0){
      alert('不可再减');
      return;
    }
    rate.value--;
    star.value = "★★★★★☆☆☆☆☆".slice(5 - rate.value, 10 - rate.value);
  }
</script>
<style scoped>
</style>