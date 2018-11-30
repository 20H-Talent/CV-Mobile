import React from 'react'
import ListItem from './listItem.jsx'

const unorderedList = props => {
  const listItems = props.list ? props.list.map((item, index) => (
    <ListItem key={`list-item-${index}`}>
      <span style={{ fontWeight: 'bold' }}>{item.title} </span>
      {item.description}
    </ListItem>
  )) : null;

  return (
    <ul style={{ padding: '0 15px' }}>
      {listItems}
    </ul>
  );
}

export default unorderedList;