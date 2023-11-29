<script setup lang="ts">
// import { ElMessageBox } from 'element-plus'
const drawer = ref(false)
const title = ref('')
const showDraw = (drawOption: any) => {
  drawer.value = true
  const { title: drawTitle, data } = drawOption
  title.value = drawTitle
  console.log(data, 'dayinyixia')
}

function cancelClick() {
  drawer.value = false
}
function confirmClick() {}

defineExpose({
  showDraw,
})
</script>

<template>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input placeholder="请输入用户密码"></el-input>
        </el-form-item>
      </el-form>
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
