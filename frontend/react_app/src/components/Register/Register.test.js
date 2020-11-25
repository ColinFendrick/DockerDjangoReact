import { screen } from '@testing-library/react';

import { render, setup, withRouter, withContext } from '../../setupTests';

import Register from './Register';

describe('Testing <Register />', () => {
	setup(beforeEach)(
		() => render(withRouter, withContext)(<Register />)
	);

	test('Renders Register', () => {
		expect(
			screen.getByRole('heading', { name: 'Register' })
		).toBeInTheDocument();

		expect(
			screen.getByRole('textbox', { name: 'User Name' })
		).toBeInTheDocument();
	});
});
