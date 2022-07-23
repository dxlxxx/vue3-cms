<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      ref="formRef"
      :rules="accountRules"
      :model="account"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineExpose } from 'vue'
import { accountRules } from '../config/account-config'
import { ElForm } from 'element-plus'
import { localCache } from '@/utils'
import { useStore } from '@/store'

const store = useStore()
const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    // debugger
    if (valid) {
      if (isKeepPassword) {
        // 本地缓存
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
        store.dispatch('loginModule/accountLoginAction', { ...account })
      } else {
        localCache.removeCache('name')
        localCache.removeCache('password')
      }
    }
  })
}

defineExpose({ loginAction })
</script>

<style scoped></style>
