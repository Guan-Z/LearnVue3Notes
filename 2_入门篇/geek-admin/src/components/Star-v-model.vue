<template>
<div :style="style_starColor">
  <div>在slot之前</div>
  <slot></slot>
  <div>在slot之后</div>
  <div class="starBox" @mouseout="mouseOut">
    <span v-for="num of 5" :key="num">☆</span>
    <span class="star" :style="starWidth">
      <span @click="onRate(num, $event.target.value)" @mouseover="mouseover(num)" v-for="num of 5" :key="num">★</span>
    </span>
  </div>
</div>
</template>

<script setup>
  import {ref, defineProps,defineEmits, computed} from 'vue';
  let props = defineProps({
      starColor:String,
      modelValue:Number
  })
  let starNum = ref(props.starNum);
  let starWidth = computed(()=>{
    return `width:${starNum.value * 41}px;`
  });
  function mouseover(num){
    starNum.value = num;
  }
  function mouseOut(){
    starNum.value = props.starNum;
  }
  // let emits = defineEmits('update-star')
  // function onRate(num){
  //   emits('update-star',num);
  // }
  let emits = defineEmits(['update:modelValue'])

  let style_starColor = computed(()=>{
    return `color:${props.starColor};`
  })
</script>

<style scoped>
.starBox{
  position: relative;
  display: inline-block;
  font-size: 50px;
  height: 70px;
  line-height: 70px;
}
.starBox .star{
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>