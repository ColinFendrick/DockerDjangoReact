import { Switch, Route } from 'react-router-dom';

import { Home, Login } from './components';

const App = () => {
	return (
		<div>
      Basic Setup:
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/login' exact component={Login} />
			</Switch>
		</div>
	);
};

export default App;
