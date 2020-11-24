import { useContext } from 'react';

import { PredictionContext, defaultContext } from '../context/PredictionContext';
import { useAuthContext } from '.';
import PredictionService from '../services/PredictionService';
import { update } from '../helpers/generics';

const usePredictionContext = () => {
	const { checkForToken } = useAuthContext();
	const [predictionState, setPredictionState] = useContext(PredictionContext);

	const set = (updates = defaultContext, ...rest) => setPredictionState(s => update(s)(updates, ...rest));

	const getPrediction = async data => {
		const token = checkForToken();
		if (token !== null) {
			try {
				set({ loading: true, error: null });
				const res = await PredictionService.post(data, token);
				set({ loading: false, error: null, prediction: res.data['Predicted Iris Species'] });
			} catch (error) {
				set({ error, loading: false });
			}
		}
	};

	return {
		getPrediction,

		predictionState,
		setPredictionState
	};
};

export default usePredictionContext;
