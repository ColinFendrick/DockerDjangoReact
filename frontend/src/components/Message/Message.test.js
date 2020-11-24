import { screen } from '@testing-library/react';

import { render } from '../../setupTests';

import Message from './Message';

describe('Testing <Message />', () => {
	test('Renders with message', () => {
		render()(<Message message='Test Message' error />);
		expect(
			screen.getByText('Test Message')
		).toBeInTheDocument();
	});

	test('Renders with no error', () => {
		render()(<Message message='Test Message' />);
		expect(
			screen.getByText('Test Message')
		).toBeInTheDocument();
	});
});
