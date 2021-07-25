<template>
	<div
		class="
			grid grid-cols-header
			justify-items-center
			items-center
			h-20
			text-secondary
			dark:text-primary
		"
	>
		<div>
			<i class="las la-2x la-ellipsis-h"></i>
		</div>
		<div class="justify-self-start font-bold text-4xl">{{ vaultName }}</div>
		<div class="justify-self-stretch">
			<input
				class="
					font-bold
					uppercase
					py-2.5
					px-5
					w-full
					rounded
					border border-none
					text-primary
					dark:text-secondary
					placeholder-brand
					bg-secondary
					dark:bg-primary
				"
				v-model="search"
				type="search"
				name="search"
				id="search"
				:placeholder="$t('header.search')"
			/>
		</div>
		<div class="flex flex-row">
			<div class="w-full h-10 flex items-center justify-center" @click="logout">
				<i class="las la-lg la-sign-out-alt pr-5"></i>
				<p>
					{{ $t('actions.logout') }}
				</p>
			</div>
			<locale-changer></locale-changer>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/common/VButton.vue';
import LocaleChanger from './LocaleChanger.vue';
import { ACTIONS, GETTERS } from '@/store/names';

export default defineComponent({
	name: 'Header',
	components: {
		VButton,
		LocaleChanger,
	},

	created() {
		this.vaultName = this.$store.getters[GETTERS.VAULT_NAME];
	},

	data() {
		return {
			search: '',
			vaultName: '',
		};
	},

	methods: {
		logout() {
			this.$store.dispatch(ACTIONS.SET_AUTHENTICATED, false);
			this.$router.push({ name: 'WelcomeDefault' });
		},
	},
});
</script>

<style lang="postcss"></style>
