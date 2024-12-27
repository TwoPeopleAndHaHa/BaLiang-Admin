import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/config/index.js";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    token: "",
    userInfo: {
      name: "BaLiang"
    }
  }),
  getters: {
    getToken: state => state.token,
    getUserInfo: state => state.userInfo
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("BaLiang-Admin")
});
