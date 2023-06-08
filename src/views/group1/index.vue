<template>
  <div class="home">
    <nav>
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>

    <router-view />

    <button @click="logout">退出</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Layout",
  components: {},
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.replace("/login");
    },
  },
});
</script>
