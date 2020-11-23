import { useContext } from 'react';

import { AuthContext, defaultContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';
import * as settings from '../settings';
import { update } from '../helpers/generics';

const useAuthContext = () => {
	const [authState, setAuthState] = useContext(AuthContext);

	const set = (updates = defaultContext, ...rest) => setAuthState(s => update(s)(updates, ...rest));
	const setLogoutTimer = expirationTime => setTimeout(() => {
		logout();
		set();
	}, expirationTime);

	const login = async ({ username, password }) => {
		try {
			set({ loading: true, error: null });
			const res = await AuthService.login({ username, password });
			const token = res.data.key;
			const expirationDate = new Date(new Date().getTime() + settings.SESSION_DURATION);
			localStorage.setItem('token', token);
			localStorage.setItem('expirationDate', expirationDate);

			set(defaultContext, { token });
			setLogoutTimer(settings.SESSION_DURATION);
		} catch (error) {
			set(defaultContext, { error });
		}
	};

	const logout = async () => {
		const token = localStorage.getItem('token');
		if (token === null) {
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

	const checkForToken = () => {
		const token = localStorage.getItem('token');
		if (token === null) {
			logout();
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				logout();
			} else {
				set(defaultContext, { token });
				setLogoutTimer(expirationDate.getTime() - new Date().getTime());
			}
		}
	};

	return {
		login,
		logout,
		checkForToken,

		authState,
		setAuthState
	};
};

export default useAuthContext;
