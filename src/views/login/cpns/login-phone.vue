<template>
  <el-form label-width="80px" :rules="phoneRules" :model="phone">
    <el-form-item label="手机号" prop="num">
      <el-input v-model="phone.num" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" />
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { phoneRules } from '../config/phone-config'

const phone = ref({
  num: '',
  code: ''
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  .get-btn {
    margin-left: 8px;
  }
}
</style>
