import React from 'react';
// import components
import { Glyphicon } from 'react-bootstrap';
import CardContainer from '../cardContainer/cardContainer.jsx';
import CardHeader from '../cardHeader/cardHeader.jsx';
import IconWithText from '../../icons/iconWithText.jsx';

const summaryCard = props => {
	return (
		<CardContainer>
			<CardHeader>{props.title}</CardHeader>
			<IconWithText icon={props.icon} text={props.iconText} />
		</CardContainer>
	);
};

export default summaryCard;
