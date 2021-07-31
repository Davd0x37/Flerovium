<template>
  <div class="py-2.5 2xl:w-3/4 sm:w-full text-primary dark:text-secondary">
    <p>{{ title }}</p>
    <div id="subeditor" :class="[height, 'bg-primary']" ref="editor"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';

import 'jsoneditor/dist/jsoneditor.css';

export default defineComponent({
  name: 'JsonEditor',

  props: {
    modelValue: {} as any,
    title: { type: String, required: true, default: 'Title' },
    // 'tree' | 'view' | 'form' | 'code' | 'text' | 'preview'
    mode: { type: String, required: false, default: 'code' },
    height: { type: String, required: false, default: 'h-96' },
  },

  emits: ['update:modelValue'],

  mounted() {
    const container = this.$refs.editor as HTMLElement;
    const mode: any = this.mode;
    const options: JSONEditorOptions = {
      mainMenuBar: true,
      mode,
      onChangeText: (jsonString: string) => {
        if (mode === 'code') {
          this.$emit('update:modelValue', JSON.parse(jsonString));
        }
      },
    };

    const editor = new JSONEditor(container, options);
    editor.set(this.modelValue);
  },
});
</script>

<style lang="postcss"></style>
