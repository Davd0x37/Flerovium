import {
	ACTIONS as NOTIFACTIONS,
	GETTERS as NOTIFGETTERS,
} from './modules/notification/names';

import {
	ACTIONS as SERVACTIONS,
	GETTERS as SERVGETTERS,
} from './modules/services/names';

export const ACTIONS = {
	SET_AUTHENTICATED: 'setAuthenticated',
	TOGGLE_DARK_MODE: 'toggleDarkMode',
	CHANGE_LANGUAGE: 'changeLanguage',
	CREATE_VAULT: 'createVault',

	...NOTIFACTIONS,
	...SERVACTIONS,
};

export const GETTERS = {
	VAULT_NAME: 'vaultName',
	IS_AUTHENTICATED: 'isAuthenticated',
	DARK_MODE: 'darkMode',
	LANGUAGE: 'language',
	VAULT: 'vault',

	...NOTIFGETTERS,
	...SERVGETTERS,
};
