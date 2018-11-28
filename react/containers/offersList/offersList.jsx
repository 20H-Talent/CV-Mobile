import React, { Component } from 'react';
import { Grid, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OfferCard from '../cards/offerCard/offerCard.jsx';
import FloatingButton from '../floatingButton/floatingButton.jsx';
import Icon from '../icons/icon.jsx';

class OffersList extends Component {
  constructor() {
    super();
    this.state = {
      offers: [],
      loadError: false,
      errorMessage: ''
    };
  }

  componentDidMount() {
    let getToken = new Promise((resolve, reject) => {
      const token = localStorage.getItem('token') || false;
      token !== false ? resolve(token) : reject();
    });

    getToken
      .then(token => this.getOffersFromAPI(JSON.parse(token)))
      .catch(() =>
        this.setState({
          loadError: true,
          errorMessage: 'You are not logged in'
        })
      );
  }

  getOffersFromAPI(token) {
    if (localStorage.getItem('token')) {
      fetch('https://cv-mobile-api.herokuapp.com/api/offers', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(res => {
          if (!res.message) {
            this.setState({ offers: res });
          } else {
            this.setState({ loadError: true, errorMessage: res.message });
          }
        })
        .catch(() => this.setState({ loadError: true }));
    }
  }

  handleFloatingButton() {
    this.props.history.push('/html/offers.html/create');
  }

  render() {
    let offers = this.state.offers.map((offer, index) => (
      <Col xs={12} md={10} key={`offer-col-${index}`}>
        <Link
          to={`/html/offers.html/offer/${offer._id}`}
          style={{ color: '#000', textDecoration: 'none' }}
        >
          <OfferCard
            offer={offer}
            icons={['insert_invitation', 'location_on']}
            iconsText={[offer.contractType, offer.location]}
          />
        </Link>
      </Col>
    ));

    if (this.state.loadError) {
      return (
        <React.Fragment>
          <Alert bsStyle="danger">{this.state.errorMessage}</Alert>
          <a href="/html/login.html">Log In</a>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Col xs={12} md={10}>
          <h3 style={{ marginLeft: '15px', marginBottom: '35px' }}>
            Open positions
          </h3>
        </Col>
        <Grid>{this.state.offers ? offers : null}</Grid>
        <FloatingButton onClick={this.handleFloatingButton.bind(this)}>
          <Icon icon="add" size="3.5rem" />
        </FloatingButton>
      </React.Fragment>
    );
  }
}

export default OffersList;
