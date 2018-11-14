import React from 'react';
import styled from 'styled-components';

const cardContainer = styled.div`
	padding: 20px;
	padding-bottom: 10px;
	margin-bottom: 20px;
	border-radius: 5px;
	box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);
	:active {
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
		transform: scale(0.975);
	}
`;

export default cardContainer;
