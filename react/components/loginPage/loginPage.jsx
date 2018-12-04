import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Radio,
  Alert,
} from 'react-bootstrap';
import Navbar from '../../containers/navbar/navbar.jsx';
import OfferTitle from '../../containers/offerDisplay/offerTitle/offerTitle.jsx';
import OfferParagrahp from '../../containers/offerDisplay/offerParagraph/offerParagraph.jsx';

const labelStyle = {
  marginTop: '20px',
  marginBottom: '10px',
  fontSize: '1.6rem',
  fontFamily: 'Google Sans',
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginType: '',
      username: '',
      email: '',
      password: '',
      loadError: false,
      errorMessage: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleLogIn(e) {
    e.preventDefault();
    const {
      loginType, username, email, password,
    } = this.state;
    let loginData = {};

    if (loginType === 'user') {
      loginData = {
        username,
        email,
        type: loginType,
      };
    } else if (loginType === 'company') {
      loginData = {
        email,
        password,
        type: loginType,
      };
    }

    fetch('https://cv-mobile-api.herokuapp.com/api/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
      .then(res => res.json())
      .then((res) => {
        if (res.message !== 'username or email not valid') {
          sessionStorage.setItem('token', JSON.stringify(res.token));
          sessionStorage.setItem('id', JSON.stringify(res.id));
          sessionStorage.setItem('profile', JSON.stringify(res.profile));
          window.location.replace('/index.html');
        } else {
          this.renderErrorMessage(res.message).bind(this);
        }
      });
  }

  handleInputChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState({ [inputName]: inputValue });
  }

  checkDynamicInput() {
    let dynamicInput = '';

    const { loginType, username, password } = this.state;

    switch (loginType) {
    case 'user':
      dynamicInput = (
        <React.Fragment>
          <ControlLabel style={labelStyle}>Password</ControlLabel>
          <FormControl
            type="password"
            name="username"
            placeholder="Enter your username"
            required
            value={username}
            onChange={this.handleInputChange}
          />
        </React.Fragment>
      );
      break;
    case 'company':
      dynamicInput = (
        <React.Fragment>
          <ControlLabel style={labelStyle}>Password</ControlLabel>
          <FormControl
            type="password"
            name="password"
            placeholder="Enter your docNumber"
            required
            value={password}
            onChange={this.handleInputChange}
          />
        </React.Fragment>
      );
      break;
    default:
      dynamicInput = (
        <React.Fragment>
          <ControlLabel style={labelStyle}>Password</ControlLabel>
          <FormControl
            type="password"
            required
            value={username}
            onChange={this.handleInputChange}
          />
        </React.Fragment>
      );
      break;
    }

    return dynamicInput;
  }

  renderErrorMessage(msg) {
    this.setState({ loadError: true, errorMessage: msg });
    setTimeout(() => {
      this.setState({ loadError: false, errorMessage: '' });
    }, 5000);
  }

  render() {
    const { email, errorMessage, loadError } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <Col xs={12} md={10}>
          {loadError ? <Alert bsStyle="danger">{errorMessage}</Alert> : null}
        </Col>
        <Grid>
          <Row style={{ marginBottom: '40px' }}>
            <Col xs={12} md={10}>
              <OfferTitle>Welcome to 20H CV App</OfferTitle>
              <OfferParagrahp>
                Please login to start using the app
              </OfferParagrahp>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={10}>
              <form onSubmit={this.handleLogIn.bind(this)}>
                <FormGroup style={{ margin: 0 }}>
                  <ControlLabel style={labelStyle}>Choose your profile type</ControlLabel>
                  <div>
                    <Radio
                      name="loginType"
                      value="user"
                      required
                      inline
                      onClick={this.handleInputChange}
                      style={{ fontSize: '1.6rem', marginRight: '15px' }}
                    >
                      User
                    </Radio>
                    <Radio
                      name="loginType"
                      value="company"
                      inline
                      onClick={this.handleInputChange}
                      style={{ fontSize: '1.6rem' }}
                    >
                      Company
                    </Radio>
                  </div>
                </FormGroup>
                <ControlLabel style={labelStyle}>Email</ControlLabel>
                <FormControl
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={this.handleInputChange}
                />
                {this.checkDynamicInput()}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '40px',
                  }}
                >
                  <Button
                    type="submit"
                    bsStyle="primary"
                    style={{ marginRight: '30px' }}
                  >
                    Log in
                  </Button>
                  <OfferParagrahp style={{ margin: 0 }}>
                    Don&#39;t have an account?&#32;
                    <a href="/html/adduser.html">&#32;Sign up</a>
                  </OfferParagrahp>
                </div>
              </form>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default LoginPage;
