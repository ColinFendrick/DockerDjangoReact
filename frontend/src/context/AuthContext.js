import { useState, createContext } from 'react';

const defaultContext = {
	loading: false,
	error: null,
	token: null
};

const AuthContext = createContext([{}, () => {}]);

const AuthProvider = ({ children }) => {
	const [state, setState] = useState(defaultContext);

	return (
		<AuthContext.Provider value={[state, setState]}>
			{children}
		</AuthContext.Provider>
	);
};

export {
	defaultContext,
	AuthContext,
	AuthProvider
};
