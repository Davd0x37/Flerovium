<template>
	<!-- <div class="h-full"> -->
	<notification></notification>
	<Header />
	<div class="h-full flex flex-grow">
		<Sidebar />

		<div class="bg-secondary dark:bg-primary w-full rounded-tl-3xl py-12 px-10">
			<router-view />
		</div>
	</div>
	<!-- </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Notification from '@/components/Notification.vue';

export default defineComponent({
	name: 'DefaultLayout',

	components: {
		Header,
		Sidebar,
		Notification,
	},
});
</script>

<style lang="postcss"></style>
