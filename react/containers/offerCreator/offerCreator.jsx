import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from '../icons/icon.jsx';

class OfferCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyEmail: '',
      company: '',
      title: '',
      contractType: 'Full-time',
      location: '',
      description: '',
      responsabilities: '',
      whatWeLookFor: [],
      whatWeOffer: [],
      validEmails: [],
      loadError: false,
      errorMessage: ''
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let getToken = new Promise((resolve, reject) => {
      const token = sessionStorage.getItem('token') || false;
      token !== false ? resolve(token) : reject();
    });

    getToken
      .then(token => this.sendFormData(JSON.parse(token)))
      .catch(() =>
        this.setState({
          loadError: true,
          errorMessage: 'You are not logged in'
        })
      );
  }

  sendFormData(token) {
    let {
      company,
      companyEmail,
      title,
      contractType,
      location,
      description,
      responsabilities,
      whatWeLookFor,
      whatWeOffer
    } = this.state;

    if (
      company &&
      companyEmail &&
      title &&
      contractType &&
      location &&
      description &&
      responsabilities &&
      whatWeLookFor &&
      whatWeOffer
    ) {
    }

    fetch('https://cv-mobile-api.herokuapp.com/api/offers', {
      method: 'POST',
      body: JSON.stringify({
        company,
        companyEmail,
        title,
        contractType,
        location,
        description,
        responsabilities,
        whatWeLookFor,
        whatWeOffer
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(() => {
        this.props.history.push('/html/offers.html');
      })
      .catch(err =>
        this.setState({ loadError: true, errorMessage: err.message })
      );
  }

  handleEmailValidation() {
    const validationMapping = [];
    if (this.state.companyEmail.length >= 1) {
      this.state.validEmails.forEach(email => {
        this.state.companyEmail === email
          ? validationMapping.push(true)
          : validationMapping.push(false);
      });

      if (validationMapping.includes(true)) {
        return 'success';
      } else {
        return 'error';
      }
    }
    return null;
  }

  handleInputChange(e) {
    const inputName = e.target.name;
    let {
      company,
      companyEmail,
      title,
      contractType,
      location,
      description,
      responsabilities
    } = this.state;
    this.setState({ [inputName]: e.target.value });
  }

  handleWhatWeLookFor(e) {
    const elIndex = e.target.name.split('.')[0];
    const elTarget = e.target.name.split('.')[1];

    const newState = this.state.whatWeLookFor.slice(0);
    newState[elIndex][elTarget] = e.target.value;
    this.setState({ whatWeLookFor: newState });
  }

  handleWhatWeOffer(e) {
    const elIndex = e.target.name.split('.')[0];
    const elTarget = e.target.name.split('.')[1];

    const newState = this.state.whatWeOffer.slice(0);
    newState[elIndex][elTarget] = e.target.value;
    this.setState({ whatWeOffer: newState });
  }

  addListItem(list) {
    const newList = this.state[list].slice(0);
    newList.push({ title: '', description: '' });
    this.setState({ [list]: newList });
  }
  removeListItem(list) {
    const newList = this.state[list].slice(0);
    newList.pop();
    this.setState({ [list]: newList });
  }

  componentDidMount() {
    fetch('https://cv-mobile-api.herokuapp.com/api/companies')
      .then(res => res.json())
      .then(res => {
        res.length < 1
          ? this.setState({
            loadError: true,
            errorMessage: 'Sorry there are no companies to add offers to.'
          })
          : this.setState({ validEmails: res.map(company => company.email) });
      })
      .catch(() =>
        this.setState({
          loadError: true,
          errorMessage: 'There was a connection error.'
        })
      );
  }

  render() {
    const labelStyle = {
      fontSize: '1.8rem',
      fontWeight: '500',
      fontFamily: 'Google Sans',
      marginBottom: '10px'
    };

    return (
      <Grid>
        <Row style={{ marginTop: '20px', marginBottom: '25px' }}>
          <Col xs={12} md={10}>
            <Link
              to="/html/offers.html"
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.5rem',
                color: '#333'
              }}
            >
              <Icon icon="arrow_back" size="2.5rem" />
              <span style={{ marginLeft: '15px' }}>Go Back</span>
            </Link>
          </Col>
        </Row>
        <Col xs={12} md={10}>
          <form onSubmit={this.handleFormSubmit.bind(this)}>
            <ControlLabel style={labelStyle}>Company name</ControlLabel>
            <FormControl
              type="text"
              name="company"
              required
              value={this.state.company}
              placeholder="Enter your company name"
              onChange={this.handleInputChange.bind(this)}
              style={{ marginBottom: '20px' }}
            />
            <FormGroup
              controlId="formCompanyEmail"
              validationState={this.handleEmailValidation()}
              style={{ marginBottom: '20px' }}
            >
              <ControlLabel style={labelStyle}>Company email</ControlLabel>
              <FormControl
                type="email"
                name="companyEmail"
                required
                value={this.state.companyEmail}
                placeholder="Enter your company email"
                onChange={this.handleInputChange.bind(this)}
              />
              <FormControl.Feedback />
              <HelpBlock>
                You must enter the email registered with your company profile.
              </HelpBlock>
            </FormGroup>
            <FormGroup style={{ marginBottom: '20px' }}>
              <ControlLabel style={labelStyle}>Title</ControlLabel>
              <FormControl
                type="text"
                name="title"
                required
                value={this.state.title}
                placeholder="Ej. Frontend Developer"
                onChange={this.handleInputChange.bind(this)}
              />
            </FormGroup>
            <FormGroup style={{ marginBottom: '20px' }}>
              <ControlLabel style={labelStyle}>Contract</ControlLabel>
              <FormControl
                componentClass="select"
                name="contractType"
                value={this.state.contractType}
                onChange={this.handleInputChange.bind(this)}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
              </FormControl>
            </FormGroup>
            <FormGroup style={{ marginBottom: '20px' }}>
              <ControlLabel style={labelStyle}>Location</ControlLabel>
              <FormControl
                type="text"
                name="location"
                required
                value={this.state.location}
                placeholder="Ej. Madrid"
                onChange={this.handleInputChange.bind(this)}
              />
            </FormGroup>
            <FormGroup style={{ marginBottom: '20px' }}>
              <ControlLabel style={labelStyle}>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                name="description"
                required
                value={this.state.description}
                onChange={this.handleInputChange.bind(this)}
              />
              <HelpBlock>Enter a brief description of your company.</HelpBlock>
            </FormGroup>
            <FormGroup style={{ marginBottom: '20px' }}>
              <ControlLabel style={labelStyle}>Responsabilities</ControlLabel>
              <FormControl
                componentClass="textarea"
                name="responsabilities"
                required
                value={this.state.responsabilities}
                onChange={this.handleInputChange.bind(this)}
              />
              <HelpBlock>Enter a brief description of the job goal.</HelpBlock>
            </FormGroup>
            <FormGroup style={{ marginBottom: '20px' }}>
              <ControlLabel
                style={{
                  marginBottom: '20px',
                  display: 'block',
                  fontSize: '1.8rem',
                  fontWeight: '500',
                  fontFamily: 'Google Sans'
                }}
              >
                What We Look For
              </ControlLabel>
              {this.state.whatWeLookFor.map((item, index) => (
                <React.Fragment key={`whatWeLook-input-${index}`}>
                  <ControlLabel>Skill</ControlLabel>
                  <FormControl
                    type="text"
                    name={`${index}.title`}
                    value={this.state.whatWeLookFor[index].title}
                    onChange={this.handleWhatWeLookFor.bind(this)}
                    style={{ marginBottom: '15px' }}
                  />
                  <ControlLabel>Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name={`${index}.description`}
                    value={this.state.whatWeLookFor[index].description}
                    onChange={this.handleWhatWeLookFor.bind(this)}
                    style={{ marginBottom: '15px' }}
                  />
                </React.Fragment>
              ))}
              <Button
                bsStyle="success"
                onClick={() => this.addListItem('whatWeLookFor')}
                style={{ marginRight: '20px' }}
              >
                Add
              </Button>
              <Button
                bsStyle="danger"
                onClick={() => this.removeListItem('whatWeLookFor')}
              >
                Remove
              </Button>
            </FormGroup>
            <FormGroup style={{ marginBottom: '20px' }}>
              <ControlLabel
                style={{
                  marginBottom: '20px',
                  display: 'block',
                  fontSize: '1.8rem',
                  fontWeight: '500',
                  fontFamily: 'Google Sans'
                }}
              >
                What We Offer
              </ControlLabel>
              {this.state.whatWeOffer.map((item, index) => (
                <React.Fragment key={`whatWeOffer-input-${index}`}>
                  <ControlLabel>Benefit</ControlLabel>
                  <FormControl
                    type="text"
                    name={`${index}.title`}
                    value={this.state.whatWeOffer[index].title}
                    onChange={this.handleWhatWeOffer.bind(this)}
                    style={{ marginBottom: '15px' }}
                  />
                  <ControlLabel>Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name={`${index}.description`}
                    value={this.state.whatWeOffer[index].description}
                    onChange={this.handleWhatWeOffer.bind(this)}
                    style={{ marginBottom: '15px' }}
                  />
                </React.Fragment>
              ))}
              <Button
                bsStyle="success"
                onClick={() => this.addListItem('whatWeOffer')}
                style={{ marginRight: '20px' }}
              >
                Add
              </Button>
              <Button
                bsStyle="danger"
                onClick={() => this.removeListItem('whatWeOffer')}
              >
                Remove
              </Button>
            </FormGroup>
            <Button
              type="submit"
              bsStyle="primary"
              style={{ margin: '35px 0' }}
            >
              Submit
            </Button>
          </form>
        </Col>
      </Grid>
    );
  }
}

export default OfferCreator;
