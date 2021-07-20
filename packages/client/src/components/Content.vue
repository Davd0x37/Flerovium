<template>
	<div class="bg-secondary dark:bg-primary w-full rounded-tl-3xl py-12 px-10">
		<router-view />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Content',
});
</script>

<style lang="postcss"></style>
