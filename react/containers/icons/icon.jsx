import React from 'react';

const Icon = props => {
	return <i className="material-icons" style={{ fontSize: props.size }}>{props.icon}</i>;
};

export default Icon;
