import React, { useEffect,
	useState 
}                          from 'react';
import Grid                from '@material-ui/core/Grid';
import Tab                 from '@material-ui/core/Tab';
import Tabs                from '@material-ui/core/Tabs';
import AppBar              from '@material-ui/core/AppBar';
import Navbar              from 'components/navbar';
import Message             from 'pages/forms/molecules/message';
import PendingForms        from 'pages/forms/molecules/pending';
import RejectForms         from 'pages/forms/molecules/reject';
import Approve             from 'pages/forms/molecules/approve';
import Approved            from 'pages/forms/molecules/approved';
import Notification        from 'pages/forms/molecules/notification';
import { socket }          from 'apis/socket';
import 'styles/forms.css';

const cssPrefix           = 'forms-'
const Component = (props) => {
	const [users, setUsers]             = useState ([]);
	const [forms, setForms]             = useState ([]);
	const [value, setValue]             = useState(0);
	const [currentUser, setCurrentUser] = useState ({});
	const [newForms, setNew]            = useState ([]);

	useEffect ( () => {
		socket.emit ( 'getAllUser');
		socket.on ('allUsers', (data) => { setUsers (data);});
		socket.on ('getAllForms', (data, notification) => { 
			setForms (data); 
			if (notification)
				setNew (prev => [...prev, notification]);
		});

		return () => {
			socket.emit ('disconnect');
		}
	}, []);

	useEffect(() => {
		if (Object.keys (currentUser).length) {
			socket.emit ( 'getAllForms', currentUser);
			socket.on ('groupUpdated', (notification) => { 
				socket.emit ('getAllForms', currentUser) 
				if (notification)
					setNew (prev => [...prev, notification]);
			});
		}
	}, [currentUser] )

	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	const renderTabs = () => {

		if (value === 0)
			return (<Message css = {cssPrefix} currentUser = {currentUser} users = {users} />);

		if (value === 1)
			return <PendingForms css = {cssPrefix}  currentUser =  {currentUser} forms = {forms} />

				if (value === 2) {
					return <RejectForms css = {cssPrefix}  currentUser =  {currentUser} forms = {forms} />
				}
		if (value === 3) {
			return <Approve css = {cssPrefix}  currentUser =  {currentUser} forms = {forms} />
		}
		if (value === 4) {
			return <Approved css = {cssPrefix}  currentUser =  {currentUser} forms = {forms} />
		}
	}

	const removeNewForm = ( _id) => {
		setNew (prev => {
			console.log('Previous', prev, _id);
			return prev.filter (form => {
				return (form._id !== _id)	
			})
		});
	};

	return (
		<Grid>
			<Navbar css = {'landing-nav-'} setUser = { (data) => { setCurrentUser (data) }}  />
			<Grid container justify = "center">
				<AppBar position="static">
					<Tabs value = {value} onChange = {handleTabChange} indicatorColor = "primary" >
						<Tab label="New Form"  />
						<Tab label="Pending Forms" />
						<Tab label="Rejected Forms" />
						<Tab label="Request for Approval" />
						<Tab label="Approved Forms" />
					</Tabs>
				</AppBar>
				<Grid item  xs = {8}>
					{renderTabs ()}
				</Grid>

				<Notification newForms = {newForms} handleClose = { (_id) => {removeNewForm (_id)}}/>
			</Grid>
		</Grid>
	);
};

export default Component;
