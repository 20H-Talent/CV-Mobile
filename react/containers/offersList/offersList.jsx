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
      errorMessage: '',
      profileType: '',
    };
    this.handleFloatingButton = this.handleFloatingButton.bind(this);
  }

  componentDidMount() {
    const getToken = new Promise((resolve, reject) => {
      const token = sessionStorage.getItem('token') || false;
      if (token && token !== 'undefined') {
        const profileType = sessionStorage.getItem('profile');
        this.setState({ profileType: JSON.parse(profileType) });
        resolve(token);
      }
      reject();
    });

    getToken
      .then(token => this.getOffersFromAPI(JSON.parse(token)))
      .catch(() => this.setState({
        loadError: true,
        errorMessage: 'You are not logged in',
      }));
  }

  getOffersFromAPI(token) {
    fetch('https://cv-mobile-api.herokuapp.com/api/offers', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (!res.message) {
          this.setState({ offers: res });
        } else {
          this.setState({ loadError: true, errorMessage: res.message });
        }
      })
      .catch(() => this.setState({ loadError: true }));
  }

  handleFloatingButton() {
    this.props.history.push('/html/offers.html/create');
  }

  renderOffers() {
    let jsxOffers = '';
    const { offers } = this.state;

    if (offers.length > 0) {
      jsxOffers = offers.map((offer, i) => (
        <Col xs={12} md={10} key={`offer-col-${i}`}>
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
    }
    return jsxOffers;
  }

  renderFloatingButton() {
    const { profileType } = this.state;
    let floating = '';
    if (profileType === 'company') {
      floating = (
        <FloatingButton onClick={this.handleFloatingButton}>
          <Icon icon="add" size="3.5rem" />
        </FloatingButton>
      );
    }
    return floating;
  }

  render() {
    const { loadError, errorMessage } = this.state;

    if (loadError) {
      return (
        <React.Fragment>
          <Alert bsStyle="danger">{errorMessage}</Alert>
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
        <Grid>{this.renderOffers()}</Grid>
        {this.renderFloatingButton()}
      </React.Fragment>
    );
  }
}

export default OffersList;
