import axios from 'axios';
import qs from 'qs';
import { get } from 'lodash';
import { GET, Obj } from '@/types';
import { Data } from '@/store/modules/services/types';

export const sendForm = async (url: string, parameters: {}) => {
	try {
		const body = qs.stringify(parameters);
		const req = await axios.post(url, body);
		// const req = await axios({
		// 	url,
		// 	method: 'POST',
		// 	params: body,
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/x-www-form-urlencoded',
		// 	},
		// });

		return req.data;
	} catch (err) {
		throw new Error(err);
	}
};

export const sendGet = async (url: string, parameters: GET) => {
	try {
		const req = await axios.get(url, {
			headers: {
				Authorization: `${parameters.tokenType} ${parameters.accessToken}`,
			},
			responseType: 'json',
		});

		return req.data;
	} catch (err) {
		throw new Error(err);
	}
};

const runSelector = (obj: Obj | Obj[], { detail, arrayLimit }: Data) => {
	if (Array.isArray(obj)) {
		const selected = obj.flatMap((record) => get(record, detail));

		return arrayLimit ? selected.slice(0, arrayLimit).join(', ') : selected;
	}

	return get(obj, detail);
};

const runMatcher = (detail: string, matcher: Data['matcher']) =>
	get(matcher, detail);

export const selectData = async (
	obj: Obj | Obj[],
	selectors: Data[],
): Promise<any> => {
	try {
		return selectors.flatMap((selector) => {
			const { label, isEnabled, isImportant, matcher } = selector;
			const selected = runSelector(obj, selector);
			const matched = matcher ? runMatcher(selected, matcher) : selected;

			return {
				label,
				detail: matched,
				isImportant,
				isEnabled,
			};
		});
	} catch (error) {
		throw new Error(error);
	}
};
