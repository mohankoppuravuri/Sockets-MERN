import React          from 'react';

const Component = (props) => {
	const { css, text } = props;

    return <p className={css + "heading-text"}>{ text }</p>;
};

export default Component;
