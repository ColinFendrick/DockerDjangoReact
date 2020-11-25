import { screen } from '@testing-library/react';

import { render, setup } from '../../setupTests';

import Footer from './Footer';

describe('Testing <Footer />', () => {
	setup(beforeEach)(
		() => render()(<Footer />)
	);

	test('Renders', () => {
		expect(
			screen.getByText('Iris Species Predictor')
		).toBeInTheDocument();
	});
});
