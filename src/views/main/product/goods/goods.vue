<template>
  <div class="goods">
    <page-content
      :contentConfig="contentTableConfig"
      pageName="goods"
      ref="pageContentRef"
    >
      <template #oldPrice="{ row }">
        <span>￥{{ row.oldPrice }}</span>
      </template>
      <template #image="{ row }">
        <el-image
          :src="row.imgUrl"
          style="width: 60px; height: 60px"
          :preview-src-list="[row.imgUrl]"
          preview-teleported
        />
      </template>
      <template #status="{ row }">
        <el-button
          :type="row.status ? 'success' : 'danger'"
          size="small"
          plain
          >{{ row.status ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>
  </div>
</template>

<script lang="ts" setup>
import { contentTableConfig } from './config/content.config'
</script>

<style scoped lang="less"></style>
