<template>
  <div>首页{{user.name}}</div>
</template>
<script setup lang="jsx">
import {reactive} from "vue";
const user = reactive({
  name:"guobin",
  password:111
})
</script>
<style scoped lang="less"></style>
