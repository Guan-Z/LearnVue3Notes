本节学习Vue 3 中如何实现常见的过渡和动效。

这其实都学过的，过渡即CSS 的属性 transition 来实现过渡，通过 animation 和 keyframe 的组合实现动画（即动效）。

<hr>

决定先留个印象即可，细节跳过，我感觉不太会用得到；真遇到了我也知道是在做 Vue 3 的过渡和动效，那个时候再看看就行。

大概就是<transition >标签：

```
<transition name="fade">
	<h1 v-if="showTitle">你好 Vue 3</h1>
</transition>
```

然后以这个name作为选择器（并且可以有特殊的后缀，eg：元素进入前和离开后）

```
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```



然后还有一个东西：

列表动画<transition-group >标签

不贴代码了；反正知道了Vue 3 这个 知识树 上有这两个标签（即vue自己的官方组件）

之后要使用再看就OK。