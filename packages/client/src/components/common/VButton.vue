<template>
	<button
		:class="[
			'border rounded p-2.5 mx-5',
			inversed
				? 'dark:text-secondary text-primary dark:bg-primary bg-secondary'
				: 'text-secondary dark:text-primary bg-primary dark:bg-secondary',
		]"
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
		inversed: { type: Boolean, required: false, default: false },
	},
});
</script>

<style lang="postcss"></style>
