import { AuthProvider } from '../context/AuthContext';

const ContextContainer = ({ children }) => (
	<AuthProvider>
		{ children }
	</AuthProvider>
);

export default ContextContainer;
