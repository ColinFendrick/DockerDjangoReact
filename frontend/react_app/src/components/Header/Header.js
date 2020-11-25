import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useAuthContext } from '../../hooks';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

const Header = () => {
	const classes = useStyles();
	const { authState, logout } = useAuthContext();

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						<Link to='/' className='unstyled-link'>
							Iris Species Predictor
						</Link>
					</Typography>
					{authState.token ? <Button color='inherit'>
						<Link to='/update-password' className='unstyled-link'>
							Update Password
						</Link>
					</Button> : null}
					{authState.token ? <Button color='inherit' onClick={logout}>Logout</Button> : null}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
