<template>
  <div>
    <ul class="flex flex-row p-2.5 bg-secondary-dark rounded">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="[
          'text-primary p-2.5 mx-2.5 transition rounded cursor-pointer',
          active == index ? 'bg-brand' : '',
        ]"
        @click="activateTab(index)"
      >
        {{ tab.props.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';
import VTab from './VTab.vue';

const active = ref(0); // active tab index
const tabs = ref([] as typeof VTab[]); // array of v-tab instances

// send tabsState to all v-tab instances
// it will be sent to all instances inside <slot></slot>
provide('tabsState', {
  tabs,
  active,
});

function activateTab(id: number) {
  active.value = id;
}
</script>
