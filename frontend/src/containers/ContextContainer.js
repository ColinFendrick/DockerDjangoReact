import { AuthProvider } from '../context/AuthContext';
import { PredictionProvider } from '../context/PredictionContext';

const ContextContainer = ({ children }) => (
	<AuthProvider>
		<PredictionProvider>
			{ children }
		</PredictionProvider>
	</AuthProvider>
);

export default ContextContainer;
