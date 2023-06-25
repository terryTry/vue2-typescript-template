<template>
  <div class="about">
    <h1>{{$t('about-tips')}}</h1>

    <el-button @click="logout">{{$t('logout')}}</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutView",
  components: {
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push({ name: "login" });
    }
  },
});
</script>
