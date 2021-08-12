<template>
  <div>
    <div v-if="$route.name == $options.name"></div>
    <router-view v-else :key="$route.fullPath"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfileDefault',
});
</script>

<style lang="postcss" scoped></style>
