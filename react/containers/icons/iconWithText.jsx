import React from 'react';

const pStyle = {
	margin: 0,
	display: 'flex',
	alignItems: 'center'
};

const iconWithText = props => {
	return (
		<p style={pStyle}>
			<i className="material-icons" style={{ marginRight: '10px' }}>
				{props.icon}
			</i>
			{props.text}
		</p>
	);
};

export default iconWithText;
