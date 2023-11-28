<script setup lang="ts">
defineOptions({
  name: 'OperateAttr',
})
const emits = defineEmits(['cancel'])
import { Plus } from '@element-plus/icons-vue'

const handleCancel = () => {
  console.log('怎么不执行')
  emits('cancel')
}
</script>

<template>
  <div>
    <el-form inline>
      <el-form-item label="属性名称">
        <el-input placeholder="请输入属性名称"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" :icon="Plus">添加属性值</el-button>
    <el-button type="primary" @click="handleCancel">取消</el-button>
    <el-table class="operate_table" border>
      <el-table-column
        label="序号"
        width="80px"
        type="index"
        align="center"
      ></el-table-column>
      <el-table-column label="属性值名称"></el-table-column>
      <el-table-column label="属性值操作"></el-table-column>
    </el-table>
    <el-button type="primary">保存</el-button>
    <el-button type="primary" @click="handleCancel">取消</el-button>
  </div>
</template>

<style lang="scss" scoped>
.operate_table {
  margin: 10px 0;
}
</style>
