<script setup lang="ts"></script>

<template>
  <div class="layout_container">
    <div class="layout_slider">slider</div>
    <div class="layout_tabbar">tabbar</div>
    <div class="layout_main">main</div>
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
