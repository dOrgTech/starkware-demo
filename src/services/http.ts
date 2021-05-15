import axios, { AxiosInstance } from 'axios';

interface Config {
	timeout?: number;
	headers?: Record<string, string>;
}

export class HTTPClient {
	private static client: AxiosInstance;

	static create = (baseURL: string, config: Config) => {
		if (!HTTPClient.client) {
			HTTPClient.client = axios.create({ baseURL, ...config });
		}

		return HTTPClient.client;
	};
}
