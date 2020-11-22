import { Switch, Route } from 'react-router-dom';

import { Home, Login } from './components';

const App = () => {
	return (
		<div>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/login' exact component={Login} />
			</Switch>
		</div>
	);
};

export default App;
