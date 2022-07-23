<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            退出登录
            <el-icon>
              <circle-close />
            </el-icon>
          </el-dropdown-item>
          <el-dropdown-item divided>
            用户信息
            <el-icon> </el-icon>
          </el-dropdown-item>
          <el-dropdown-item>
            系统管理
            <el-icon> </el-icon>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { localCache } from '@/utils'

const store = useStore()
const name = computed(() => store.state.loginModule.userInfo.name)

const router = useRouter()
const handleExitClick = () => {
  localCache.removeCache('token')
  router.push('/main')
}
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  & span:last-child {
    margin-left: 10px;
  }
}
.el-icon {
  margin-left: 5px;
}
</style>
