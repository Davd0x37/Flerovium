<template>
	<div class="flex flex-col flex-wrap">
		<v-input title="Vault name" lightOnDark required v-model="name"></v-input>
		<v-input
			title="Password"
			lightOnDark
			required
			type="password"
			v-model="password"
			@click="v$.$touch"
		></v-input>
		<v-input
			title="Repeat password"
			lightOnDark
			required
			type="password"
			v-model="repeatPass"
			@click="v$.$touch"
			:rules="rules"
		></v-input>

		<v-button icon="las la-save" @click="save" v-if="isClear" inversed>{{
			$t('actions.save')
		}}</v-button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { sameAs } from '@vuelidate/validators';

import VIcon from '@/components/common/VIcon.vue';
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import { ACTIONS } from '@/store/names';

import { web } from '@flerovium/shared';

export default defineComponent({
	name: 'WelcomeCreate',
	components: {
		VIcon,
		VInput,
		VButton,
	},

	data() {
		return {
			v$: useVuelidate(),
			name: '',
			password: '',
			repeatPass: '',
			isClear: false,
		};
	},

	watch: {
		'v$.$error': function (_, newV) {
			this.isClear = newV;
		},
	},

	computed: {
		rules: function () {
			return {
				sameAs: sameAs(this.password),
			};
		},
	},

	methods: {
		async save() {
			try {
				const hash = await web.functions.Argon2.hash(this.password);
				const payload = {
					name: this.name,
					passwordHash: hash?.hashHex,
				};

				await this.$store.dispatch(ACTIONS.CREATE_VAULT, payload);

				this.$router.push({ name: 'Home' });
			} catch (err) {
				this.$notification.show({
					mode: 'error',
					title: 'Error while creating vault',
					message: err,
				});
			}
		},
	},
});
</script>

<style lang="postcss" scoped></style>
