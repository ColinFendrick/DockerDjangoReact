import { screen } from '@testing-library/react';

import { renderWith, setup } from '../../setupTests';

import Footer from './Footer';

describe('Testing <Footer />', () => {
	setup(beforeEach)(
		() => renderWith()(<Footer />)
	);

	test('Renders', () => {
		expect(
			screen.getByText('Iris Species Predictor')
		).toBeInTheDocument();
	});
});
