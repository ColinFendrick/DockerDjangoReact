import { Typography } from '@material-ui/core';

import { useBaseStyles } from '../../styles';

const Message = ({ message, error }) => {
	const classes = useBaseStyles();

	return <>
		{message && !error ? (
			<Typography variant='button' className={classes.success} gutterBottom>
				{message}
			</Typography>
		) : message && error ? (
			<Typography variant='button' className={classes.error} gutterBottom>
				{message}
			</Typography>
		) : null}
	</>;
};

export default Message;
