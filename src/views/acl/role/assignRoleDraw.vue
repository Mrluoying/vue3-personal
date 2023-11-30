<script setup lang="ts">
// import { ElMessageBox } from 'element-plus'
defineOptions({
  name: 'AssignRoleDraw',
})
import type { MenuList } from '@/api/acl/role/type'
// import { ElMessage } from 'element-plus'
interface Props {
  menuArr: MenuList
}
const props = defineProps<Props>()
const emits = defineEmits(['handleModelChange', 'resetParam', 'refreshData'])

const defaultProps = {
  children: 'children',
  label: 'name',
}

const drawer = ref(false)
const title = ref('')
console.log(props)
const showDraw = (drawOption: any) => {
  drawer.value = true
  const { title: drawTitle, data } = drawOption
  title.value = drawTitle
  console.log(data, 'dayinyixia')
}
const handleDrawClosed = () => {}

const cancelClick = () => {
  drawer.value = false
}
const confirmClick = async () => {}

defineExpose({
  showDraw,
})
</script>

<template>
  <el-drawer @closed="handleDrawClosed" v-model="drawer">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <el-tree
        :data="menuArr"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="[5]"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
