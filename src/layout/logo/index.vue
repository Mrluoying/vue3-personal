<script setup lang="ts">
import setting from '@/setting'
</script>

<template>
  <div class="logo_container">
    <img :src="setting.logo" />
    <span>{{ setting.title }}</span>
  </div>
</template>

<style lang="scss" scoped>
.logo_container {
  color: #fff;
  width: 100%;
  height: $base_menu_logo_height;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  span {
    margin-left: 10px;
    font-size: 18px;
  }
}
</style>
