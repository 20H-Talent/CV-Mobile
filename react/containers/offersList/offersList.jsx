import React, { Component } from 'react'
import { Grid, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import OfferCard from '../cards/offerCard/offerCard.jsx'
import FloatingButton from '../floatingButton/floatingButton.jsx'
import Icon from '../icons/icon.jsx'

class OffersList extends Component {
  constructor() {
    super();
    this.state = {
      offers: [],
      loadError: false
    }
  }

  componentDidMount() {
    fetch('https://cv-mobile-api.herokuapp.com/api/offers')
      .then(res => res.json())
      .then(res => this.setState({ offers: res }))
      .catch(() => this.setState({ loadError: true }))
  }

  handleFloatingButton() {
    this.props.history.push('/html/offers.html/create');
  }

  render() {
    let offers = this.state.offers.map((offer, index) => (
      <Col xs={12} md={10} key={`offer-col-${index}`}>
        <Link to={`/html/offers.html/offer/${offer._id}`} style={{ color: '#000', textDecoration: 'none' }}>
          <OfferCard
            offer={offer}
            icons={['insert_invitation', 'location_on']}
            iconsText={[offer.contractType, offer.location]} />
        </Link>
      </Col>
    ))

    return (
      <React.Fragment>
        <Col xs={12} md={10}>
          <h3 style={{ marginLeft: '15px', marginBottom: '35px' }}>Open positions</h3>
        </Col>
        <Grid>
          {offers}
        </Grid>
        <FloatingButton onClick={this.handleFloatingButton.bind(this)}>
          <Icon icon="add" size="3.5rem" />
        </FloatingButton>
      </React.Fragment>
    )
  }
}

export default OffersList