import { screen } from '@testing-library/react';

import { render, setup, withRouter, withContext } from '../../setupTests';

import Login from './Login';

describe('Testing <Login />', () => {
	setup(beforeEach)(
		() => render(withRouter, withContext)(<Login />)
	);

	test('Renders Login', () => {
		expect(
			screen.getByRole('heading', { name: 'Log in' })
		).toBeInTheDocument();

		expect(
			screen.getByRole('textbox', { name: 'User Name' })
		).toBeInTheDocument();
	});
});
