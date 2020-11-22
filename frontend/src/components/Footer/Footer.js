import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Footer = () =>(
	<Typography variant='body2' color='textSecondary' align='center'>
		{'Copyright © '}
		<Link color='inherit' href='https://material-ui.com/'>
      Iris Species Predictor
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	</Typography>
);

export default Footer;
