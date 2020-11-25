import http from '../http-common';

const prefix = '/api/auth';

const login = ({ username, password }) => http.post(`${prefix}/login`, { username, password });

const logout = token => http.post(`${prefix}/logout`, {}, { headers: { 'Authorization': `Token ${token}` }});

const updatePassword = (data, token) => http.post(`${prefix}/update_password`, data, { headers: { 'Authorization': `Token ${token}` }});

const register = data => http.post(`${prefix}/register`, data);

const service = {
	login,
	logout,
	updatePassword,
	register
};

export default service;
