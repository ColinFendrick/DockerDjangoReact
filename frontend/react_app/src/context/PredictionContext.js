import { useState, createContext } from 'react';

const defaultContext = {
	prediction: null,
	error: null,
	loading: false
};

const PredictionContext = createContext([{}, () => {}]);

const PredictionProvider = ({ children }) => {
	const [state, setState] = useState(defaultContext);

	return (
		<PredictionContext.Provider value={[state, setState]}>
			{children}
		</PredictionContext.Provider>
	);
};

export {
	defaultContext,
	PredictionContext,
	PredictionProvider
};
