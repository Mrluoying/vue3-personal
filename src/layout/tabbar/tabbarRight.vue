<script setup lang="ts">
import {
  Refresh,
  FullScreen,
  Setting,
  ArrowDown,
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import useLayoutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayoutSettingStore()

const handleRefresh = () => {
  layoutSettingStore.changeRefreshState()
}

import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

const handleFullScreen = () => {
  // 这个切换全屏功能也可以使用插件
  // DOM对象的一个属性，可以用来判断当前是不是全屏模式（全屏为true）
  // 这个判断方式不同浏览器有兼容问题
  let full = document.fullscreenElement
  if (!full) {
    // 文档根节点的方法requestFullscreen，实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const handleLogout = () => {
  userStore.userLogout()
  console.log(route, 'route')
  router.push({
    path: '/login',
    query: {
      redirect: route.path,
      ...route.query,
    },
  })
}
</script>

<template>
  <div class="tabbar_right">
    <el-button
      circle
      size="small"
      :icon="Refresh"
      @click="handleRefresh"
    ></el-button>
    <el-button
      circle
      size="small"
      :icon="FullScreen"
      @click="handleFullScreen"
    ></el-button>
    <el-button circle size="small" :icon="Setting"></el-button>
    <img class="logo_img" src="@/assets/logo.png" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.tabbar_right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo_img {
    width: 18px;
    height: 18px;
    border-radius: 100%;
    margin: 0 10px;
    cursor: pointer;
  }
}
</style>
