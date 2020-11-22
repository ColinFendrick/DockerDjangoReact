import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

const useAuthContext = () => {
	const [authState, setAuthState] = useContext(AuthContext);

	return {
		authState, setAuthState
	};
};

export default useAuthContext;
