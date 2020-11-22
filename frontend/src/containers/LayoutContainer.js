import CssBaseline from '@material-ui/core/CssBaseline';

import { Header, Footer } from '../components/';

const LayoutContainer = props => (
	<>
		<CssBaseline />
		<Header {...props} />
		<div>
			{props.children}
		</div>
		<Footer />
	</>
);

export default LayoutContainer;
