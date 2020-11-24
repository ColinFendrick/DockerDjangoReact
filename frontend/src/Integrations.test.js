import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { setup, render, withLayout, withRouter, withContext } from './setupTests';
import * as settings from './settings';

import App from './App';

describe('Testing Logging in Integration', () => {
	const fakeUserResponse = { key: 'fake_access_token' };

	const server = setupServer(
		rest.post(
			`${settings.API_SERVER}/api/auth/login`,
			(req, res, ctx) => res(ctx.json(fakeUserResponse))
		),
		rest.post(
			`${settings.API_SERVER}/api/auth/logout`,
			(req, res) => res()
		)
	);
	setup(beforeEach, beforeAll, afterAll)(
		[
			() => {
				localStorage.removeItem('token');
				localStorage.removeItem('expirationDate');
			},
			() => server.resetHandlers(),
			() => render(withLayout, withContext, withRouter)(<App />)
		], [
			() => server.listen()
		], [
			() => server.close(),
			() => {
				localStorage.removeItem('token');
				localStorage.removeItem('expirationDate');
			}
		]
	);

	test('Moves from Login Screen to Home, then Logout', async () => {
		const username = await screen.findByRole('textbox', { name: 'User Name' });
		const password = await screen.findByLabelText('Password *');
		const submit = await screen.findByRole('button', { name: 'Log In' });
		expect(localStorage.getItem('token')).toBeNull();

		userEvent.type(username, 'sample');
		userEvent.type(password, 'sample');
		userEvent.click(submit);

		await screen.findByText('Iris Flower Dimensions');
		expect(localStorage.getItem('token')).toEqual(fakeUserResponse.key);

		userEvent.click(
			screen.getByRole('button', { name: 'Logout' })
		);

		await screen.findByRole('textbox', { name: 'User Name' });
		expect(localStorage.getItem('token')).toBeNull();
	});
});
