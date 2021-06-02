import axios from 'axios';

export const httpClient = axios.create({
	baseURL: 'https://cors-anywhere.herokuapp.com/https://external.integration.starknet.io/',
});
