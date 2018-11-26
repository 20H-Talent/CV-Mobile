import React, { Component } from 'react'
import { Grid, Row, Col, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import OfferTitle from './offerTitle/offerTitle.jsx'
import OfferSubtitle from './offerSubtitle/offerSubtitle.jsx'
import OfferParagraph from './offerParagraph/offerParagraph.jsx'
import UnorderedList from './unorderedList/unorderedList.jsx'
import IconWithText from '../icons/iconWithText.jsx'
import Icon from '../icons/icon.jsx'


class OfferDisplay extends Component {
  constructor() {
    super();
    this.state = {
      offerData: {},
      loadError: false,
      showAlert: false
    }
  }

  handleAlertDismiss() {
    this.setState({ showAlert: false });
  }

  handleApplyButton() {
    this.setState({ showAlert: true });
    setTimeout(() => {
      this.handleAlertDismiss()
    }, 3000);
  }

  componentDidMount() {
    fetch(`https://cv-mobile-api.herokuapp.com/api/offers/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => this.setState({ offerData: res }))
      .catch(() => this.setState({ loadError: true }));
  }

  render() {
    return (
      <Grid>
        <Row style={{ padding: '0 5%' }}>
          {this.state.showAlert ? (
            <Alert
              bsStyle="success"
              onDismiss={this.handleAlertDismiss.bind(this)}
              style={{ position: 'fixed', top: '5%', zIndex: '9', width: '90%', fontSize: '1.6rem' }}
            >
              Good luck! Soon you will be contacted by the company.
            </Alert>
          ) : null}
        </Row>
        <Row style={{ marginTop: '20px', marginBottom: '25px' }}>
          <Col xs={12} md={10}>
            <Link to="/html/offers.html" style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', color: '#333' }}>
              <Icon icon="arrow_back" size="2.5rem" />
              <span style={{ marginLeft: '15px' }}>Go Back</span>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={10}>
            <OfferTitle>{this.state.offerData.title}</OfferTitle>
            <OfferSubtitle>{this.state.offerData.company}</OfferSubtitle>
          </Col>
        </Row>
        <Row style={{ marginBottom: '30px' }}>
          <Col xs={12} md={10}>
            <div style={{ display: 'flex' }}>
              <IconWithText icon={'insert_invitation'} text={this.state.offerData.contractType} />
              <div style={{ marginLeft: '50px' }} ></div>
              <IconWithText icon={'location_on'} text={this.state.offerData.location} />
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: '30px' }} >
          <Col xs={12} md={10}>
            <OfferSubtitle style={{ marginBottom: '20px', color: '#000' }} >Description:</OfferSubtitle>
            <OfferParagraph>{this.state.offerData.description}</OfferParagraph>
          </Col>
        </Row>
        <Row style={{ marginBottom: '30px' }} >
          <Col xs={12} md={10}>
            <OfferSubtitle style={{ marginBottom: '20px', color: '#000' }} >Responsabilities:</OfferSubtitle>
            <OfferParagraph>{this.state.offerData.responsabilities}</OfferParagraph>
          </Col>
        </Row>
        <Row style={{ marginBottom: '30px' }}>
          <Col xs={12} md={10}>
            <OfferSubtitle style={{ marginBottom: '25px', color: '#000' }} >What we look for:</OfferSubtitle>
            <UnorderedList list={this.state.offerData.whatWeLookFor} />
          </Col>
        </Row>
        <Row style={{ marginBottom: '30px' }}>
          <Col xs={12} md={10}>
            <OfferSubtitle style={{ marginBottom: '25px', color: '#000' }} >What we offer:</OfferSubtitle>
            <UnorderedList list={this.state.offerData.whatWeOffer} />
          </Col>
        </Row>
        <Row style={{ margin: '25px 0', textAlign: 'center' }}>
          <Col xs={12} md={10}>
            <Button bsStyle="success" onClick={this.handleApplyButton.bind(this)}>Apply position</Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default OfferDisplay