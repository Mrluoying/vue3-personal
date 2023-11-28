<script setup lang="ts">
defineOptions({
  name: 'CateGory',
})
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
const c1Options = ref<any>([])
const c2Options = ref<any>([])
const c3Options = ref<any>([])
const c1_id = ref<number | undefined>()
const getC1 = async () => {
  const res = await reqC1()
  console.log('获取一级分类数据', res)
  if (res.code === 200) {
    c1Options.value = res.data
  }
}

const c2_id = ref<number | undefined>()
const getC2 = async () => {
  const res = await reqC2(c1_id.value)
  if (res.code === 200) {
    c2Options.value = res.data
  }
}
const c3_id = ref<number | undefined>()
const getC3 = async () => {
  const res = await reqC3(c2_id.value)
  if (res.code === 200) {
    c3Options.value = res.data
  }
}

const handleChangeC1 = (param: number) => {
  console.log(param, '改变一级分类')
  getC2()
}
const handleChangeC2 = (param: number) => {
  console.log(param, '改变二级分类')
  getC3()
}
const handleChangeC3 = (param: number) => {
  console.log(param, '三级分类选中了')
}
onMounted(() => {
  getC1()
})
</script>

<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select @change="handleChangeC1" v-model="c1_id">
          <!-- label用来控制选中的展示 -->
          <!-- el-option标签内的内容用来展示该下拉内容的展示 -->
          <el-option
            v-for="c1 in c1Options"
            :value="c1.id"
            :key="c1.id"
            :label="c1.name"
          >
            {{ c1.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select @change="handleChangeC2" v-model="c2_id">
          <el-option
            v-for="c2 in c2Options"
            :value="c2.id"
            :key="c2.id"
            :label="c2.name"
          >
            {{ c2.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select @change="handleChangeC3" v-model="c3_id">
          <el-option
            v-for="c3 in c3Options"
            :value="c3.id"
            :key="c3.id"
            :label="c3.name"
          >
            {{ c3.name }}
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
