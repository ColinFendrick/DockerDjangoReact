import { screen } from '@testing-library/react';

import { render, setup } from '../../setupTests';

import Home from './Home';

describe('Testing <Home />', () => {
	setup(beforeEach)(
		() => render()(<Home />)
	);

	test('Renders', () => {
		expect(
			screen.getByText('Iris Flower Dimensions')
		).toBeInTheDocument();
	});
});
