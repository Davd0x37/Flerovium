<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { inject, getCurrentInstance, computed, watchEffect } from 'vue';

export default {
  name: 'VTab',

  props: {
    title: { type: String, required: true, default: 'TabName' },
  },

  // @SOURCE: https://codesandbox.io/embed/vue-3-tabs-simple-vjf4s
  // @SOURCE: https://forum.vuejs.org/t/how-to-access-children-in-vue-3-for-creating-a-tabs-component/108955/2
  setup() {
    const instance = getCurrentInstance(); // get instance, don't use 'this'
    // receive tabsState from parent v-tabs instance
    const { tabs, active } = inject('tabsState') as any;

    // get current instance index
    const index = computed(() =>
      tabs.value.findIndex((target: any) => target.uid === instance!.uid),
    );

    // compare with active index from v-tabs parent with current instance index
    const isActive = computed(() => index.value === active.value);

    watchEffect(() => {
      if (index.value === -1) {
        tabs.value.push(instance);
      }
    });

    return {
      isActive,
    };
  },
};
</script>

<style lang="postcss"></style>
