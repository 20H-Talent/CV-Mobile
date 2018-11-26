import React from 'react';
// import components
import CardContainer from '../cardContainer/cardContainer.jsx';
import CardHeader from '../cardHeader/cardHeader.jsx';
import CardSubheader from '../cardSubheader/cardSubheader.jsx';
import IconWithText from '../../icons/iconWithText.jsx';

const spanStyle = {
  fontSize: '1.6rem',
  fontWeight: 'bold'
}

const offerCard = props => {
  return (
    <CardContainer>
      <CardHeader>{props.offer.title}</CardHeader>
      <CardSubheader>{props.offer.company}</CardSubheader>
      <div style={{ display: 'flex', marginTop: '30px' }}>
        <IconWithText icon={props.icons[0]} text={props.iconsText[0]} />
        <div style={{ marginLeft: '50px' }} ></div>
        <IconWithText icon={props.icons[1]} text={props.iconsText[1]} />
      </div>
    </CardContainer>
  );
};

export default offerCard;
