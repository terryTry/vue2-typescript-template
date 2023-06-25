<template>
  <div class="login-page">
    登录页
    <button @click="login">登录</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginView",
  methods: {
    async login() {
      await this.$store.dispatch("user/login", {
        userName: "admin",
        password: "123456",
      });
      const redirect = this.$route.query.redirect;
      console.log(redirect);
      if (typeof redirect === "string") {
        this.$router.replace(redirect);
      } else {
        this.$router.replace("/");
      }
    },
  },
});
</script>
