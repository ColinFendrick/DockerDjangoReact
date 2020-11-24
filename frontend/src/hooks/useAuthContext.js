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

	const login = async data => {
		try {
			set(defaultContext, { loading: true });
			const res = await AuthService.login(data);
			const token = res.data.key;
			const expirationDate = new Date(new Date().getTime() + settings.SESSION_DURATION);
			localStorage.setItem('token', token);
			localStorage.setItem('expirationDate', expirationDate);

			set(defaultContext, { token, message: 'Successfully logged in!' });
			setLogoutTimer(settings.SESSION_DURATION);
		} catch (error) {
			set(defaultContext, { error, message: `${error.message}: Your credentials are probably incorrect.` });
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
				set({ error, loading: false, message: error.message });
			}
		}
	};

	const updatePassword = async data => {
		const token = checkForToken();
		if (token !== null) {
			try {
				set({ loading: true });
				await AuthService.updatePassword(data, token);
				set({ error: null, loading: false, message: 'Password successfully updated. Logging you out in three seconds.' });

				setLogoutTimer(3000);
			} catch (error) {
				set({ error, loading: false, message: 'Your password is too simple. Must be an uncommon password of at least eight characters' });
			}
		}
	};

	const checkForToken = () => {
		const token = localStorage.getItem('token');
		if (token === null) {
			logout();
			return null;
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				logout();
				return null;
			} else {
				set(defaultContext, { token });
				setLogoutTimer(expirationDate.getTime() - new Date().getTime());
				return token;
			}
		}
	};

	return {
		login,
		logout,
		checkForToken,
		updatePassword,

		authState,
		setAuthState
	};
};

export default useAuthContext;
