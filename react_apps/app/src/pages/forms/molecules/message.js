import React, { useState }   from 'react';
import Paper                 from '@material-ui/core/Paper';
import Grid                  from '@material-ui/core/Grid';
import TextField             from '@material-ui/core/TextField';
import FormControl           from '@material-ui/core/FormControl';
import InputLabel            from '@material-ui/core/InputLabel';
import MenuItem              from '@material-ui/core/MenuItem';
import Select                from '@material-ui/core/Select';
import Button                from '@material-ui/core/Button';
import { socket }            from 'apis/socket';

const Table = (props) => {
	const { css, currentUser, users }          = props;
	const [submittedTo, setSubmittedTo]        = useState ('');
	const [group, setGroup]                    = useState ('');
	const [message, setMessage ]               = useState ('');
	const [disable, setDisable ]               = useState (false);

	const submitForm = () => {
		if (!message.trim || !submittedTo )
			return;

		let data = {
			message       :  message,
			status        : 'pending',
			submittedTo   : submittedTo,
			submittedBy   : currentUser.id,
			senderGroup   : currentUser.group,
			receiverGroup : group,
		} 
		socket.emit ('submitForm', data);
		setDisable (true);
	}

	socket.on   ('clearForm',  () => { setTimeout ( () => setDisable (false), 500); setGroup(''); setSubmittedTo(''); setMessage (''); });
	const handleText = (event) => {
		setMessage (event.target.value);
	}

	return (
		<Grid className = {css + 'messageContainer'}>
			<Grid className = {css + "messageTitle"} >
				Message Box
			</Grid>
			<Grid className = {css + 'message'}>
				<TextField value = {message} 
					onChange = { (event) => handleText (event)} 
					variant="outlined" 
					label = "message"
					fullWidth
				/>
			</Grid>
			<Grid container justify = "space-between" className = {css + "messageFooter"}>
				<Grid >
					<FormControl className = {css + "message-group"}>
						<InputLabel>Group</InputLabel>
						<Select
							value={group}
							onChange={ (value) => {setGroup (value.target.value)}}
						>
							{ users.filter ( user => { return (user.group !== currentUser.group) })
									.map ( (user,i) => { return (<MenuItem key = {i} value = {user.group}>{user.group}</MenuItem> )}
									)
							}
						</Select>
					</FormControl>
					{ group ?
						<FormControl className = {css + "message-submittedBy"}>
							<InputLabel id="demo-simple-select-label">Submitted To</InputLabel>
							<Select
								value={submittedTo}
								onChange={ (value) => { setSubmittedTo (value.target.value)}}
							>
								{ users.filter ( user => { return (group === user.group) })
										.map ( (user,i) => { return (<MenuItem key = {i} value = {user.id}>{user.id}</MenuItem> )}
										)
								}
							</Select>
						</FormControl> : null
					}
				</Grid>
				<Button className = {css + "messageSend"} 
					variant="contained" 
					color="primary" 
					disableElevation 
					disable = {disable.toString()}
					onClick = { () => submitForm ()}>
					Send
				</Button>
			</Grid>

		</Grid>
	);
}

export default Table;
