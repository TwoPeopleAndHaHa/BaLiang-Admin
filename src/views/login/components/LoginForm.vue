<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="密码：123456" show-password autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> 重置 </el-button>
    <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login(loginFormRef)">
      登录
    </el-button>
  </div>
</template>

<script setup name="loginForm">
import { HOME_URL } from "@/config";
import { loginApi } from "@/api/login";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
// import { useUserStore } from "@/stores/user";
// import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
// import md5 from "md5";

const router = useRouter();
// const userStore = useUserStore();

const loginFormRef = ref();
const loginRules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = ref({
  username: "",
  password: ""
});

// login
const login = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      // 1.执行登录接口
      // const { data } = await loginApi({ ...loginForm, password: md5(loginForm.value.password) });
      const { data } = await loginApi({ ...loginForm.value, password: loginForm.value.password });
      console.log(" data ::>", data);
      // userStore.setToken(data.access_token);

      // 2.添加动态路由
      // await initDynamicRouter();

      // 3.清空历史缓存数据
      // tabsStore.setTabs([]);
      // keepAliveStore.setKeepAliveName([]);

      // 4.跳转到首页
      router.push(HOME_URL);
      // ElNotification({
      //   title: getTimeState(),
      //   message: "欢迎登录 BaLiang-Admin",
      //   type: "success",
      //   duration: 3000
      // });
    } finally {
      loading.value = false;
    }
  });
};

// resetForm
const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
};

onMounted(() => {
  // 监听 enter 事件（调用登录）
  document.onkeydown = e => {
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return;
      login(loginFormRef.value);
    }
  };
});

onBeforeUnmount(() => {
  document.onkeydown = null;
});
</script>

<style scoped lang="less">
@import "../index.less";
</style>
