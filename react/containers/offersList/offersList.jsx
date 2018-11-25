import React, { Component } from 'react'
import { Grid, Col } from 'react-bootstrap'
import OfferCard from '../cards/offerCard/offerCard.jsx'

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

  render() {
    let offers = this.state.offers.map((offer, index) => (
      <Col xs={12} md={10} key={`offer-col-${index}`}><OfferCard title={offer.title} position={offer.position} icon={'person'} iconText={offer.vacancies} /></Col>
    ))

    return (
      <React.Fragment>
        <Col xs={12} md={10}>
          <h3 style={{ marginLeft: '15px', marginBottom: '35px' }}>This are the offers</h3>
        </Col>
        <Grid>
          {offers}
        </Grid>
      </React.Fragment>
    )
  }
}

export default OffersList