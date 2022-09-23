<template>
<!-- 原理：空星☆先写在下，然后实星★子绝夫相定位，盖在☆上面；因为这是字符，所以宽度是em
然后只要控制实星span★★★★★的宽度就可以了(初始width为0，全是空星☆；超出部分overflow: hidden;)，这个宽度减少了下面的空心自然就显示出来了 -->
<div :style="style_starColor">
  <div class="starBox" @mouseout="mouseOut">
    <span v-for="num of 5" :key="num">☆</span>
    <!-- 动态控制实星 span★★★★★ 的宽度就可 -->
    <span class="star" :style="starWidth">
      <span @click="onRate(num)" @mouseover="mouseover(num)" v-for="num of 5" :key="num">★</span>
    </span>
  </div>
</div>
</template>

<script setup>
  import {ref, defineProps,defineEmits, computed} from 'vue';
  let props = defineProps({
      starColor:String,
      starNum:Number
  })
  // 计算属性，宽度：
  let starNum = ref(props.starNum);
  let starWidth = computed(()=>{
    return `width:${starNum.value * 41}px;`  //这里的☆和★并没有一个em宽！所以我这里搞一下style="width:1em;"（大圣老师是直接用em）
  });

  /* ------------------------------------------------------------------------------------- */

  // 然后鼠标移入时根据鼠标动态实时修改宽度；鼠标移出时就改变宽度
  /*
  重点：鼠标移出后定格宽度，然后 利用事件实现子组件把数据传递给父组件
  */
  function mouseover(num){
    starNum.value = num;
  }
  // 没有点击的话，得恢复之前的星数量
  function mouseOut(){
    starNum.value = props.starNum;
  }
  // 需要做的，就是在点击五角星选择评分的时候，把当前评分传递给父组件即可。
  // 在 Vue 3 中，我们使用 defineEmit 来定义对外“发射”的数据，在点击评分的时候触发即可。
  // 下面的 defineEmit 代码就展示了点击评分后，向父元素“发射”评分数据 num。

  // 步骤：引入defineEmits，然后定义对外“发射”的数据并起名字；事件中修改后即可发射，然后父组件中
  // 就像自定义事件 @update-star="update" 然后在事件里接收
  let emits = defineEmits('update-star')
  function onRate(num){
    emits('update-star',num);
  }

  /* ------------------------------------------------------------------------------------- */

  let style_starColor = computed(()=>{
    return `color:${props.starColor};`
  })
</script>

<style scoped>
/* 子绝父相定位再现江湖 */
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