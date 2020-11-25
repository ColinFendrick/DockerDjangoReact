import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuthContext } from './hooks';
import { Home, Login, UpdatePassword, Register } from './components';

const PrivateRoute = ({ isAuthenticated, children, ...rest }) => (
	<Route
		{...rest}
		render={({ location }) => isAuthenticated ? (
			children
		) : (
			<Redirect
				to={{
					pathname: '/login/',
					state: { from: location }
				}}
			/>
		)}
	/>
);


const App = props => {
	const { checkForToken, authState } = useAuthContext();

	useEffect(() => checkForToken(),
		[authState.token] // eslint-disable-line
	);

	return (
		<div>
			<Switch>
				<Route path='/login' exact component={Login} />
				<Route path='/register' exact component={Register} />
				<PrivateRoute exact path='/' isAuthenticated={!!authState.token}>
					<Home {...props}/>
				</PrivateRoute>
				<PrivateRoute exact path='/update-password' isAuthenticated={!!authState.token}>
					<UpdatePassword {...props}/>
				</PrivateRoute>
			</Switch>
		</div>
	);
};

export default App;
