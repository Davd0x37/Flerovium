<template>
	<i :class="[size, icon]"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'VIcon',

	props: {
		size: { type: String, default: 'la-lg', required: false },
		icon: { type: String, default: 'las la-sync', required: true },
	},
});
</script>

<style lang="postcss"></style>
