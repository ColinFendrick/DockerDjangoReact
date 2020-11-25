import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Container,  CssBaseline, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useAuthContext } from '../../hooks';
import { Message } from '..';
import { useFormStyles } from '../../styles';

const Register = () => {
	const classes = useFormStyles();
	const [state, setState] = useState({
		username: '', password: ''
	});
	const { authState, register } = useAuthContext();
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
		register(state);
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
          Register
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
						autoComplete='off'
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
						autoComplete='off'
						onChange={handleChange}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
            Register
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default Register;
