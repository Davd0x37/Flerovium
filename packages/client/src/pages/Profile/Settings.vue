<template>
	<div>
		<div>
			<v-button @click="theme">{{ $t('actions.changeTheme') }}</v-button>
			<v-button @click="clear">{{ $t('actions.clearStore') }}</v-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/common/VButton.vue';
import { ACTIONS } from '@/store/names';

export default defineComponent({
	name: 'ProfileSettings',
	components: {
		VButton,
	},
	methods: {
		theme() {
			this.$store.dispatch(ACTIONS.TOGGLE_DARK_MODE);
		},

		clear() {
			this.$store.dispatch(ACTIONS.RESET_STORE);
		},
	},
});
</script>

<style lang="postcss" scoped></style>
