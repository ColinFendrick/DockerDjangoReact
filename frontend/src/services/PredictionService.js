import http from '../http-common';

const prefix = '/api/predict';

const post = (data, token) => http.post(prefix, data, { headers: { 'Authorization': `Token ${token}` }});

const service = {
	post
};

export default service;
