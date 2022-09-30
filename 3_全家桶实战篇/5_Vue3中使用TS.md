上一讲介绍了 Vue 中的 JSX，以及 template 和 JSX 各自的优缺点。

提到的 template 牺牲灵活性换来了静态标记的收益，能看到：**有些时候，需要放弃一些灵活性去换取项目的整体收益。**

**那么在这一讲中，介绍一个可以在语言层面上，提高代码可维护性和调试效率的强类型语言——TypeScript。**

<hr>

TypeScript 是微软开发的 JavaScript 的超集

**所谓超集，意思就是 TypeScript 在语法上完全包含 JavaScript。**

**TypeScript 的主要作用是给 JavaScript 赋予强类型的语言环境。**现在大部分的开源项目都是用 TypeScript 构建的，包括Vue 3。

TypeScript 和 JavaScript 的关系如下图；TypeScript 相当于在 JavaScript 外面包裹了一层**类型系统**，这样可以帮助我们开发更健壮的前端应用。

<img src="C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220930143429296.png" alt="image-20220930143429296" style="zoom:67%;" />

### TypeScript新语法

#### 1、TypeScript 可以在 JavaScript 的变量之上限定数据类型。

```
let courseName:string = '玩转Vue3全家桶'
let price:number = 129
let isOnline:boolean = true
```

TypeScript 和 JavaScript 的区别在于：TypeScript 的变量后面有一个冒号用来设置好变量的数据类型；例如上面代码courseName 变量的值只能是字符串，price 只能是数字。

若修改为不同类型则报错：

```ba
price = 'hello world'  //报错
```

![image-20220930144134592](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220930144134592.png)

#### 2、接口

可以使用 **interface** 去定义一个复杂的类型接口

（多个组件需要使用的话，也可以都写在一个TS文件中，然后导入使用。公司项目就是这样写的）

```
interface 极客时间课程 {
    课程名字:string,
    价格:number[],
    受众:string,
    讲师头像?:string|boolean,
    获取口令():string
}

let vueCourse: 极客时间课程 = {
    课程名字:'玩转Vue 3全家桶',
    价格:[59,129],
    受众: '前端小老弟',
    讲师头像:false,
    获取口令(){
        return 88
    }
}
```

**这就是 TypeScript 带来的好处，项目中的每个变量、每个接口都在定义的时候定义好类型，很多错误在开发阶段就可以提前被 TypeScript 识别。**

不然如果由着JavaScript动态的话，那一个dataList本意是数组，但一不小心什么类型都可以，也不会提示。

只要是不符合接口规定的类型的变量，就会直接在变量下方给出红色波浪线的报错提示。鼠标移到报错的变量那里，就会有提示信息弹出，直接通知你哪里出问题了。这也是为什么现在大部分前端开源项目都使用 TypeScript 构建的原因，因为每个函数的参数、返回值的类型和属性都清晰可见，这就可以极大地提高我们代码的可维护性和开发效率。



还可以写在TS文件中然后导入：

![image-20220930145958771](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20220930145958771.png)

#### 3、泛型

**泛型就是指有些函数的参数，在定义的时候是不确定的类型，而返回值类型需要根据参数来确定。**

在下面的代码中，想规定 test 函数的返回类型和参数传递类型保持一致，这个时候就没有办法用 number 或者 string 预先定义好参数 args 的类型，为了解决这一问题，泛型机制就派上了用场。

```
function test<某种类型>(args:某种类型):某种类型{
    return args
}
```

学TS的时候再特别搞；现在会在Vue 3 中使用TS就ok了，分清主次，现在目标是学习Vue 3 不是深入TS（也不见得要深入...）

<hr>

### Vue 3 中的 TypeScript

**Vue 2 中全部属性都挂载在 this 之上，而 this 可以说是一个黑盒子，开发者完全没办法预先知道 this 上会有什么数据，这也是为什么 Vue 2 对 TypeScript 的支持一直不太好的原因。**

Vue 3 的 Composition API 之后（选项式还是使用this的），没有了 this 这个黑盒，对 TypeScript 的支持也比 Vue2 要好很多。

Vue 3 中使用TS：首先需要在 script 标签上加一个配置 lang=“ts”，来标记当前组件使用了 TypeScript，然后代码内部使用 defineComponent 定义组件即可。























































