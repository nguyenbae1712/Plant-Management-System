import axios from '../index';

const UserService = {
	signUp: async ({ name, email, password }) => {
		return axios.post('v1/auth/register', {
			name,
			email,
			password,
		});
	},
	login: ({ email, password }) => {
		return axios.post('v1/auth/login', {
			email,
			password,
		});
	},
};

export default UserService;
