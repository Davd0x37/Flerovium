<template>
  <div class="py-2.5 2xl:w-3/4 sm:w-full text-primary dark:text-secondary">
    <p>{{ title }}</p>
    <div id="subeditor" ref="container" :class="[height, 'bg-primary']"></div>
    <!-- <pre>{{modelValue}}</pre> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref, unref } from 'vue';
import JSONEditor, { JSONEditorMode, JSONEditorOptions } from 'jsoneditor';

import 'jsoneditor/dist/jsoneditor.css';

const props = withDefaults(
  defineProps<{
    modelValue: unknown;
    title: string;

    mode?: string; // 'tree' | 'view' | 'form' | 'code' | 'text' | 'preview'
    height?: string;
  }>(),
  {
    title: 'Title',
    mode: 'code',
    height: 'h-96',
  },
);

const container = ref<HTMLElement>() as Ref<HTMLElement>;

const emits = defineEmits(['update:modelValue']);

onMounted(() => {
  const { mode } = props;
  const options: JSONEditorOptions = {
    mainMenuBar: true,
    mode: mode as JSONEditorMode,

    onChangeText: (jsonString: string) => {
      if (mode === 'code') {
        emits('update:modelValue', JSON.parse(jsonString));
      }
    },
  };

  const editor = new JSONEditor(unref(container.value), options);
  editor.set(props.modelValue);
});
</script>
