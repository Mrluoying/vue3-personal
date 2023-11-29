<script setup lang="ts">
defineOptions({
  name: 'Attr',
})
import { reqAttr, addOrUpdateAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
import { Plus, Delete, Edit } from '@element-plus/icons-vue'
import OperateAttr from './operateAttr.vue'
const c1id = ref<number | undefined>()
const c2id = ref<number | undefined>()
const c3id = ref<number | undefined>()

const attrData = ref<Attr[]>([])

watch(
  () => c3id.value,
  () => {
    console.log(c1id.value, '父组件c1')
    console.log(c2id.value, '父组件c2')
    console.log(c3id.value, '父组件c3')
    attrData.value = []
    if (c1id.value && c2id.value && c3id.value) {
      getAttr()
    }
  },
)

const getAttr = async () => {
  const res: AttrResponseData = await reqAttr(
    c1id.value as number,
    c2id.value as number,
    c3id.value as number,
  )
  console.log(res, '属性数据')
  if (res.code === 200) {
    attrData.value = res.data
  }
}

const handleEdit = (rowData: Attr) => {
  console.log(rowData)
}
const handleDelete = (rowData: Attr) => {
  console.log(rowData)
}

const tableFlag = ref<boolean>(true)

const handelCancel = () => {
  console.log('有没有触发')
  tableFlag.value = true
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
  })
}
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

const handleSave = async () => {
  attrParams.categoryId = c3id.value as number
  const res = await addOrUpdateAttr(attrParams)
  console.log(res)
  if (res.code === 200) {
    tableFlag.value = true
    getAttr()
    Object.assign(attrParams, {
      attrName: '',
      attrValueList: [],
      categoryId: '',
      categoryLevel: 3,
    })
  }
}
</script>

<!-- 需要添加一个div包裹一下，要不然首页中使用了过渡动画，会有如下警告 -->
<!-- 
  <Transition> renders non-element root node that cannot be animated. 这句话的意思是：
  <Transition>中的组件渲染无法设置动画的非元素根节点
-->
<template>
  <div>
    <CateGory
      v-model:c1id="c1id"
      v-model:c2id="c2id"
      v-model:c3id="c3id"
      :isDisabled="!tableFlag"
    ></CateGory>
    <el-card class="content_card">
      <template v-if="tableFlag">
        <el-button
          @click="tableFlag = false"
          :disabled="!c3id"
          type="primary"
          :icon="Plus"
        >
          添加属性
        </el-button>
        <el-table :data="attrData" border class="table_container">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            width="180px"
            label="属性名称"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template v-slot="{ row }">
              <el-tag v-for="item in row.attrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column width="220px" label="操作">
            <template v-slot="{ row }">
              <el-button @click="handleEdit(row)" :icon="Edit">编辑</el-button>
              <el-button @click="handleDelete(row)" :icon="Delete">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <OperateAttr
          :attrParams="attrParams"
          @cancel="handelCancel"
          @save="handleSave"
        ></OperateAttr>
      </template>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.content_card {
  margin-top: 10px;
  .table_container {
    margin: 10px 0;
  }
}
</style>
