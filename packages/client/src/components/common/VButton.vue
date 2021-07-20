<template>
	<button
		class="
			text-secondary
			dark:text-primary
			border
			rounded
			p-2.5
			mx-5
			bg-primary
			dark:bg-secondary
		"
	>
		<v-icon class="pr-2.5" :icon="icon" v-if="icon" />
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VIcon from '@/components/common/VIcon.vue';

export default defineComponent({
	name: 'VButton',

	components: {
		VIcon,
	},

	props: {
		icon: { type: String, required: false },
	},
});
</script>

<style lang="postcss"></style>
