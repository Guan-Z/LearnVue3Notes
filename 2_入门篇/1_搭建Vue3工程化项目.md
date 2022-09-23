在实际的项目中，会使用专门的调试工具。在项目上线之前，代码也需要打包压缩，并且考虑到研发效率和代码可维护性，所以需要建立一个工程化的项目来实现这些功能。

对于 Vue 2，官方推荐用 Vue-cli 创建项目；而对于 Vue 3，建议你使用 Vite 创建项目，因为 vite 能够提供更好更快的调试体验。

**使用 Vite 之前，我们要先安装 Node.js 。**

命令行窗口执行 node -v 指令检查是否安装了node

**推荐使用 VS Code 的官方扩展插件 Volar**



创建一个Vite的初始化项目

（仅仅一年不到，安装命令也变了；看大圣老师的课程命令失败，去官网看原来命令换了；根据课程步骤报错，首先先看官网；以后能自己学习了那就直接看官网学习）

[开始 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

![image-20220915163443810](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915163443810.png)

![image-20220915163456156](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915163456156.png)

对了，上面的是打开的shell终端，不是在VsCode中（项目都还没建）

![image-20220915163846193](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915163846193.png)



看一下 geek-admin 下面的文件目录，这个目录就是我们项目启动的骨架了。

* 目录中的 index.html 是项目的入口；
* package.json 是管理项目依赖和配置的文件；
* public 目录放置静态资源，比如 logo 等图片；
* vite.config.js 就是和 Vite 相关所有工程化的配置；
* src 就是工作的重点，我们大部分的代码都会在 src 目录下管理和书写，后面我们也会在 src 目录下细化项目规范。

```
.
├── README.md
├── index.html           入口文件
├── package.json
├── public               资源文件
│   └── favicon.ico
├── src                  源码
│   ├── App.vue          单文件组件
│   ├── assets
│   │   └── logo.png
│   ├── components   
│   │   └── HelloWorld.vue
│   └── main.js          入口
└── vite.config.js vite工程化配置文件
```



项目建好了，现在可以用VsCode打开

把shell中新建项目后提示的命令写在vscode中的shell（其实是一样的）

![image-20220915164315947](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915164315947.png)

![image-20220915164624546](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915164624546.png)

Vite确实很快！！！

![image-20220915164749550](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915164749550.png)

![image-20220915165129283](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915165129283.png)

浏览器不需要我们去刷新，首页大标题就自动更新了，这种**热更新**的开发体验会伴随我们整个项目开发，极大提高我们的开发效率。



<hr>

现在，项目就拥有了工程化的雏形。项目的架构是下图所示：

![image-20220915175128336](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915175128336.png)

下往上看这个架构：

* 我们所有工程化体系都是基于 Node.js 生态；
* 我们使用 VS Code+Volar 编辑器 + 语法提示工具（插件）作为上层开发工具；
* 使用 Vite 作为工程化工具；
* 使用 Chrome 进行调试。

这些都是 Vue 3 工程化体系的必备工具。



现在项目使用TS的很多，后续会学，现在暂时使用JS

<hr>

开发的项目是多页面的，所以 vue-router 和 Vuex 也成为了必选项，就像一个团队需要人员配比，Vue 负责核心，Vuex 负责管理数据，vue-router 负责管理路由。

在 geek-admin（项目） 目录中使用下面这段代码安装 Vuex 和 vue-router。:

```
npm install vue-router@next vuex@next
```

![image-20220915180044080](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915180044080.png)

<hr>

### 一个Vue 3 项目的命名规范

在新项目中新建文件夹，命名规范如下：

![image-20220915180552602](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915180552602.png)

**下面是 src 目录的组织结构：**

```
├── src
│   ├── api            数据请求
│   ├── assets         静态资源
│   ├── components     组件
│   ├── pages          页面
│   ├── router         路由配置
│   ├── store          vuex数据
│   └── utils          工具函数
```

新建好文件/文件夹后

页面需要引入路由系统；进入到 router 文件夹中，新建 index.js，写入下面的代码：

```
import {
    createRouter,
    createWebHashHistory,
  } from 'vue-router'
  import Home from '../pages/home.vue'
  import About from '../pages/about.vue'
  
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router
```

代码解释：

上面的代码中，

首先引入了 createRouter 和 createWebHashHistory 两个函数。

createRouter 用来新建路由实例，createWebHashHistory 用来配置我们内部使用 hash 模式的路由，也就是 url 上会通过 # 来区分。

再引入两个组件 about 和 home，根据不同的访问地址/ 和/home 去渲染不同的组件，最后返回 router 即可。

```
当然，现在会报错，因为还没有about和home组件
```

去 pages 下面新建两个文件：

```
about.vue 文件代码：

<template>
    <h1>这是关于页面</h1>
</template>
```

```
home.vue 文件代码：

<template>
    <h1>这是首页</h1>
</template>
```

**然后在 main.js 中，加载 router 的配置：**

```

import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
createApp(App)
    .use(router)
    .mount('#app')

```

**然后去 App.vue 中，删掉 template 之前自带的代码，加入如下内容：**

```

<template>
  <div>
    <router-link to="/">首页</router-link> | 
    <router-link to="/about">关于</router-link>
  </div>
  <router-view></router-view>
</template>
```

代码中的 router-link 和 router-view 就是由 vue-router 注册的全局组件，router-link 负责跳转不同的页面，相当于 Vue 世界中的超链接 a 标签；**router-view 负责渲染路由匹配的组件，我们可以通过把 router-view 放在不同的地方，实现复杂项目的页面布局。**



至此，一个多页面的 Vue 开发项目雏形就完成了，现在的页面架构变成了下面图示的这样：

![image-20220915181844176](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915181844176.png)



<hr>

当然这样还不够，

我们在实际项目开发中还会有各种工具的集成，比如写 CSS 代码时，我们需要预处理工具 stylus 或者 sass；

组件库开发中，我们需要 Element3 作为组件库；

网络请求后端数据的时候，我们需要 Axios。

对于团队维护的项目，工具集成完毕后，还要有严格的代码规范。我们需要 Eslint 和 Prettier 来规范代码的格式，Eslint 和 Prettier 可以规范项目中 JavaScript 代码的可读性和一致性。

代码的管理还需要使用 Git，我们默认使用 GitHub 来托管我们的代码。

此外，我们还会使用 commitizen 来规范 Git 的日志信息。对于我们项目的基础组件，我们还会提供单元测试来确保代码质量和可维护性，最后我们还会配置 GitHub Action 来实现自动化的部署。

最后这个项目的架构大概是下面这样，这就是一个足以应对复杂项目开发的架构了：

![image-20220915181959257](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220915181959257.png)

当然没必要一下子在这里全配置，后面用到哪一块就会把哪一块加上，也就是用一个循序渐进的方式学习。比如下一讲完成一个独立功能的时候，才会把 Git 规范加上。