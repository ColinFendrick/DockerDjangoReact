import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Container,  CssBaseline, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { useAuthContext } from '../../hooks';

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	success: {
		color: theme.palette.success.main
	},
	error: {
		color: theme.palette.error.main
	}
}));

const Login = () => {
	const classes = useStyles();
	const [state, setState] = useState({
		username: '', password: ''
	});
	const { authState, login } = useAuthContext();
	const history = useHistory();

	useEffect(() => {
		if (authState.token !== null) {
			history.replace({ pathname: '/' });
		}
	}, [authState.token, history]);

	const handleChange = e =>
		setState({ ...state, [e.target.name]: e.target.value });

	const handleSubmit = e => {
		e.preventDefault();
		login(state);
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>

				{authState.message && !authState.error ? (
					<Typography variant='button' className={classes.success} gutterBottom>
						{authState.message}
					</Typography>
				) : authState.message && authState.error ? (
					<Typography variant='button' className={classes.error} gutterBottom>
						{authState.message}
					</Typography>
				) : null}

				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
          Log in
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='username'
						label='User Name'
						id='username'
						autoComplete='username'
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						onChange={handleChange}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
            Log In
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default Login;
