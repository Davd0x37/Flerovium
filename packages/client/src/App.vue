<template>
	<div :class="darkMode ? 'dark' : ''">
		<div
			class="
				bg-primary
				dark:bg-secondary
				text-secondary
				dark:text-primary
				font-display
				flex flex-col
				h-full
				min-h-screen min-w-min
			"
		>
			<component :is="layout"></component>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import WelcomeLayout from '@/layouts/WelcomeLayout.vue';
import { GETTERS } from './store/names';

export default defineComponent({
	name: 'App',

	components: {
		DefaultLayout,
		WelcomeLayout,
	},

	data() {
		return {
			layout: '',
		};
	},

	watch: {
		$route(to) {
			if (to.meta.layout !== undefined) {
				this.layout = to.meta.layout;
			} else {
				this.layout = 'DefaultLayout';
			}
		},
	},

	computed: {
		darkMode(): boolean {
			return this.$store.getters[GETTERS.DARK_MODE];
		},
	},
});
</script>

<style lang="postcss"></style>
