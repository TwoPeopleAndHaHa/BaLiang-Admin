<template>
  <div class="login_container flx-center">
    <div class="login_box">
      <!-- <SwitchDark class="dark" /> -->
      <div class="login_left">
        <img class="login_left_img" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login_form">
        <div class="login_logo">
          <img class="login_icon" src="@/assets/images/logo.svg" alt="" />
          <h2 class="logo_text">BaLiang-Admin</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup name="loginPage">
import LoginForm from "./components/LoginForm.vue";
</script>

<style scoped lang="less">
@import "./index.less";
</style>
