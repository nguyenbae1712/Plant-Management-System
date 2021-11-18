// import axios from 'axios';

const API_URL = '134.209.106.33:8888';

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

const handleError = (error) => {
	return Promise.reject(error);
};

// instance.interceptors.request.use(async (config) =>{
// 	const {method, data, url}= config
// })

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		return handleError(error);
	},
);

export const setAuthorization = (token) => {
	instance.defaults.header.common['Authorization'] = `Bearer ${token}`;
};

export default instance;
