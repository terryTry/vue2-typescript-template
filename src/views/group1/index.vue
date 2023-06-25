<template>
  <div class="group1-container">
    <nav>
      <span class="navItem"
        v-for="(item, index) in navList"
        :key="index"
      >
        <router-link :to="item.path" exact>{{ item.name }}</router-link>
        <span v-if="index !== navList.length - 1"> | </span>
      </span>
    </nav>

    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Layout",
  components: {},
  data() {
    return {
      navList: [
        {
          name: "Home",
          path: "/home",
        },
        {
          name: "About",
          path: "/about",
        },
      ],
    }
  },
});
</script>
