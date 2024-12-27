<template>
  <div>
    <el-button type="primary" @click="handleRegister"> 登陆 </el-button>
  </div>
</template>
<script setup name="home_page">
import { login } from "@/api/login";
const handleRegister = async () => {
  const res = await login();
  console.log(" res ::>", res);
};
</script>
<style scoped lang="less"></style>
