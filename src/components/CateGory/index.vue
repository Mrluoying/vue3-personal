<script setup lang="ts">
defineOptions({
  name: 'CateGory',
})
const props = defineProps({
  c1id: {
    required: true,
  },
  c2id: {
    required: true,
  },
  c3id: {
    required: true,
  },
})
console.log(props, 'props----props')
const emits = defineEmits(['update:c1id', 'update:c2id', 'update:c3id'])
const c1_id = computed({
  get() {
    return props.c1id
  },
  set(value) {
    if (value) {
      emits('update:c1id', value)
    } else {
      emits('update:c1id', undefined)
      emits('update:c2id', undefined)
      emits('update:c3id', undefined)
    }
  },
})
const c2_id = computed({
  get() {
    return props.c2id
  },
  set(value) {
    if (value) {
      emits('update:c2id', value)
    } else {
      emits('update:c2id', undefined)
      emits('update:c3id', undefined)
    }
  },
})
const c3_id = computed({
  get() {
    return props.c3id
  },
  set(value) {
    if (value) {
      emits('update:c3id', value)
    } else {
      emits('update:c3id', undefined)
    }
  },
})
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData, CategoryObj } from '@/api/product/attr/type'
const c1Options = ref<CategoryObj[]>([])
const c2Options = ref<CategoryObj[]>([])
const c3Options = ref<CategoryObj[]>([])

const getC1 = async () => {
  const res: CategoryResponseData = await reqC1()
  console.log('获取一级分类数据', res)
  if (res.code === 200) {
    c1Options.value = res.data
  }
}
const getC2 = async (c1id: number) => {
  // 为什么这样c1_id没有添加上getter，不能通过c1_id.value获取值
  console.log('当前触发了没有', c1_id)
  const res: CategoryResponseData = await reqC2(c1id)
  if (res.code === 200) {
    c2Options.value = res.data
  }
}

const getC3 = async (c2id: number) => {
  const res: CategoryResponseData = await reqC3(c2id)
  if (res.code === 200) {
    c3Options.value = res.data
  }
}

const handleChangeC1 = (c1id: number) => {
  console.log(c1id, '改变一级分类')
  if (c1id) {
    // emits('update:c1id', c1id)
    getC2(c1id)
  } else {
    // emits('update:c1id', undefined)
    // emits('update:c2id', undefined)
    // emits('update:c3id', undefined)
    c2Options.value = []
    c3Options.value = []
  }
}
const handleChangeC2 = (c2id: number) => {
  console.log(c2id, '改变二级分类')
  if (c2id) {
    // emits('update:c2id', c2id)
    getC3(c2id)
  } else {
    // emits('update:c3id', undefined)
    c3Options.value = []
  }
}
const handleChangeC3 = (c3id: number) => {
  if (c3id) {
    console.log(c3id, '三级分类选中了')
  }
}
onMounted(() => {
  getC1()
})
</script>

<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select clearable @change="handleChangeC1" v-model="c1_id">
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
        <el-select clearable @change="handleChangeC2" v-model="c2_id">
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
        <el-select clearable @change="handleChangeC3" v-model="c3_id">
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
