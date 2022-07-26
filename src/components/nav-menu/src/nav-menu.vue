<template>
  <div>
    <div class="nav-menu">
      <div class="logo">
        <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
        <span v-if="!collapse" class="title">Vue3+TS</span>
      </div>
      <el-menu
        :default-active="defaultValue"
        class="el-menu-vertical"
        :collapse="collapse"
        background-color="#0c2135"
        text-color="#b7bdc3"
        active-text-color="#0a60bd"
        router
      >
        <template v-for="item in userMenus" :key="item.id">
          <!-- 子菜单 -->
          <template v-if="item.type === 1">
            <el-sub-menu :index="item.id + ''">
              <!-- 插槽指定标题 -->
              <template #title>
                <el-icon v-if="item.icon">
                  <component :is="getIconName(item.icon)"></component
                ></el-icon>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="subItem in item.children" :key="subItem.id">
                <el-menu-item :index="subItem.url">{{
                  subItem.name
                }}</el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <!-- 直接生成一级菜单 -->
          <template v-else-if="item.type === 2">
            <el-menu-item :index="item.url">{{ item.name }}</el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

withDefaults(
  defineProps<{
    collapse?: boolean
  }>(),
  {
    collapse: true
  }
)

const store = useStore()
const userMenus = computed(() => store.state.loginModule.userMenus)
const route = useRoute()

const getIconName = (name: string) => {
  return name.slice(8)
}

const defaultValue = computed(() => route.path)
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
