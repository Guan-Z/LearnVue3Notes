#### 响应式概念

响应式是Vue框架的特色之一

#####  首先理解什么是响应式：

JavaScript 里面的变量，是没有响应式这个概念的：

```
let count = 1
let double = count * 2
console.log(double)
count = 2
console.log(double)
```

上面的JS代码中，修改了count 为2，但是double不变。

如果现在我们想让 doube 能够跟着 count 的变化而变化，那么我们就需要在每次 count 的值修改后，重新计算 double：

```
let count = 1
// 计算过程封装成函数
let getDouble = n=>n*2 //箭头函数
let double = getDouble(count)
console.log(double)

count = 2
// 重新计算double，这里我们不能自动执行对double的计算
double = getDouble(count)
console.log(double)
```

那么，上述代码中想要变为响应式代码，就变为了**如何在修改了count之后会自动调用getDouble方法了**



**所以下一步，要考虑的是，如何让 double 的值得到自动计算。如果我们能让 getDouble 函数自动执行，也就是如下图所示，使用 JavaScript 的某种机制，把 count 包裹一层，每当对 count 进行修改时，就去同步更新 double 的值，那么就有一种 double 自动跟着 count 的变化而变化的感觉，这就算是响应式的雏形了。**

![image-20220916171702191](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220916171702191.png)

实际开发中的计算逻辑会比计算 doube 复杂的多，但是都可以封装成一个函数去执行。



所以响应式就是在修改数据的同时可以去调用一个函数

<hr>

#### 响应式原理

**Vue 中用过三种响应式解决方案，分别是 defineProperty、Proxy 和 value setter。**

先浅浅了解Vue 2 的 defineProperty API 响应式原理



**使用 defineProperty 代理了 count 属性。这样就对 obj 对象的 value 属性实现了拦截，读取 count 属性的时候执行 get 函数，修改 count 属性的时候执行 set 函数**

所以在set函数中去执行写好的响应式函数，就实现了Vue 2 的响应式原理

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
    </style>
</head>
<body>
<script>


  let obj = {};
  let count = 1;
  function getDouble(n){
    return n*2;
  }
  let double = getDouble(count);

  Object.defineProperty(obj,'count',{
    get(){
      console.log('获取时调用');
    },
    set(val){
      console.log('修改时调用');
      count = val;
      double = getDouble(count);
    }
  })

  console.log(double);  //2
  // count = 2;  //是对象属性拦截，所以obj.xxx
  obj.count = 2;
  console.log(double);  //4
  
  
</script>
</body>
</html>
```

结果输出：

![image-20220919094947200](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220919094947200.png)



**Vue 2 使用defineProperty API的缺点：**

但 defineProperty API 作为 Vue 2 实现响应式的原理，它的语法中也有一些缺陷。

比如在下面代码中，删除 obj.count 属性，set 函数就不会执行，double 还是之前的数值。这也是为什么在 Vue 2 中，需要 $delete 一个专门的函数去删除数据。

```
delete obj.count
console.log(double) // doube还是4
```



#### Vue 3 的响应式原理

Vue 3 的响应式机制是基于 Proxy 实现的。

就 Proxy 这个名字来说，也能看出来这是代理的意思，Proxy 的重要意义在于它解决了 Vue 2 响应式的缺陷。

看下面的代码，在其中我们通过 new Proxy 代理了 obj 这个对象，**然后通过 get、set 和 deleteProperty 函数代理了对象的读取、修改和删除操作**，从而实现了响应式的功能。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
    </style>
</head>
<body>
<script>
  let obj = {};
  let count = 1;
  function getDouble(n){
    return n*2;
  }
  let double = getDouble(count);
  let proxy = new Proxy(obj,{
      get : function (target,prop) {
          return target[prop]
      },
      set : function (target,prop,value) {
          target[prop] = value;
          if(prop==='count'){
              double = getDouble(value)
          }
      },
      deleteProperty(target,prop){
          delete target[prop]
          if(prop==='count'){
              double = NaN
          }
      }
  })
  // 数据未变化，还没拦截
  console.log(obj.count,double);  //undefined 2
  // 数据改变
  proxy.count = 2
  console.log(obj.count,double);  //2 4
  delete proxy.count
  // 删除属性后
  console.log(obj.count,double);  //undefined NaN
</script>
</body>
</html>
```

Proxy 实现的功能和 Vue 2 的 definePropery 类似，**它们都能够在用户修改数据的时候触发 set 函数，从而实现自动更新 double 的功能。**

**而且 Proxy 还完善了几个 definePropery 的缺陷，比如说可以监听到属性的删除。**

**Proxy 是针对对象来监听，而不是针对某个具体属性，所以不仅可以代理那些定义时不存在的属性，还可以代理更丰富的数据结构，比如 Map、Set 等，并且也能通过 deleteProperty 实现对删除操作的代理。**



Vue 3 的 reactive 函数可以把一个对象变成响应式数据，而 reactive 就是基于 Proxy 实现的。



Vue 3 中还有另一个响应式实现的逻辑，就是利用对象的 get 和 set 函数来进行监听，这种响应式的实现方式，只能拦截某一个属性的修改，这也是 Vue 3 中 ref 这个 API 的实现。

```
let getDouble = n => n * 2
let _value = 1
double = getDouble(_value)

let count = {
  get value() {
    return _value
  },
  set value(val) {
    _value = val
    double = getDouble(_value)

  }
}
console.log(count.value,double)
count.value = 2
console.log(count.value,double)
```

![image-20220919102954614](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220919102954614.png)

文档：[响应式基础 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html)

![image-20220919103054036](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220919103054036.png)

这都是组合式API风格 响应式需要这么做，Vue 3 本来就可以使用 选项式API 和组合式API；选项式API 的风格和Vue 2 是一样的，在组件的data中return的数据就响应式数据了

**这么看起来似乎需要响应的数据都需要 reactive() 或者 ref() 包起来才是响应式，相比选项式API，Composition组合式 API不是更麻烦吗？所以后面有了VueUse（组合式API + VueUse = 真香），VueUse 的官方的介绍说这是一个 Composition API  的工具集合，适用于 Vue 2.x 或者 Vue 3.x，用起来和 React Hooks  还挺像的。**

具体是什么，往下看就知道了

<hr>

在前面第二讲做清单应用的时候，留过一个思考题，就是解决所有的操作状态在刷新后就都没了这个问题。

使用缓存即可，localStorage

解决这个问题所需要的，就是让 todolist 和本地存储能够同步。

**watchEffect 这个函数让我们在数据变化之后可以执行指定的函数。**

使用 watchEffect，数据变化之后会把数据同步到 localStorage 之上，这样我们就实现了 todolist 和本地存储的同步。

在之前的代码中加上

```
watchEffect(()=>{
    localStorage.setItem('todoList',JSON.stringify(todos.value))
})
```

就实现了

**当然，这是组合式API，那节写的是选项式，所以不能用这个代码**



更进一步

因为组合式API代码风格需要响应的数据需要ref包着，以及这里的watchEffect 中操作

ref 从本地存储中获取数据，封装成响应式并且返回，watchEffect 中做本地存储的同步；这都可以单独分出来

useStorage 这个函数可以抽离成一个文件，放在工具函数文件夹中。

```
function useStorage(name, value=[]){
    let data = ref(JSON.parse(localStorage.getItem(name)|| value))
    watchEffect(()=>{
        localStorage.setItem(name,JSON.stringify(data.value))
    })
    return data
}
```

在项目中使用下面代码的写法，把 ref 变成 useStorage，这也是 Composition API 最大的优点，也就是可以任意拆分出独立的功能。（感觉组合式太自由了，这样的话独自开发是爽，啥都可以分出个模块；但是维护起来就真的更好维护了吗？也许修改一个文件的需求，得打开好几个工具函数文件夹中的文件，看个眼花缭乱才知道之前的逻辑。选项式API代码风格虽然都放在一个.vue文件中，可能导致一个.vue文件很容易就几百行甚至上千行；但是Ctrl + f 要看懂逻辑还是不复杂的；当然这是目前的想法和看法，2022/9/19）

```
let todos = useStorage('todos',[])

function addTodo() {
  ...code
}
```

已经学会了在 Vue 内部进阶地使用响应式机制，去封装独立的函数。

社区也有非常优秀的 Vueuse 工具库，包含了大量类似 useStorage 的工具函数库。在后续的实战应用中，也会经常对通用功能进行封装。

如下图所示，我们可以把日常开发中用到的数据，无论是浏览器的本地存储，还是网络数据，都封装成响应式数据，统一使用响应式数据开发的模式。这样，我们开发项目的时候，只需要修改对应的数据就可以了。

![image-20220919141125987](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220919141125987.png)



#### Vueuse 工具包

自己封装的 useStorage，算是把 localStorage 简单地变成了响应式对象，实现数据的更新和 localStorage 的同步。同理，我们还可以封装更多的类似 useStorage 函数的其他 use 类型的函数，把实际开发中你用到的任何数据或者浏览器属性，都封装成响应式数据，这样就可以极大地提高我们的开发效率。

Vue 社区中其实已经有一个类似的工具集合，也就是 VueUse，它把开发中常见的属性都封装成为响应式函数。

VueUse 趁着这一波 Vue 3 的更新，跟上了响应式 API 的潮流。**VueUse 的官方的介绍说这是一个 Composition API 的工具集合，适用于 Vue 2.x 或者 Vue 3.x，用起来和 React Hooks 还挺像的。**

##### 使用：

在项目目录下打开命令行里，输入如下命令，来进行 VueUse 插件的安装：

```
npm install @vueuse/core
```

然后，就先来使用一下 VueUse。在下面这段代码中，使用了 useFullscreen 来返回全屏的状态和切换全屏的函数。这样，就不需要考虑浏览器全屏的 API，而是直接使用 VueUse 响应式数据和函数就可以很轻松地在项目中实现全屏功能。

```
<template>
  <h1 @click="toggle">click</h1>
</template>
<script setup>
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>
```

useFullscreen 的封装逻辑和 useStorage 类似，都是屏蔽了浏览器的操作，把所有我们需要用到的状态和数据都用响应式的方式统一管理，VueUse 中包含了很多我们常用的工具函数，我们可以把网络状态、异步请求的数据、动画和事件等功能，都看成是响应式的数据去管理。





VueUse 这个工具包，这也是 Vue 官方团队成员的作品。

VueUse 提供了一大批工具函数，包括全屏、网络请求、动画等，都可以使用响应式风格的接口去使用，并且同时兼容 Vue 2 和 Vue 3，开箱即用。

这门课程剩下的项目中会用到很多 VueUse 的函数，也推荐去 GitHub 关注 VueUse 的动态和功能。



<hr>

好的讨论：

1. 为什么需要响应式？

   随着页面应用的不断复杂，需要关注和管理的状态越来越多，之前靠被动的，分散的管理状态不现实也易出错。为了满足这个需求，出现了许多方案，其中 Vue 提出的或主打的解决方案的就是响应式。       

2. 怎么实现响应式？

   响应式主要解决的问题是怎么让在“语言层面上分散的独立数据”在“业务层面”上产生“联系或互为因果”的关系。这咋么办呢？怎么产生“联系”呢？简单，“你发生变化的时候告诉我一声，我应声而动”，所谓响应式我个人理解就是“你响我应”。但是这种需求在语言上不是“普遍需求”，属于“特殊需求”，怎么解决？这里就引入了“代理模式”这种设计模式。在语言层面我给你一种模式可以满足你的需求，ES5 的时代，是defineProperty 等，ES6 就是 Proxy。至于 ES6 的 Proxy 在性能或是各方面要优于 defineProperty 还是因为 Proxy 在更底层优化或重新实现，使用的表现“一样”，但“地基”不一样，性能各方面自然是不一样。正因为是“地基”的不同，Proxy 就还存在兼容性的问题, 加上业务场景的不同，defineProperty 还是有应用的场景，至于文中说的 Vue 3 的 ref 是用 “gettersetter” 实现的，我的认识是，一个是“初始化”时的行为，一个是“改变行为”。       

3. useXXX 为什么会这么灵活？

   像之前的 Composition API 我理解的是 Vue 的组织单位由 “组件” 变成 “数据” 了，现在组件在引入 useXXX，关注点在 XXX，至于 XXX 跟什么有联系，那是你的事情，在你自己的 useXXX 里去实现。本节提到的 React Hooks 也有异曲同工的意思，Hooks 直接翻译成什么？“钩子”，用来做什么？“钩东西”，钩什么？那先说下这个东西出来之前有什么。React Hooks 出来之前 React 主要构建 App 还是用 Class Component，当然也有functional component，这俩区别就在于 class 有状态，functional 比较“纯粹”没有状态。这样复用成问题，得用什么高阶组件之类的方式。然后，在某一时刻，同样的问题出现了，React 复用组件的也是以带状态的 Class 组件为主，“复杂”了，不纯粹。应用越大，这种模式开发或维护越复杂。然后 Hooks 出现了，现在 React 都用“functional” 组件，但是有“状态”的，状态哪里来的 “Hook” 过来的，钩过来的。组件“不负责”维护状态，useXXX 去管理了。

综上，灵活了，也好维护了



composition API  就是把逻辑代码聚合起来.  一些工具函数都可以被封装起来 比如 websocket   解析 url parameter   滚动监听  鼠标状态监听  浏览器 reset  元素 拖动  表单验证   图片懒加载   配合css var 实现运行时主题更新  本地化持久化存储  performance 性能检测 甚至实现自定义 logger。手机端 touch  设备类型检测   陀螺仪 手势识别. 电池电量  太多太多
