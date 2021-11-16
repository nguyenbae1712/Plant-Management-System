import axios from '../index';

const DivisioService = {
	createDivisio: async ({ Ten_KH, Ten_Latin, Mo_Ta }) => {
		return axios.post('v1/divisio', {
			Ten_KH,
			Ten_Latin,
			Mo_Ta,
		});
	},
	getDivisios: async ({ sortBy, limit, page }) => {
		return axios.get('v1/divisio', {
			params: { sortBy, limit, page },
		});
	},
	getDivisio: async ({ divisioId }) => {
		return axios.get('v1/divisio/:divisioId', {
			urlParams: {
				divisioId,
			},
		});
	},
	updateDivisio: async ({ divisioId, Ten_KH, Ten_Latin, Mo_Ta }) => {
		return axios.patch('v1/divisio/:divisioId', {
			Ten_KH,
			Ten_Latin,
			Mo_Ta,
			urlParams: {
				divisioId,
			},
		});
	},
	deleteDivisio: async ({ divisioId }) => {
		return axios.delete('v1/divisio/:divisioId', {
			urlParams: {
				divisioId,
			},
		});
	},
};

export default DivisioService;
