<template>
  <div v-show="isActive" class="p-2.5">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {
  inject,
  getCurrentInstance,
  computed,
  watchEffect,
  Ref,
  ComponentInternalInstance,
} from 'vue';

const _props = withDefaults(
  defineProps<{
    title: string;
  }>(),
  {
    title: 'TabName',
  },
);

// @SOURCE: https://codesandbox.io/embed/vue-3-tabs-simple-vjf4s
// @SOURCE: https://forum.vuejs.org/t/how-to-access-children-in-vue-3-for-creating-a-tabs-component/108955/2
const instance = getCurrentInstance() as ComponentInternalInstance; // get instance, don't use 'this'
// receive tabsState from parent v-tabs instance
const { tabs, active } = inject('tabsState') as {
  tabs: Ref<ComponentInternalInstance[]>;
  active: Ref<number>;
};

// get current instance index
const index = computed(() =>
  tabs.value.findIndex(
    (target: ComponentInternalInstance) => target.uid === instance?.uid,
  ),
);

// compare with active index from v-tabs parent with current instance index
const isActive = computed(() => index.value === active.value);

watchEffect(() => {
  if (index.value === -1) {
    tabs.value.push(instance);
  }
});
</script>
