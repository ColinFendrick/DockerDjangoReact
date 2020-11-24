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
				set(defaultContext, { loading: true });
				const res = await PredictionService.post(data, token);
				set(defaultContext, { prediction: res.data['Predicted Iris Species'] });
			} catch (error) {
				set(defaultContext, { error });
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
