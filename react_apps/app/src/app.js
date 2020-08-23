import React                    from 'react';
import { BrowserRouter, 
	Route }                     from 'react-router-dom';
import Form                     from 'pages/forms/index';

import 'fonts/CelloSans/style.css';
import 'styles/parent.css';
import 'styles/material-ui-overrides.css';

const App = () => {
	return (
		<BrowserRouter>
			<Route path = '/app'   component = { Form } exact />
		</BrowserRouter>
		);
};

export default App;
