<script setup>
import {ref, defineProps, computed} from 'vue';
/*   
直接 import TodoList.vue 组件，然后 <script setup> 会**自动把组件注册到当前组件**
这样我们就可以直接在 template 中使用来显示清单的功能。
*/
import TodoList from './components/TodoList.vue'
import accumulator from './components/accumulator.vue'
import StarEasy from './components/Star-easy.vue'
import StarMid from './components/Star-mid.vue'
import StarEvent from './components/Star-event.vue'
import StarVM from './components/Star-v-model.vue'
import {useMouse} from './utils/mouse'

let {x,y} = useMouse();
let score = ref(3.5);
function updateStarNum(num){
  score.value = num;
}
</script>

<template>
  <span>Star-easy:</span><Star-easy></Star-easy>
  <hr/>
  <!-- 写了v-bind，那就是绑定对象了，就会去 script 中找；而这里要使用的是传递这个 "skyblue" 字符串，而不是叫做 skyblue 的对象，所以不要用v-bind -->
  <span>Star-mid:</span><Star-mid :value="score" starColor="skyblue"></Star-mid>
  <hr/>
  <span>Star-event:</span><Star-event starColor="skyblue" :starNum="score" @update-star="updateStarNum"></Star-event>
  <hr/>
  <span>Star-v-vmodel:</span><StarVM starColor="skyblue" v-model="score">插了个槽</StarVM>
  <hr/>
  <p>坐标x:{{x}}，坐标y:{{y}}</p>
  <hr/>
  <accumulator></accumulator>
  <hr/>
  <!-- <todo-list></todo-list> -->
  <!-- 虽然都有效，但和引入的一致更好import TodoList / <TodoList>，开发协作也更好 -->
  <TodoList></TodoList>
  <hr/>
  <div>
    <router-link to="/">首页</router-link> | 
    <router-link to="/about">关于</router-link>
  </div>
  <router-view></router-view>
</template>

<style scoped>
</style>
