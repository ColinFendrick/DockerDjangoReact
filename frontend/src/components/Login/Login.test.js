import { screen } from '@testing-library/react';

import { render, setup } from '../../setupTests';

import Login from './Login';

describe('Testing <Login />', () => {
	setup(beforeEach)(
		() => render()(<Login />)
	);

	test('Renders', () => {
		expect(
			screen.getByText('Log in')
		).toBeInTheDocument();
	});
});
