import axios from 'axios';

export const httpClient = axios.create({
	baseURL: 'https://external.integration.starknet.io/',
});
