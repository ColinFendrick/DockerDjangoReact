import { screen } from '@testing-library/react';

import { renderWith, setup } from '../../setupTests';

import Login from './Login';

describe('Testing <Login />', () => {
	setup(beforeEach)(
		() => renderWith()(<Login />)
	);

	test('Renders', () => {
		expect(
			screen.getByText('Log in')
		).toBeInTheDocument();
	});
});
