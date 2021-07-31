<template>
  <div>
    <div v-if="$route.name == $options.name"></div>
    <router-view :key="$route.fullPath" v-else></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfileDefault',
});
</script>

<style lang="postcss" scoped></style>
