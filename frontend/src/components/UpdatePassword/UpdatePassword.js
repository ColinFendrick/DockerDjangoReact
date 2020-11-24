
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

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
		backgroundColor: theme.palette.success.main
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

const UpdatePassword = () => {
	const classes = useStyles();
	const [state, setState] = useState({
		new_password1:'',
		new_password2: ''
	});
	const { updatePassword, authState } = useAuthContext();

	const handleChange = e =>
		setState({ ...state, [e.target.id]: e.target.value });

	const handleSubmit = async e => {
		e.preventDefault();
		if (state.new_password1 !== state.new_password2) {
			alert('Passwords don\'t match');
		} else {
			updatePassword(state);
		}
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
					<VpnKeyIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
          Update Password
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>

					{/* Hidden username field for accesbility */}
					<input type='text' name='username' value='' autoComplete='username' style={{ 'display': 'none' }} readOnly></input>
					{/*  */}

					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='new_password1'
						label='Enter New Password'
						type='password'
						id='new_password1'
						autoComplete='new-password'
						onChange={handleChange}
						error={state.new_password1 !== state.new_password2}
						helperText={state.new_password1 !== state.new_password2 ? 'Passwords don\'t match' : null}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='new_password2'
						label='Enter Your Password Again'
						type='password'
						id='new_password2'
						autoComplete='new-password'
						onChange={handleChange}
						error={state.new_password1 !== state.new_password2}
						helperText={state.new_password1 !== state.new_password2 ? 'Passwords don\'t match' : null}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
            Submit New Password
					</Button>
				</form>
			</div>
		</Container>
	);
};


export default UpdatePassword;
