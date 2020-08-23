import React           from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

import 'styles/loader.css';

const Component = (props) => {
	const { loading } = props;

	return (
		<div className = "loader-propagate">
			<PropagateLoader
				size={15}
				color={"var(--color-1)"}
				loading={loading}
			/>
		</div>
	);
}

export default Component;
