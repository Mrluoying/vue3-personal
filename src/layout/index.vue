<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

import TabBar from './tabbar/index.vue'
</script>

<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="side_scrollbar">
        <!-- collapse -->
        <el-menu unique-opened background-color="#001529" text-color="#fff">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar">
      <TabBar></TabBar>
    </div>
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base_menu_width;
    height: 100vh;
    background-color: $base_menu_background;
    .side_scrollbar {
      color: #fff;
      height: calc(100vh - $base_menu_logo_height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base_menu_width);
    height: $base_tabbar_height;
    top: 0;
    left: $base_menu_width;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base_menu_width);
    height: calc(100% - $base_tabbar_height);
    top: $base_tabbar_height;
    left: $base_menu_width;
    padding: 20px;
    // overflow: auto;
  }
}
</style>
