import http from '../http-common';

const prefix = '/api/auth';

const login = () => http.post(`${prefix}/login`);

const logout = () => http.post(`${prefix}/logout`);

const updatePassword = () => http.post(`${prefix}/update_password`);

const service = {
	login,
	logout,
	updatePassword
};

export default service;
