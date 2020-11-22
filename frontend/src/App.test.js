import { screen } from '@testing-library/react';

import { setup, render, withLayout, withRouter, withContext } from './setupTests';

import App from './App';

describe('Testing <App />', () => {
	setup(beforeEach)(
		() => render(withLayout, withContext, withRouter)(<App />)
	);

	test('Shows the home page', () => {
		expect(
			screen.getByText(/Home Page/)
		).toBeInTheDocument();
	});

	test('Has header and footer', () => {
		expect(
			screen.getByText(/Login/)
		).toBeInTheDocument();


		expect(
			screen.getByText(/Copyright/)
		).toBeInTheDocument();
	});
});
