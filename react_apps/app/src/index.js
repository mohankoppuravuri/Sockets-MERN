import React                from 'react';
import ReactDOM             from 'react-dom';
import App                  from  'app.js';
import { StylesProvider }   from '@material-ui/core/styles';

ReactDOM.render(
		<StylesProvider injectFirst>
			<App/>
		</StylesProvider>,
	document.getElementById('root')
);
