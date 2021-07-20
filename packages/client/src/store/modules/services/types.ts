import { Tokens, AuthParameters } from '@/types';

export interface ServiceState {
	// Record< Service name, Service content >
	list: Record<string, Service>;
}

export interface Service {
	// Service ID
	$id: string;
	// Service name
	name: string;
	// Service configuration - icon, colors etc.
	config: {
		// Icon name eg. lab la-brand
		icon: string;
		// Color used to print important labels
		color: string;
		// -------
		isEnabled: boolean;
	};
	auth: {
		hasRequestedTokens: boolean;
		credentials: Pick<
			AuthParameters,
			| 'authorizationUri'
			| 'clientId'
			| 'clientSecret'
			| 'tokenEndpointUri'
			| 'scope'
		> &
			Partial<Pick<AuthParameters, 'redirectUri'>>;
		// Authentication tokens
		tokens: Tokens;
	};
	// Paths where runner should look for data and obtain selected
	dataPaths: DataPath[];
	// Received data from service
	data: Data[];
}

export interface DataPath {
	path: string;
	name?: string;
	select: Data[];
}

export interface Data {
	label: string; // Title
	detail: string; // Path
	isImportant: boolean; // Is important?
	isEnabled: boolean;
	matcher?: Record<string, any>;
	arrayLimit?: number; // Collected array limit
}
