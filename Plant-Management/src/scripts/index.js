/* -------------------- CONSTANTS  -------------------- */
const API_URL = 'http://134.209.106.33:8888';

/* -------------------- LOCAL STORAGE  -------------------- */
const USER_PROFILE = 'userProfile';
const TOKENS = 'tokens';

const myLocalStorage = {
	setItem: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	},
	getItem: (key, value) => {
		const data = localStorage.getItem(key);
		return JSON.parse(data);
	},
	clear:() => {
		localStorage.clear();
	}
};

const checkTokenExpire = async () => {
	try {
		const tokens = myLocalStorage.getItem(TOKENS);
		if (
			tokens &&
			new Date(tokens.access.expires) < Date.now() &&
			new Date(tokens.refresh.expires) < Date.now()
		) {
			const newToken = await UserService.refreshToken({ refreshToken: tokens.refresh.token });
			myLocalStorage.setItem(TOKENS, newToken);
		}
	} catch (e) {
		/* handle error */
		alert('Refresh tokens is expired!!!');
	}
};

checkTokenExpire();
/* -------------------- FOR ALL SERVICES  -------------------- */

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

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		return handleError(error);
	},
);

const setAuthorization = (token) => {
	instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/* ----- USER SEVICE ----- */

const UserService = {
	signUp: async ({ name, email, password }) => {
		return instance.post('v1/auth/register', {
			name,
			email,
			password,
		});
	},
	login: async ({ email, password }) => {
		return instance.post('v1/auth/login', {
			email,
			password,
		});
	},
	refreshToken: async ({ refreshToken }) => {
		return instance.post('v1/auth/refresh-tokens', { refreshToken });
	},
	logout: async ({ refreshToken }) => {
		return instance.post('v1/auth/logout', { refreshToken });
	},
};

/* ----- DIVISIO SEVICE ----- */

const DivisioService = {
	createDivisio: async ({ Ten_KH, Ten_Latin, Mo_Ta }) => {
		return instance.post('v1/divisio', {
			Ten_KH,
			Ten_Latin,
			Mo_Ta,
		});
	},
	getDivisios: async ({ sortBy, limit, page }) => {
		return instance.get('v1/divisio', {
			params: { sortBy, limit, page },
		});
	},
	getDivisio: async ({ divisioId }) => {
		return instance.get('v1/divisio/:divisioId', {
			urlParams: {
				divisioId,
			},
		});
	},
	updateDivisio: async ({ divisioId, Ten_KH, Ten_Latin, Mo_Ta }) => {
		return instance.patch('v1/divisio/:divisioId', {
			Ten_KH,
			Ten_Latin,
			Mo_Ta,
			urlParams: {
				divisioId,
			},
		});
	},
	deleteDivisio: async ({ divisioId }) => {
		return instance.delete('v1/divisio/:divisioId', {
			urlParams: {
				divisioId,
			},
		});
	},
};

/* -------------------- FOR RENDER UI  -------------------- */

var userProfile;
var tokens;
/* ----- FOR LOGIN PAGE ----- */

const register = () => {
	window.open('../registerPage/index.html');
	// alert('Hello');
};

const form = {
	email: document.getElementById('email'),
	password: document.getElementById('password'),
	submit: document.getElementById('btnLogin'),
	// messages: document.getElementById("form-messages"),
};

form.submit.addEventListener('click', async (e) => {
	e.preventDefault();
	if (email.value === '' && password.value === '') {
		return alert('Please enter your email and password!!!');
	}

	const data = {
		email: email.value,
		password: password.value,
	};

	try {
		const response = await UserService.login(data);

		let token;
		let expires;

		if (response.status === 200 || response.statusText === 'OK') {
			tokens = response.data.tokens;
			token = tokens.access.token;
			expires = tokens.access.expires;
			userProfile = response.data.user;

			myLocalStorage.setItem(USER_PROFILE, userProfile);
			myLocalStorage.setItem(TOKENS, tokens);

			setAuthorization(token);
			// window.location = '../../index.html';
			const role = userProfile.role;
						console.log(role);
						if (role === 'admin') {
							window.location.replace('../adminPage/index.html');
							console.log(role);
						} else {
							// console.log(x)
							window.location.replace('/index.html');
							// if (data)
						}
		}
	} catch (e) {
		/* handle error */
		alert('Something went wrong!!!');
	}
});

/* ------ FOR ADMIN PAGE ------- */
// const getTotalResult = {
// 	// tokens = myLocalStorage.getItem(TOKENS),
// 	try {
// 		const response = await DivisioService.getDivisios(any)
// 	}
	
// }


