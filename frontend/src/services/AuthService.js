import http from '../http-common';

const prefix = '/api/auth';

const login = ({ username, password }) => http.post(`${prefix}/login`, { username, password });

const logout = token => http.post(`${prefix}/logout`, {}, { headers: { 'Authorization': `Token ${token}` }});

const updatePassword = () => http.post(`${prefix}/update_password`);

const service = {
	login,
	logout,
	updatePassword
};

export default service;
