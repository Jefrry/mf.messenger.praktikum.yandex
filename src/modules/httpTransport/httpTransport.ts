import { IRequestOptions, IRequestOptionsWithMethod, METHODS } from "./httpTransport.type.js";

class HTTPTransport {
    private readonly _baseUrl: string;
    constructor() {
        this._baseUrl = 'https://ya-praktikum.tech/api/v2/'
     }
    
    get = (url: string, options: IRequestOptions) => {
        return this.request(`${this._baseUrl}${url}${this._queryStringify(options.data)}`, { ...options, method: METHODS.GET }, options.timeout);
    };
    put = (url: string, options: IRequestOptions) => {
        return this.request(`${this._baseUrl}${url}`, { ...options, method: METHODS.PUT }, options.timeout)
    };
    post = (url: string, options: IRequestOptions) => {
        return this.request(`${this._baseUrl}${url}`, { ...options, method: METHODS.POST }, options.timeout)
    };
    delete = (url: string, options: IRequestOptions) => {
        return this.request(`${this._baseUrl}${url}${this._queryStringify(options.data)}`, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: IRequestOptionsWithMethod, timeout = 5000) => {
        const { method, data, headers } = options

        return new Promise((res, rej) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.timeout = timeout
            xhr.withCredentials = true
            if (headers) xhr.setRequestHeader(headers.name, headers.value)

            xhr.onload = () => xhr.status > 300 ? rej(xhr) : res(xhr)

            xhr.onabort = () => rej(xhr)
            xhr.onerror = () => rej(xhr)
            xhr.ontimeout = () => rej(xhr)

            if (method === METHODS.GET || !data) {
                xhr.send()
            } else {
                xhr.send(data)
            }
        })
    };

    private _queryStringify(data: { [key: string]: string }) {
        let result = ''
        for (const key in data) {
            result += `${result.length === 0 ? '?' : '&'}${key}=${data[key]}`
        }
        return result
    }
}

export { HTTPTransport }