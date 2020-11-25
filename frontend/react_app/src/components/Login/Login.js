import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Avatar, Button, Container,  CssBaseline, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useAuthContext } from '../../hooks';
import { Message } from '..';
import { useFormStyles } from '../../styles';

const Login = () => {
	const classes = useFormStyles();
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

				<Message message={authState.message} error={!!authState.error} />

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
				<Typography>
					<Link to='/register' className='unstyled-link'>
						If you need to register, click here
					</Link>
				</Typography>
			</div>
		</Container>
	);
};

export default Login;
