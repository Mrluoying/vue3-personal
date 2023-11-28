<script setup lang="ts">
defineOptions({
  name: 'OperateAttr',
})
const emits = defineEmits(['cancel', 'save'])
import { Plus } from '@element-plus/icons-vue'
import type { Attr } from '@/api/product/attr/type'

interface Props {
  attrParams: Attr
}
const props = defineProps<Props>()

const handleAddAttr = () => {
  props.attrParams.attrValueList.push({
    valueName: '',
  })
}
const handleSave = () => {
  emits('save')
}

const handleCancel = () => {
  emits('cancel')
}
</script>

<template>
  <div>
    <el-form inline>
      <el-form-item label="属性名称">
        <el-input
          v-model="props.attrParams.attrName"
          placeholder="请输入属性名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      :disabled="!props.attrParams.attrName"
      @click="handleAddAttr"
      :icon="Plus"
    >
      添加属性值
    </el-button>
    <el-button type="primary" @click="handleCancel">取消</el-button>
    <el-table
      :data="props.attrParams.attrValueList"
      class="operate_table"
      border
    >
      <el-table-column
        label="序号"
        width="80px"
        type="index"
        align="center"
      ></el-table-column>
      <el-table-column label="属性值名称">
        <template v-slot="{ row }">
          <el-input v-model="row.valueName"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="属性值操作"></el-table-column>
    </el-table>
    <el-button type="primary" @click="handleSave">保存</el-button>
    <el-button type="primary" @click="handleCancel">取消</el-button>
  </div>
</template>

<style lang="scss" scoped>
.operate_table {
  margin: 10px 0;
}
</style>
