import React                 from 'react';
import Grid                  from '@material-ui/core/Grid';

const Table = (props) => {
	const { css, currentUser, forms }          = props;

	const renderForms = () => {

		let pendingForms = forms.filter (form => {
			return (form.submittedBy === currentUser.id && form.status === 'rejected')
		});

		return (
			<Grid item className = {css + "pendingContainer"}>
				<Grid container direction = "row" className = {css + "pendingHeader"}> 
					<Grid item xs = {1}> S.NO:</Grid>
					<Grid item xs = {8}> Message</Grid>
					<Grid item xs = {3}> Submitted To</Grid>
				</Grid>
				{pendingForms.map ( (form, index) => {
					return (<Grid container direction = "row" className = {css + "pendingRow"}> 
						<Grid item xs = {1} className = {css + "pendingCell"}> {index}</Grid>
						<Grid item xs = {8} className = {css + "pendingCell"}> {form.message}</Grid>
						<Grid item xs = {3} className = {css + "pendingCell"}> {form.submittedTo}</Grid>
					</Grid>)
				})}
			</Grid>
		)
	}

	return (
		<Grid className = {css + 'messageContainer'}>
			<Grid className = {css + "messageTitle"} >
				You see all your rejected forms here..
			</Grid>
			<Grid className = {css + 'message'}>
				{renderForms()}
			</Grid>

		</Grid>
	);
}

export default Table;
