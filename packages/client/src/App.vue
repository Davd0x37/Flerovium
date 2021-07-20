<template>
	<div :class="darkMode ? 'dark' : ''">
		<notification></notification>
		<div
			class="
				bg-primary
				dark:bg-secondary
				text-secondary
				dark:text-primary
				font-display
				flex flex-col
				min-h-screen min-w-min
			"
		>
			<Header />
			<div class="h-full flex flex-grow">
				<Sidebar />
				<Content />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Content from '@/components/Content.vue';
import Notification from '@/components/Notification.vue';
import { GETTERS } from './store/names';

export default defineComponent({
	name: 'App',

	components: {
		Header,
		Sidebar,
		Content,
		Notification,
	},

	computed: {
		darkMode(): any {
			return this.$store.getters[GETTERS.DARK_MODE];
		},
	},
});
</script>

<style lang="postcss"></style>
