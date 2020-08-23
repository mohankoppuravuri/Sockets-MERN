import React   from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Table = (props) => {
	const { newForms, handleClose }          = props;
	if (!newForms.length)
		return null;
	console.log(newForms, 'newforms');
	return (
		<Snackbar
			open = {true}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			message={ (newForms[0].status !== 'pending') ? `Update: A new form is ${newForms[0].status} by ${newForms[0].submittedTo}` : `Update: A Form has been submitted by ${newForms[0].submittedBy}`}
			action={
				<React.Fragment>
					<IconButton
						aria-label="close"
						color="inherit"
						onClick={ () => handleClose (newForms[0]._id)}
					>
						<CloseIcon />
					</IconButton>
				</React.Fragment>
			}
		/>
	)
}

export default Table;
