import { useContext } from 'react';

import { AuthContext, defaultContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';
import * as settings from '../settings';
import { update } from '../helpers/generics';

const useAuthContext = () => {
	const [authState, setAuthState] = useContext(AuthContext);

	const set = (updates = defaultContext, ...rest) => setAuthState(s => update(s)(updates, ...rest));

	const login = async ({ username, password }) => {
		try {
			set({ loading: true });
			const res = await AuthService.login({ username, password });
			const token = res.data.key;
			const expirationDate = new Date(new Date().getTime() + settings.SESSION_DURATION);
			localStorage.setItem('token', token);
			localStorage.setItem('expirationDate', expirationDate);

			set(defaultContext, { token });

			setTimeout(() => {
				logout();
				set();
			}, settings.SESSION_DURATION);
		} catch (error) {
			set(defaultContext, { error });
		}
	};

	const logout = async () => {
		const token = localStorage.getItem('token');
		if (token === undefined){
			localStorage.removeItem('expirationDate');
			set();
		} else {
			try {
				set({ loading: true });
				await AuthService.logout(token);
				localStorage.removeItem('token');
				localStorage.removeItem('expirationDate');
				set();
			} catch (error) {
				set({ error, loading: false });
			}
		}
	};

	return {
		login,
		logout,

		authState,
		setAuthState
	};
};

export default useAuthContext;
