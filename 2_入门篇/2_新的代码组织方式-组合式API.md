Vue 3 的 Composition API + < script setup> 这种最新的代码组织方式。

<img src="C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220916092620812.png" alt="image-20220916092620812" style="zoom:67%;" />

去年就已经强推组合式API风格了；虽然Vue 3 官网保留了选项式，但是组合式才是后面的前途（选项式在这家公司也使用了挺久了，熟练）

**这节使用 Composition API 和 < script setup> 去重构第二讲的清单应用。**

**Composition API 可以让我们更好地组织代码结构，而让你感到好奇的 < script setup> 本质上是以一种更精简的方式来书写 Composition API 。**



开发清单应用时，是直接在.html文件，浏览器里使用 Options API 的方式写代码；

但在接下来的开发中，我们会直接用单文件组件——也就是 .vue 文件，的开发方式。

这种文件格式允许我们把 Vue 组件的 HTML、CSS 和 JavaScript 写在单个文件内容中。

下面用**单文件组件(SFC)**的方式，去重构第二讲做的清单应用。

<hr>

先写个简单的累加器，学习组合式API的简单使用和解释

从具体效果上看，这段代码实现了一个累加器。在 <script setup> 语法中，我们使用**引入的 ref 函数包裹数字，返回的 count 变量就是响应式的数据**，使用 add 函数实现数字的修改。**需要注意的是，对于 ref 返回的响应式数据，我们需要修改 .value 才能生效**，**而在 <script setup> 标签内定义的变量和函数，都可以在模板中直接使用。**

```
<template>
  <div>
    <h1 @click="add">{{count}}</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";
let count = ref(1)
function add(){
    count.value++
}
</script>

<style>
h1 {
  color: red;
}
</style>
```

然后去APP.vue中使用组件：

![image-20220916095559207](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220916095559207.png)

直接 import TodoList.vue 组件，然后 <script setup> 会**自动把组件注册到当前组件**，这样我们就可以直接在 template 中使用来显示清单的功能。

<hr>

#### Vue 3 组合式API风格的计算属性

之前的TodoList清单组件是使用 选项式API风格 

**选项式API的 computed计算属性 是组件的一个配置项，而组合式的 computed 的用法是单独引入使用。**

![image-20220916114029725](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220916114029725.png)

![image-20220916114127111](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220916114127111.png)

组合式API的计算属性，是使用computed（）包住 函数 / 对象。



整个组件的代码：

```
<template>
  <input type="text" @keydown.enter="addTodo" v-model="title">
  <ul v-if="todoList.length">
    <li v-for="item of todoList" :key="item">
      <input type="checkbox" v-model="item.done">
      <span>{{item.title}}</span>
    </li>
  </ul>
  <p v-else>暂无数据</p>
  <div>
    全选<input type="checkbox" v-model="allDone">
  </div>
  <div>
    <button @click="clear">清除</button>
  </div>
  <div>
    未完成/总数<span>{{active}}/{{all}}</span>
  </div>
</template>

<script setup>
  // computed计算属性，需要先导入再使用
  import {ref,computed} from 'vue';
  let title = ref('');
  let todoList = ref([{
    title:'任务一',
    done:false
  }])
  function addTodo(){
    if(title.value === ''){
      alert('请输入内容再添加');
      return;
    }
    // 再次注意，需要响应的数据 修改 / 使用（上面用来判断），都要使用 .value，不然无效。
    todoList.value.push({
      title:title.value,
      done:false
    })
    title.value = '';
  }
  function clear(){
    todoList.value = todoList.value.filter((v) => !v.done);
  }

  // 组合式API的 计算属性
  // 组合式API的计算属性，是使用computed（）包住函数。
  let active = computed(() =>{
    return todoList.value.filter(v=>!v.done).length
  });
  let all = computed(() =>{
    return todoList.value.length
  });
  let allDone = computed({
    get: function () {
      return active.value === 0
    },
    set: function (val) {
      todoList.value.forEach(todo=>{
        todo.done = val
      });
    }
  })
</script>

<style scoped>
</style>
```



<hr>

#### 功能函数的封装

为了提高项目的可维护性，一些项目中常用的功能函数，可以封装成JS文件，放在项目的 **utils文件夹下 （工具函数文件夹）**

**eg：项目中可能有很多地方需要显示鼠标的坐标位置，引入追踪鼠标位置的需求**

（拓：**mousemove事件**，当鼠标移入到指定元素时触发，如果在这个元素内继续移动鼠标，会重复触发多次此事件。）

想获取鼠标的位置，我们就需要监听 mousemove 事件。**这需要在组件加载完毕后执行**，在 Composition API 中，我们可以直接引入 onMounted 和 onUnmounted 来实现生命周期的功能。

```
src/utils/mouse.js文件：

import {ref, onMounted,onUnmounted} from 'vue'

export function useMouse(){
    const x = ref(0)
    const y = ref(0)
    function update(e) {
      x.value = e.pageX
      y.value = e.pageY
    }
    onMounted(() => {
      window.addEventListener('mousemove', update)
    })
  
    onUnmounted(() => {
      window.removeEventListener('mousemove', update)
    })
    return { x, y }
}
```

**上面的代码，组件加载的时候，会触发 onMounted 生命周期，执行监听 mousemove 事件，从而去更新鼠标位置的 x 和 y 的值；组件卸载的时候，会触发 onUnmounted 生命周期，解除 mousemove 事件。（不造成内存泄露）**

使用：

![image-20220916154654327](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220916154654327.png)



<hr>

#### style样式的特性

在 style 标签上，加上 scoped 这个属性的时候，定义的 CSS 就只会应用到当前组件的元素上，这样就很好地避免了一些样式冲突的问题。（同Vue 2）

```
代码：

<style scoped>
h1 {
  color: red;
}
</style>>
```

```
浏览器解析后：

<h1 data-v-3de47834="">1</h1>
<style scoped>
h1[data-v-3de47834] {
    color: red;
}
</style>

加上了独一无二的自定义属性，所以不会样式冲突
```

加上 scoped 这个属性后也不是只能本 SFC ，还想写全局的样式，那么你可以用:global 来标记，这样能确保可以很灵活地组合样式代码（后面项目中用到，还会结合实战进行讲解）。

#### 重点：

上面是Vue 2 就有的；而Vue 3 中：

**而且甚至可以通过 v-bind 函数，直接在 CSS 中使用 JavaScript 中的变量。**

< style>里能用 v-bind，以后开发可以少用“黑科技”了！！！

动态修改样式更简单了。

![image-20220916160210806](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220916160210806.png)



<hr>

最后，关于 **组合式API风格** 的一些争论：

Composition API 和 < script setup> 虽然能提高开发效率，但是带来的一些新的语法：

* 比如 ref 返回的数据就需要修改 value 属性；
* **响应式和生命周期也需要 import 后才能使用**



好的讨论：

每节课都有很多收获！  

✿ Options API vs Composition API

​        字面上, 选项 API 与 组合 API，细品, 这反映了设计面向的改变：

           1. 选项，谁的选项，关键在“谁”。谁？组件。也是 Vue2.x 的设计基础。组件有什么，有状态，有改变状态的方法，有生命周期，还有组件和组件之间的关系。这种情况下，“数据”要接受一定的“规矩”，“什么时候能做什么事”，“什么时候有什么表现”；这个状态下，开发模式像是“被动接受”。         
           2.  组合，什么组合，关键在“什么”。什么？数据。数据的组合。Vue3.x 设计重点变了，数据变绝对的C位了，现在去组件里串门，不用“守规矩”了，只需要说“我在 onMounted 的时候要这样这样，你看着办”，真只能的以“数据”为中心，没人能管得了了，想去哪就去哪，自然就灵活了至于这些是怎么做到由“被动接受”到“主动告知”的，实现这部分内容，我很期待。   

✿ 模板语法更好用 < script setup> 像是“语法糖”，很甜；< style>里能用 v-bind，以后开发可以少用“黑科技”了，双手点赞。

✿ 至于争论    Vue 本来就属于 DSL，语法方面各有偏好，见仁见智；响应式和生命周期需要 import，个人认为就代表了从之前的“被动主动”转向“主动告知”，这样设计更加灵活。从此一条主线在”数据"，以后查 bug 顺着这条 "线" 应该更加容易了。