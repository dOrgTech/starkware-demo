import axios from 'axios';

export const httpClient = axios.create({
	baseURL: 'https://cors-anywhere-namesty.herokuapp.com/https://external.integration.starknet.io/',
});
