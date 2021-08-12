<template>
  <div>
    <label
      for="file"
      :class="[
        'border rounded p-2.5 mx-5 flex flex-row items-center cursor-pointer',
        inversed
          ? 'dark:text-secondary text-primary dark:bg-primary bg-secondary'
          : 'text-secondary dark:text-primary bg-primary dark:bg-secondary',
      ]"
    >
      <v-icon v-if="!spin" class="pr-2.5" icon="las la-lock" />
      <svg
        v-if="spin"
        class="animate-spin h-5 w-5 mr-3 border-brand border-r-2 rounded-full"
        viewBox="0 0 24 24"
      ></svg>
      <p>{{ $t('actions.selectFile') }}</p>
    </label>

    <input id="file" type="file" name="file" class="hidden" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VIcon from '@/components/common/VIcon.vue';

export default defineComponent({
  name: 'FileSelector',

  components: {
    VIcon,
  },

  props: {
    icon: { type: String, required: false, default: 'las la-lock' },
    inversed: { type: Boolean, required: false, default: false },
    spin: { type: Boolean, required: false, default: false },
  },
});
</script>

<style lang="postcss"></style>
