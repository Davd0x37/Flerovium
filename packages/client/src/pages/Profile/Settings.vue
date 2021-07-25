<template>
	<div>
		<v-button @click="theme">{{ $t('actions.changeTheme') }}</v-button>
		<v-button @click="clear">{{ $t('actions.clearStore') }}</v-button>
		<v-button @click="save">{{ $t('actions.save') }}</v-button>

		<a href="#" ref="download" v-show="false">download</a>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/common/VButton.vue';
import { ACTIONS, GETTERS } from '@/store/names';
import { generateDownloadUrl } from '@/api/fs';
import { RootState } from '@/store/types';

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

		async save() {
			try {
				const data: RootState['vault'] = await this.$store.getters[GETTERS.VAULT];
				const payload = JSON.stringify(data);
				const link = this.$refs.download as HTMLAnchorElement;
				const url = generateDownloadUrl(payload);

				link.href = url;
				link.download = `${data.name}-encrypted.json`;
				link.click();
			} catch (error) {
				this.$notification.show({
					mode: 'error',
					title: 'Error while exporting vault',
					message: error,
				});
			}
		},
	},
});
</script>

<style lang="postcss" scoped></style>
