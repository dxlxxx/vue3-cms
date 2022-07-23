<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick" :size="30">
      <component :is="iconName"></component>
    </el-icon>
    <div class="content">
      <!-- 面包屑 -->
      <xl-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, ref, watchEffect } from 'vue'
import UserInfo from '@/components/nav-header/src/user-info.vue'
import XlBreadcrumb from '@/base-ui/breadcrumbs'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { mapPathToMenu } from '@/utils'
import { IBreadcrumb } from '@/base-ui/breadcrumbs/src/types'

const emit = defineEmits(['foldChange'])

// 展开
const isFold = ref(false)
const iconName = computed(() => (isFold.value ? 'Expand' : 'Fold'))

const handleFoldClick = () => {
  isFold.value = !isFold.value
  // 发射事件
  emit('foldChange', isFold.value)
}

// 面包屑
const store = useStore()
const route = useRoute()
const breadcrumbs = ref<IBreadcrumb[] | null>(null)

watchEffect(() => {
  breadcrumbs.value = mapPathToMenu(
    store.state.loginModule.userMenus,
    route.path
  )
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
