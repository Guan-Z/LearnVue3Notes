大圣老师这里讲的是 Vuex4，而Pinia其实就是Vuex5

```
作者回复: 只学成熟的技术就可以了，不需要过于追热点，Pinia和Vuex也是有很多概念和理念是一脉相承的
```

所以没毛病，瞅瞅Vuex是什么东西，怎么玩

<hr>
现代 Web 应用都是由三大件构成，分别是：组件、数据和路由。

组件前面学了，路由在后面的课程中。

这节康康前端的数据怎么管理

Vuex解决的就是这个

<hr>

由来：思考一个这样的场景，就是有一些数据组件之间需要共享的时候，应该如何实现？

一级一级传递是很麻烦的；况且，也许组件间没有嵌套，不是爷父孙也没有共同祖先，那要使用共享数据的话，一级一级传也实现不了。

解决这个问题的最常见的一种思路就是：**专门定义一个全局变量，任何组件需要数据的时候都去这个全局变量中获取。一些通用的数据，比如用户登录信息，以及一个跨层级的组件通信都可以通过这个全局变量很好地实现。**在下面的代码中我们使用 _store 这个全局变量存储数据。

```
window._store = {}
```

<img src="C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220924102743598.png" alt="image-20220924102743598" style="zoom: 50%;" />

如图：任何组件内部都可以通过 window._store 获取数据并且修改。

但这样就会产生一个问题：**window._store 并不是响应式的，如果在 Vue 项目中直接使用，那么修改数据后页面并不会自动更新页面。**

**所以需要用 ref 和 reactive 去把数据包裹成响应式数据，并且提供统一的操作方法，这其实就是数据管理框架 Vuex 的雏形了。**

<hr>

#### Vuex的意义：

Vuex 存在的意义，就是管理项目的数据。

**使用组件化机制来搭建整个项目，每个组件内部有自己的数据和模板。但是总有些数据是需要共享的，比如当前登录的用户名、权限等数据，如果都在组件内部传递，会变得非常混乱。**

如果把开发的项目比作公司的话，我们项目中的各种数据就非常像办公用品。很多小公司在初创时期不需要管理太多，大家随便拿办公用品就行。但是公司大了之后，就需要一个专门的办公用品申报的流程，对数据做统一地申请和发放，这样才能方便做资产管理。Vuex 就相当于我们项目中的大管家，集中式存储管理应用的所有组件的状态。

<hr>

#### 使用：

学新东西，不管三七二十一先拿过来用用；先 vite 创个新的项目。

 **项目结构中的 src/store 目录（在前面'如何搭建Vue3工程化项目'中说过），就是专门留给 Vuex 的，在项目的目录下，执行下面这个命令，进行 Vuex 的安装工作。**

```
npm install vuex@next
```

安装完成后，在 src/store 中先新建 index.js，写入下面的代码：

```
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 666
    }
  },
  mutations: {
    add (state) {
      state.count++
    }
  }
})

export default store;
```

**使用 createStore 来创建一个数据存储**，一般命名为 store。**store 内部除了数据，还需要一个 mutation（突变） 配置去修改数据，你可以把这个 mutation 理解为数据更新的申请单，mutation 内部的函数会把 state 作为参数，我们直接操作 state.count 就可以完成数据的修改。**



现在发现，代码中**除了 Vue 的组件系统之外，多了一个数据源，里面只有一个变量 count，并且有一个方法可以累加这个 count。**然后，在 Vue 中注册这个数据源，**即在项目入口文件 src/main.js 中，使用 app.use(store) 进行注册，这样 Vue 和 Vuex 就连接上了。**

```
main.js:

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
const app = createApp(App)
app.use(store).mount('#app')
```

（解释一下：.use 就是注册；使用 .use(router) 就可以对路由进行注册，使用 .mount 就可以把 Vue 这个应用挂载到页面上）

Vuex实例中定义好了共享数据以及修改共享数据的方法（因为数据共享，在整个项目的任何组件都可以获取和修改，所以修改的方法自然得是Vuex定制，而不是项目中任意组件可以随意修改）

<hr>

#### 使用

现在知道了，Vuex其实就是 为了开发方便，在 Vue 的组件系统之外，多了一个数据源；

上面已经定义好

那在 Vuex 中的数据，**使用起来和组件中的数据使用起来肯定是有区别的**；访问，以及修改的化是需要调用 Vuex 定义好的方法修改数据，不能直接修改

**在组件中使用Vuex数据的话：**

* count 不是使用 ref 直接定义，而是使用**计算属性**返回了 **store.state.count（访问）**，也就是刚才在 src/store/index.js 中定义的 count。

* add 函数是用来修改数据，这里**不能直接去操作 store.state.count +=1，因为这个数据属于 Vuex 统一管理，所以要使用 store.commit(‘add’) 去触发 Vuex 中的 mutation 去修改数据。**

```
<template>
<div @click="add">
    {{count}}
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
// 使用store(实例).commit('fn')调用方法修改数据
function add(){
    store.commit('add')
}
</script>
```

很简单；

**那既然有这两种数据处理的方式，什么时候的数据用 Vuex 管理，什么时候数据要放在组件内部使用 ref 管理呢？**

**对于一个数据，如果只是组件内部使用就是用 ref 管理；如果我们需要跨组件，跨页面共享的时候，我们就需要把数据从 Vue 的组件内部抽离出来，放在 Vuex 中去管理。**

比如项目中的登录用户名，项目中每个页面的右上角需要显示；有些信息弹窗也需要显示。这样的数据就需要放在 Vuex 中统一管理。

下图中，项目初始化的时候没有登录状态；在用户登录成功之后，才能获取用户名这个信息，去修改 Vuex 的数据，再通过 Vuex 派发到所有的组件中。

<img src="C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220926095139034.png" alt="image-20220926095139034" style="zoom:67%;" />

明明白白，知道Vuex是什么用处了。

<hr>

#### 手写迷你Vuex（理解原理；核心源码）

之后再瞅；迷你到也就30行；先看更多的用法和场景，原理源码再说。

<hr>

#### Vuex实战

从上面的例子可以立即看出，Vuex 就是一个公用版本的 ref，提供响应式数据给整个项目使用。

但是上面的例子只是简单的数据修改，**而项目中还会有一些异步任务的触发**，这些场景 Vuex 都有专门的处理方式。



* **Vuex的计算属性：**

Vuex 中，可以使用 **getters 配置，来实现 computed 的功能**

然后在组件中，通过 **store.getters.xxx** 获取

这样就实现了vuex的计算属性自动更新

```
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
  }
})

// vuex最后得暴露出去才能其他地方访问
export default store;
```

```
<template>
<div @click="add">
  <div>
    {{count}}
    <p>计算属性：两倍{{double}}</p>
  </div>
</div>
</template>

<script setup>
import { computed } from 'vue'
import {useStore} from 'vuex'
let store = useStore()
let count = computed(()=>store.state.count)
// Vuex的计算属性
let double = computed(()=>store.getters.double)
function add(){
    store.commit('add')
}
</script>
```



* **Vuex的异步修改数据**

实际项目开发中，有很多数据都是从网络请求中获取到的。**在 Vuex 中，mutation 的设计就是用来实现同步地修改数据。如果数据是异步修改的，需要一个新的配置 action。**

现在模拟一个异步的场景，就是点击按钮之后的 1 秒，再去做数据的修改。

**面对这种异步的修改需求，在 Vuex 中需要新增 action 的配置，在 action 中可以做任意的异步处理。这里使用 setTimeout 来模拟延时，然后在 action 内部调用 mutation 就可以了。**

```
vuex中添加：

  actions:{
      asyncAdd({commit}){
          setTimeout(()=>{
            commit('add')
          },1000)
      }
  }
```

在 createStore 的配置中，新增了 actions 配置，这个配置中所有的函数，可以通过解构获得 commit 函数。内部的异步任务完成后，就随时可以调用 commit 来执行 mutations 去更新数据。

所以，**action 并不是直接修改数据，修改数据还是交给了 mutations **

***Vuex 所有的数据修改都是通过 mutations 来完成的***

在组件中调用 actions 的方式是使用 store.dispatch('xxx')

```
<button @click="async_add">异步的数据修改；等一秒</button>

function async_add(){
  store.dispatch('asyncAdd')
}
```

这样就可以延迟一秒修改。



Vuex 官方的结构图：

![image-20220926113711083](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220926113711083.png)

项目中，有大量的数据交互需求、用户的登录状态、登录的有效期、布局的设置，不同用户还会有不同的菜单权限等。

不过面对眼花缭乱的交互需求，也不必自乱阵脚。总体来说，**在决定一个数据是否用 Vuex 来管理的时候，核心就是要思考清楚，这个数据是否有共享给其他页面或者是其他组件的需要。如果需要，就放置在 Vuex 中管理；如果不需要，就应该放在组件内部使用 ref 或者 reactive 去管理。**

<hr>

Vuex 由于在 API 的设计上，对 TypeScript 的类型推导的支持比较复杂，用起来很是痛苦。因为我们的项目一直用的都是 JavaScript，可能感触并不深，但对于使用 TypeScript 的用户来说，Vuex 的这种问题是很明显的。

为了解决 Vuex 的这个问题，Vuex 的作者最近发布了一个新的作品叫 Pinia，并将其称之为下一代的 Vuex。Pinia 的 API 的设计非常接近 Vuex5 的提案，首先，Pinia 不需要 Vuex 自定义复杂的类型去支持 TypeScript，天生对类型推断就非常友好，并且对 Vue Devtool 的支持也非常好。

Pinia就是Vuex5



Vuex 3.x 是 Vue 2 的 Vuex，而 Vuex 4.x 是 Vue 3 的Vuex

Pinia API 与 Vuex ≤4 非常不同

但是Pinia和Vuex很多概念和理念是一脉相承的

用到的时候再去康康Pinia咋用的，估计也就用法稍有不同，或者加了更多场景。
