import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { setup, render, withLayout, withRouter, withContext } from './setupTests';
import * as settings from './settings';

import App from './App';

describe('Testing Logging in Integration', () => {
	const fakeUserResponse = { key: 'fake_access_token' };
	const noopRes = (req, res) => res();

	const server = setupServer(
		rest.post(
			`${settings.API_SERVER}/api/auth/login`,
			(req, res, ctx) => res(ctx.json(fakeUserResponse))
		),
		rest.post(
			`${settings.API_SERVER}/api/auth/update_password`,
			noopRes
		),
		rest.post(
			`${settings.API_SERVER}/api/auth/register`,
			noopRes
		),
		rest.post(
			`${settings.API_SERVER}/api/auth/logout`,
			noopRes
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

	test('Logs in, changes password, logs in with new password', async () => {
		jest.useFakeTimers();
		// First time on login screen
		let username = await screen.findByRole('textbox', { name: 'User Name' });
		let password = await screen.findByLabelText('Password *');
		let submit = await screen.findByRole('button', { name: 'Log In' });

		userEvent.type(username, 'sample');
		userEvent.type(password, 'sample');
		userEvent.click(submit);

		// Is logged in
		await screen.findByText('Iris Flower Dimensions');
		expect(localStorage.getItem('token')).toEqual(fakeUserResponse.key);
		userEvent.click(
			screen.getByRole('link', { name: 'Update Password' })
		);

		// On the update pw screen
		const new_pw1 = await screen.findByLabelText('Enter New Password *');
		const new_pw2 = await screen.findByLabelText('Enter Your Password Again *');
		const newSubmit = await screen.findByRole('button', { name: 'Submit New Password' });

		userEvent.type(new_pw1, 'new-sample-password');
		userEvent.type(new_pw2, 'new-sample-password');
		userEvent.click(newSubmit);
		await screen.findByText('Password successfully updated. Logging you out in three seconds.');

		act(() => jest.advanceTimersByTime(3000));

		// Back on login screen
		username = await screen.findByRole('textbox', { name: 'User Name' });
		password = await screen.findByLabelText('Password *');
		submit = await screen.findByRole('button', { name: 'Log In' });
		expect(localStorage.getItem('token')).toBeNull();

		userEvent.type(username, 'sample');
		userEvent.type(password, 'new-sample-password');
		userEvent.click(submit);

		// Back at it again with the logged in screen
		await screen.findByText('Iris Flower Dimensions');
		expect(localStorage.getItem('token')).toEqual(fakeUserResponse.key);
	});

	test('Registers a new user', async () => {
		jest.useFakeTimers();

		userEvent.click(
			screen.getByText(/register/)
		);

		await screen.findByRole('heading', { name: 'Register' });
		const username = await screen.findByRole('textbox', { name: 'User Name' });
		const password = await screen.findByLabelText('Password *');
		const submit = await screen.findByRole('button', { name: 'Register' });

		userEvent.type(username, 'sample');
		userEvent.type(password, 'new-sample-password');
		userEvent.click(submit);

		await screen.findByText('Success. Logging you in now.');
		act(() => jest.advanceTimersByTime(1000));

		await screen.findByText('Iris Flower Dimensions');
		expect(localStorage.getItem('token')).toEqual(fakeUserResponse.key);
	});
});
