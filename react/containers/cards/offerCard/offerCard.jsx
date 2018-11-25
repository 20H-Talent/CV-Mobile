import React from 'react';
// import components
import CardContainer from '../cardContainer/cardContainer.jsx';
import CardHeader from '../cardHeader/cardHeader.jsx';
import IconWithText from '../../icons/iconWithText.jsx';

const offerCard = props => {
  return (
    <CardContainer>
      <CardHeader>{props.title}</CardHeader>
      <p>{props.position}</p>
      <IconWithText icon={props.icon} text={props.iconText} />
    </CardContainer>
  );
};

export default offerCard;
