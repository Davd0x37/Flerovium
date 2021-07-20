<template>
	<div>
		<ul class="flex flex-row p-2.5 bg-primary dark:bg-secondary rounded">
			<li
				v-for="(tab, index) in tabs"
				:key="tab.title"
				@click="activateTab(index)"
				:class="[
					'text-secondary dark:text-primary p-2.5 mx-2.5 transition rounded cursor-pointer',
					active == index ? 'bg-brand' : '',
				]"
			>
				{{ tab.props.title }}
			</li>
		</ul>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { ref, provide } from 'vue';
import VTab from '../tabs/VTab.vue';

export default {
	name: 'VTabs',

	setup() {
		const active = ref(0); // active tab index
		const tabs = ref([] as typeof VTab[]); // array of v-tab instances

		// send tabsState to all v-tab instances
		// it will be sent to all instances inside <slot></slot>
		provide('tabsState', {
			tabs,
			active,
		});

		return {
			active,
			tabs,
		};
	},

	methods: {
		activateTab(id: number) {
			// we can ignore this because tsc don't know what vue setup does (i think)
			// @ts-ignore
			this.active = id;
		},
	},
};
</script>

<style lang="postcss"></style>
