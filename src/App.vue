<script setup lang="ts"></script>

<template>
  <!-- <div>我是一个APP页面</div>
  <span>测试git提交规范</span> -->
  <!-- svg：图标外层容器节点，内部需要与use标签结合使用 -->
  <!-- xlink:href执行用哪个图标,属性值务必#icon-图标文字 -->
  <div>
    <svg>
      <use xlink:href="#icon-search" fill="red"></use>
    </svg>
    <svg-icon name="user"></svg-icon>
  </div>
</template>

<style lang="scss" scoped></style>
