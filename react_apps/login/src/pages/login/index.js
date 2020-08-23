import React , { Component } from 'react';
import Mainbody              from 'pages/login/body.js';

import 'styles/login.css';

class App extends Component {
	render() {
		const cssPrefix = "login-";

		return (
			<div className = { cssPrefix + 'root-container'}>
				<div className = { cssPrefix + 'form-container'}>
					<Mainbody css={cssPrefix} />
				</div>
			</div>
		);
	};

};

export default App;
