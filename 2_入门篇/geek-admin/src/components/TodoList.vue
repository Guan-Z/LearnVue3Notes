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