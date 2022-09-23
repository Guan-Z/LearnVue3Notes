<template>
<div>
  <h1 :style="style_starColor">{{star}}</h1>
</div>
</template>

<script setup>
  import {ref, defineProps, computed} from 'vue';
  let props = defineProps({
      value: Number,
      starColor:String
  })
  let star = ref('');
  star = computed(()=> "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value));
  // 疑问：为什么在父组件传值响应的时候就不用 ref() 包着也可以 响应式，这不是也改变了值然后响应式吗？
  // let star = computed(()=> "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value))


  // 修改颜色同理，简单：使用 :style 绑定一个对象，然后这个对象用计算属性
  /*
  这样设计默认样式是不行的，，，
  let style_starColor = ref('');
  style_starColor.value = 'color:orange;';
  */
  let style_starColor = computed(()=>{
    return `color:${props.starColor};`
  })


  // 大圣老师是把默认样式也放在了计算属性中，有个默认值，然后返回
  // 所以大圣老师做的是自定义好颜色key-value，而我是直接传颜色
  // 也许想做默认颜色的话只能那样吧，肯定上面这种简单的尝试不是解决的方法，思路是大圣老师那样的，更复杂
</script>

<style scoped>
</style>