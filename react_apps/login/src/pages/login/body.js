import React,{ useState}    from 'react';
import Grid                 from '@material-ui/core/Grid';
import Button               from '@material-ui/core/Button';
import TextField            from '@material-ui/core/TextField';
import Heading              from 'pages/login/heading';
import { login }            from 'apis/login';


const Mainbody = (props) => {
	const { css } = props;

	const [username, setUser]       = useState('');
	const [password, setPassword]   = useState('');
	const [invalid, setInvalid]     = useState(false);


	const handleUser = (event) => {
		event.preventDefault();
		setUser(event.target.value);
		setInvalid(false);
	};

	const handlePassword = (event) => {
		event.preventDefault();
		setPassword(event.target.value);
		setInvalid(false);
	};

	const handleForm = async(event) => {
		event.preventDefault();

		let res = await login(username,password);
		
		const { data , success } = res;

		if( data === 'wrong credentials' && success === true ) {
			setInvalid(true);
		}
		else if ( success === false ) {
			console.log(data)
		}
	};

	return(
		<Grid container>
			<Grid item xs={12}  className = { css + 'form'}>
				<Heading css={css} text="Login with User ID & Password:"/>
				<form onSubmit={handleForm} method='post'>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						value={username}
						onChange={handleUser}
						id="username"
						placeholder = "Username"
						name="username"
						autoComplete="username"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						value={password}
						onChange={handlePassword}
						name="password"
						placeholder = "Password"
						type="password"
						id="password"
					/>
					{invalid ? <p className={css + 'invalid-text'}>Wrong Credentials</p> : null}
					<div className={css + "btn-area"}>
						<Button type="submit" variant="contained" color="primary" >Submit</Button>
					</div>
				</form>
			</Grid>
		</Grid>
	);
};

export default Mainbody;
