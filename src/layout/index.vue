<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
</script>

<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="side_scrollbar">
        <el-menu unique-opened background-color="#001529" text-color="#fff">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar">tabbar</div>
    <div class="layout_main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: pink;
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
    background-color: red;
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
