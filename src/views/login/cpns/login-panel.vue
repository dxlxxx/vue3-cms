<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><UserFilled /></el-icon> 账号登录</span
          >
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span
            ><el-icon><Cellphone /></el-icon> 手机登录</span
          >
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

const currentTab = ref('account')
const isKeepPassword = ref(true)
const accountRef = ref<InstanceType<typeof LoginAccount> | null>(null)

const handleLoginClick = () => {
  accountRef.value?.loginAction(isKeepPassword.value)
}
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
