<template>
	<div class="text-secondary"></div>
</template>

<script lang="ts">
import { ACTIONS } from '@/store/names';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ServiceAuthorize',

	created() {
		setTimeout(() => {
			const serviceName = this.$route.params.name;
			const { code, state } = this.$route.query;

			this.$store.dispatch(ACTIONS.UPDATE_TOKENS, {
				serviceName,
				tokens: {
					code,
				},
			});

			this.$router.push({
				name: 'ServicesView',
				params: {
					name: serviceName,
				},
			});
			// window.close();
		}, 500);
	},
});
</script>

<style lang="postcss" scoped></style>
