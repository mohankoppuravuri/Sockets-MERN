import React                 from 'react';
import Grid                  from '@material-ui/core/Grid';
import { socket }            from 'apis/socket';

const Table = (props) => {
	const { css, currentUser, forms }  = props;

	const renderForms = () =>{

		let approveForms = forms.filter (form => {
			if (form.status !== 'pending')
				return false;
			return (form.receiverGroup === currentUser.group)
		});
		return (
			<Grid item className = {css + "pendingContainer"}>
				<Grid container direction = "row" className = {css + "pendingHeader"}> 
					<Grid item xs = {1}> S.NO:</Grid>
					<Grid item xs = {5}> Message</Grid>
					<Grid item xs = {3}> Submitted By</Grid>
				</Grid>
				{approveForms.map ( (form, index) => {
					return (<Grid key = {index} container direction = "row" className = {css + "pendingRow"}> 
						<Grid item xs = {1} className = {css + "pendingCell"}> {index}</Grid>
						<Grid item xs = {5} className = {css + "pendingCell"}> {form.message}</Grid>
						<Grid item xs = {3} className = {css + "pendingCell"}> {form.submittedBy}</Grid>
						{ (form.submittedTo === currentUser.id) ? (<>
						<Grid item xs = {1} className = {css + "pendingCell"} onClick = { () => socket.emit ('approve', form)}> Approve </Grid>
						<Grid item xs = {1} className = {css + "pendingCell"} onClick = { () => socket.emit ('reject', form)}> reject </Grid>
							</>) : null
						}
					</Grid>)
				})}
			</Grid>
		)
	}
	return (
		<Grid className = {css + 'messageContainer'}>
			<Grid className = {css + "messageTitle"} >
				All Forms which are submitted by you and are pending.
			</Grid>
			<Grid className = {css + 'message'}>
				{renderForms()}
			</Grid>

		</Grid>
	);
}

export default Table;
