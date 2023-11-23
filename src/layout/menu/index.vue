<script setup lang="ts">
const props = defineProps(['menuList'])
defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Menu',
})
console.log(props.menuList, 'menuList')
// 这个过滤数据的方法不需要递归处理，靠组件递归的时候执行这个过滤方法就行
const comMenuList = computed(() => {
  return props.menuList.filter((item) => !item.meta.hidden)
})
</script>

<template>
  <template v-for="(item, index) in comMenuList" :key="index">
    <!-- 没有子路由 -->
    <el-menu-item
      v-if="!item.children || !item.children.length"
      :index="item.path"
    >
      <template #title>
        <span>图标</span>
        <span>{{ item?.meta?.title }}</span>
      </template>
    </el-menu-item>
    <!--子路由只有一个  -->
    <el-menu-item
      v-if="item.children && item.children.length === 1"
      :index="item.children[0].path"
    >
      <template #title>
        <span>图标</span>
        <span>{{ item.children[0]?.meta?.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <span>{{ item?.meta?.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped></style>
