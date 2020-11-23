import { screen } from '@testing-library/react';

import { setup, render, withLayout, withRouter, withContext } from './setupTests';
import * as settings from './settings';

import App from './App';

describe('Testing <App />', () => {
	setup(beforeEach, afterAll)(
		[
			() => {
				localStorage.setItem('token', 'fake_token');
				localStorage.setItem('expirationDate', new Date(new Date().getTime() + settings.SESSION_DURATION));
			},
			() => render(withLayout, withContext, withRouter)(<App />)
		], [
			() => {
				localStorage.removeItem('token');
				localStorage.removeItem('expirationDate');
			}
		]
	);

	test('Will Redirect with Creds', async () => {
		await screen.findByRole('button', { name: 'Logout' });
		expect(localStorage.getItem('token')).toEqual('fake_token');
	});
});
