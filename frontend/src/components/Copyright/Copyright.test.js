import { screen } from '@testing-library/react';

import { renderWith, setup } from '../../setupTests';

import Copyright from './Copyright';

describe('Testing <Copyright />', () => {
	setup(beforeEach)(
		() => renderWith()(<Copyright />)
	);

	test('Renders', () => {
		expect(
			screen.getByText('Your Website')
		).toBeInTheDocument();
	});
});
