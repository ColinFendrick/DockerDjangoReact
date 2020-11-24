import { screen } from '@testing-library/react';

import { render, setup, withRouter, withContext } from '../../setupTests';

import UpdatePassword from './UpdatePassword';

describe('Testing <UpdatePassword />', () => {
	setup(beforeEach)(
		() => render(withRouter, withContext)(<UpdatePassword />)
	);

	test('Renders UpdatePassword', () => {
		expect(
			screen.getByRole('heading', { name: 'Update Password' })
		).toBeInTheDocument();

		expect(
			screen.getByLabelText('Enter New Password *')
		).toBeInTheDocument();

		expect(
			screen.getByLabelText('Enter Your Password Again *')
		).toBeInTheDocument();
	});
});
