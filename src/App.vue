<script setup lang="ts">
// import request from './utils/request'
import { reqLogin } from './api/user'
import { onMounted } from 'vue'

onMounted(() => {
  // request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username: 'admin',
  //     password: '111111',
  //   },
  // }).then((res) => {
  //   console.log(res)
  // })
  reqLogin({
    username: 'admin',
    password: '111111',
  }).then((res) => {
    console.log(res)
  })
})
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
.test-scss {
  color: $color;
}
</style>
