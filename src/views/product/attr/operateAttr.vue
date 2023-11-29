<script setup lang="ts">
defineOptions({
  name: 'OperateAttr',
})
const emits = defineEmits(['cancel', 'save'])
import { Plus, Delete } from '@element-plus/icons-vue'
import type { Attr } from '@/api/product/attr/type'
import { ElInput } from 'element-plus'

type InputComponent = InstanceType<typeof ElInput>

interface Props {
  attrParams: Attr
}
const props = defineProps<Props>()

const handleAddAttr = () => {
  props.attrParams.attrValueList.push({
    valueName: '',
    rowFlag: true,
  })
  nextTick(() => {
    inputArr.value[inputArr.value.length - 1].focus()
  })
}
const handleSave = () => {
  emits('save')
}

const handleCancel = () => {
  emits('cancel')
}

const inputArr = ref<InputComponent[]>([])

const handleInputBlur = (row: any) => {
  row.rowFlag = false
}
const handleInput = (row: any, index: number) => {
  console.log('点击触发')
  row.rowFlag = true
  nextTick(() => {
    inputArr.value[index].focus()
  })
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
        <template v-slot="{ row, $index }">
          <el-input
            v-if="row.rowFlag"
            @blur="handleInputBlur(row)"
            v-model="row.valueName"
            :ref="(vc) => (inputArr[$index] = vc as InputComponent)"
          ></el-input>
          <div class="table_cell" @click="handleInput(row, $index)" v-else>
            {{ row.valueName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="属性值操作">
        <template v-slot="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            v-if="!!row.valueName"
            :icon="Delete"
            @click="props.attrParams.attrValueList.splice($index, 1)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="handleSave">保存</el-button>
    <el-button type="primary" @click="handleCancel">取消</el-button>
  </div>
</template>

<style lang="scss" scoped>
.operate_table {
  margin: 10px 0;
}
.table_cell {
  height: 23px;
}
</style>
