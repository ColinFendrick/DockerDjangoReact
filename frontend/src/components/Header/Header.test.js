import { screen } from '@testing-library/react';

import { render, setup } from '../../setupTests';

import Header from './Header';

describe('Testing <Header />', () => {
	setup(beforeEach)(
		() => render()(<Header />)
	);

	test('Renders', () => {
		expect(
			screen.getByText('Iris Species Predictor')
		).toBeInTheDocument();

		expect(
			screen.getByText('Login')
		).toBeInTheDocument();
	});
});
