<template>
	<div>
		<div class="my-5">
			<v-button icon="las la-pen" @click="editService()">{{
				$t('actions.edit')
			}}</v-button>
			<v-button
				icon="las la-sync"
				@click="serviceTask(ActionsEnum.REQUEST_DATA)"
				>{{ $t('actions.refresh') }}</v-button
			>
			<v-button
				icon="las la-atom"
				v-if="!hasRequestedTokens && hasAccessToken"
				@click="serviceTask(ActionsEnum.REQUEST_TOKENS)"
				>{{ $t('actions.requestTokens') }}</v-button
			>
			<v-button
				icon="las la-atom"
				v-if="!hasRequestedTokens && !hasAccessToken"
				@click="serviceTask(ActionsEnum.AUTHENTICATE_SERVICE)"
				>{{ $t('actions.authenticate') }}</v-button
			>
			<v-button icon="las la-trash" @click="deleteService()">{{
				$t('actions.delete')
			}}</v-button>
		</div>

		<v-tabs>
			<v-tab :title="$t('services.data')">
				<div class="flex flex-col flex-wrap">
					<div v-for="val in service.data" :key="val.label" class="flex flex-row">
						<v-label
							:label="val.label"
							:important="val.isImportant"
							:color="service.config.color"
							class="py-2.5 w-96"
							>{{ val.detail }}</v-label
						>
						<!-- @TODO: Make custom checkbox -->
						{{ val.isEnabled }}
						<v-input
							type="checkbox"
							:title="
								$t(val.isEnabled ? 'form.enabledOption' : 'form.disabledOption', {
									option: val.label,
								})
							"
							v-model="val.isEnabled"
						></v-input>
					</div>
				</div>
			</v-tab>

			<v-tab :title="$t('services.information')">
				<div
					v-for="(val, name) in service.auth.credentials"
					:key="name"
					class="flex flex-row flex-wrap"
				>
					<v-label :label="name" class="py-2.5">{{ val }}</v-label>
				</div>
			</v-tab>

			<v-tab :title="$t('services.dataPaths')">
				<div>
					<json-editor
						v-model="service.dataPaths"
						mode="view"
						:title="$t('services.dataPaths')"
					></json-editor>
				</div>
			</v-tab>
		</v-tabs>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import VButton from '@/components/common/VButton.vue';
import VLabel from '@/components/common/VLabel.vue';
import VInput from '@/components/common/VInput.vue';
import VTab from '@/components/tabs/VTab.vue';
import VTabs from '@/components/tabs/VTabs.vue';
import VLink from '@/components/SidebarLink.vue';
import { Service } from '@/store/modules/services/types';
import JsonEditor from '@/components/JsonEditor.vue';
import { AuthenticationActionEnum } from '@/types';
import { ACTIONS, GETTERS } from '@/store/names';
import { GET_REDIRECT_URI } from '@/common/helpers';
import {
	runRequestData,
	runRequestTokens,
	runAuthenticateService,
} from '@/api/actions';

export default defineComponent({
	name: 'ServicesView',

	components: {
		VButton,
		VLabel,
		VInput,
		VTab,
		VTabs,
		VLink,
		JsonEditor,
	},

	data() {
		return {
			service: {} as Service,
			ActionsEnum: AuthenticationActionEnum,
		};
	},

	created() {
		const name = this.$route.params.name;
		this.service = this.$store.getters[GETTERS.GET_SERVICE](name);
		const redirectUri = GET_REDIRECT_URI(name as string);

		this.service.auth.credentials.redirectUri = redirectUri;
	},

	computed: {
		hasRequestedTokens() {
			// @TODO: computed properties cannot see what is in data?
			// @ts-ignore
			return this.service.auth.hasRequestedTokens;
		},

		hasAccessToken() {
			// @ts-ignore
			const { accessToken, code } = this.service.auth.tokens;

			return !!accessToken || !!code;
		},
	},

	methods: {
		editService() {
			this.$router.push({
				name: 'ServicesEdit',
				params: {
					name: this.service.name,
				},
			});
		},

		deleteService() {
			this.$store.dispatch(ACTIONS.DELETE_SERVICE, this.service.name);
			this.$router.push({
				name: 'ServicesDefault',
			});
		},

		async serviceTask(taskNum: AuthenticationActionEnum) {
			switch (taskNum) {
				case AuthenticationActionEnum.REQUEST_DATA: {
					await runRequestData(this.service);
					break;
				}
				case AuthenticationActionEnum.REQUEST_TOKENS: {
					await runRequestTokens(this.service);
					break;
				}
				case AuthenticationActionEnum.AUTHENTICATE_SERVICE: {
					await runAuthenticateService(this.service);
					break;
				}
				default: {
					break;
				}
			}
		},
	},
});
</script>

<style lang="postcss" scoped></style>
