import { screen } from '@testing-library/react';

import {
	render,
	setup,
	withContext,
	withRouter,
	withWrapper
} from '../../setupTests';
import { AuthContext } from '../../context/AuthContext';

import Header from './Header';

describe('Testing <Header />', () => {
	setup(beforeEach)(
		() => render(withRouter, withContext)(<Header />)
	);

	test('Renders', () => {
		expect(
			screen.getByText('Iris Species Predictor')
		).toBeInTheDocument();

		expect(
			screen.queryByText('Logout')
		).toBeNull();
	});
});

describe('Testing with updated context', () => {
	setup(beforeEach)(
		() => render(
			withRouter,
			withWrapper(
				AuthContext.Provider,
				{ value: [{ token: 'faketoken' }]}
			)
		)(<Header />)
	);

	test('Renders Logout button if you are logged in', () => {
		expect(
			screen.getByText('Logout')
		).toBeInTheDocument();
	});
});
