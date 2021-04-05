import {IRequestOptions, IRequestOptionsWithMethod, METHODS} from './httpTransport.type.js';

export class HTTPTransport {
	private readonly _baseUrl: string;
	constructor(baseUrl?: string) {
		this._baseUrl = baseUrl ? baseUrl : 'https://ya-praktikum.tech/api/v2/';
	}

	get = (url: string, options: IRequestOptions) => {
		return this.request(`${this._makeUrl(url)}${this._queryStringify(options.data)}`, {...options, method: METHODS.GET}, options.timeout);
	};

	put = (url: string, options: IRequestOptions) => {
		return this.request(`${this._makeUrl(url)}`, {...options, method: METHODS.PUT}, options.timeout);
	};

	post = (url: string, options: IRequestOptions) => {
		return this.request(`${this._makeUrl(url)}`, {...options, method: METHODS.POST}, options.timeout);
	};

	delete = (url: string, options: IRequestOptions) => {
		return this.request(`${this._makeUrl(url)}${this._queryStringify(options.data)}`, {...options, method: METHODS.DELETE}, options.timeout);
	};

	request = (url: string, options: IRequestOptionsWithMethod, timeout = 5000) => {
		const {method, data, headers} = options;

		return new Promise((res, rej) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.timeout = timeout;
			xhr.withCredentials = true;
			if (headers) {
				xhr.setRequestHeader(headers.name, headers.value);
			}

			xhr.onload = () => xhr.status < 400 ? res(xhr) : rej(xhr);

			xhr.onabort = () => rej(xhr);
			xhr.onerror = () => rej(xhr);
			xhr.ontimeout = () => rej(xhr);

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};

	private _makeUrl(url: string): string {
		return this._baseUrl + url;
	}

	private _queryStringify(data: { [key: string]: string }) {
		if (!data) {
			return '';
		}

		return Object.entries(data).reduce((res, [key, value]) => {
			return `${res}${key}=${value}&`;
		}, '?');
	}
}
