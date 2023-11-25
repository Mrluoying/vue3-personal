<script setup lang="ts">
import {
  Refresh,
  FullScreen,
  Setting,
  ArrowDown,
} from '@element-plus/icons-vue'
import useLayoutSettingStore from '../../store/modules/setting'
let layoutSettingStore = useLayoutSettingStore()

const handleRefresh = () => {
  layoutSettingStore.changeRefreshState()
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
    <el-button circle size="small" :icon="FullScreen"></el-button>
    <el-button circle size="small" :icon="Setting"></el-button>
    <img class="logo_img" src="@/assets/logo.png" />
    <el-dropdown>
      <span class="el-dropdown-link">
        admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
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
