<template>
	<div class="flex flex-col flex-wrap">
		<file-selector
			inversed
			:class="selected && 'opacity-30'"
			@change="onUploadFiles"
			:spin="spin"
		/>

		<v-input
			title="Password"
			lightOnDark
			required
			type="password"
			:rules="rules"
			@click="v$.$touch"
			v-model="password"
		></v-input>

		<v-button
			icon="las la-lock"
			inversed
			@click="open()"
			v-if="isClear && selected"
			>{{ $t('actions.open') }}</v-button
		>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

import VIcon from '@/components/common/VIcon.vue';
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import FileSelector from '@/components/common/FileSelector.vue';

import { FileReadHandlers, readFile } from '@/api/fs';
import { ACTIONS } from '@/store/names';
import { web } from '@flerovium/shared';

export default defineComponent({
	name: 'WelcomeOpen',
	components: {
		VIcon,
		VInput,
		VButton,
		FileSelector,
	},

	data() {
		return {
			v$: useVuelidate(),
			selected: false,
			password: '',
			payload: null as any,
			isClear: false,
			spin: false,
			rules: {
				required,
				minLength: minLength(6),
			},
		};
	},

	watch: {
		// Must be checked in watch because computed is not accessible during rendering
		'v$.$error': function (_, newV) {
			this.isClear = newV;
		},
	},

	methods: {
		async open() {
			try {
				const hash = await web.functions.Argon2.hash(this.password);
				const payload = JSON.parse(this.payload);
				const data = {
					...payload,
					passwordHash: hash?.hashHex,
				};

				await this.$store.dispatch(ACTIONS.CREATE_VAULT, data);

				this.$router.push({ name: 'Home' });
			} catch (error) {
				console.log(error);
			}
		},

		handlers(): FileReadHandlers {
			const self = this;
			return {
				onload(res) {
					setTimeout(() => {
						self.spin = false;
						self.selected = true;
					}, 700);

					self.payload = res;
				},
				onerror: function (ev) {
					console.error(ev);
				},
				onprogress: function () {
					self.spin = true;
				},
				onabort: function (ev) {
					console.error(ev);
				},
			};
		},

		onUploadFiles(event: InputEvent) {
			const target = event.target as HTMLInputElement;
			const files = target.files;

			if (files && files.length > 0) {
				readFile(files.item(0)!, this.handlers());
			}
		},
	},
});
</script>

<style lang="postcss" scoped></style>
