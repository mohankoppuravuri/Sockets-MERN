import React, { useState, useEffect } from 'react';
import Grid                           from '@material-ui/core/Grid';
import Logout                         from '@material-ui/icons/PowerSettingsNewRounded';
import { redirectTo }                 from 'utils/utility';
import { getUserName }                from '../apis/navbar';

import 'styles/navbar.css';

const Navbar = (props) => {

	const [ color, setColor ]        = useState ('error');
	const [ username,setUserName ]   = useState (''); 

	const loadData = async () => {
		try {
			let name = await getUserName();
			props.setUser (name);
			setUserName( `${name.id} ${name.group}` );
		}
		catch(err) {
			console.log(err);
		}
	}
	useEffect (() => {
		loadData();
	},[])

	const handleClick = async () => {
		redirectTo ('/logout');
	}

	return(
		<Grid container className = 'navbar-body' justify = 'center'>
			<Grid xs = { 11 } item >
				<Grid container align = 'right'>
					<Grid md = { 10 } item>
						<span className = "navbar-username"> { username } </span>
					</Grid>
					<Grid md = { 2 } item>
						<p className = "navbar-btn-logout">
							<Logout 
								color        = { color } 
								fontSize     = 'large'
								onClick      = { handleClick }
								onMouseEnter = { () => setColor ( 'action' ) } 
								onMouseLeave = { () => setColor ( 'error' ) }
							/>
						</p>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Navbar;
