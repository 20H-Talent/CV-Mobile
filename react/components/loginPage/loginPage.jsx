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
} from 'react-bootstrap';
import Navbar from '../../containers/navbar/navbar.jsx';
import OfferTitle from '../../containers/offerDisplay/offerTitle/offerTitle.jsx';
import OfferParagrahp from '../../containers/offerDisplay/offerParagraph/offerParagraph.jsx';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginType: '',
      username: '',
      email: '',
      password: '',
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
        console.log(res);
        sessionStorage.setItem('token', JSON.stringify(res.token));
        sessionStorage.setItem('id', JSON.stringify(res.id));
        sessionStorage.setItem('profile', JSON.stringify(res.profile));
      })
      .then(() => window.location.replace('/index.html'))
      .catch(err => console.log(err));
  }

  handleInputChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState({ [inputName]: inputValue });
  }

  checkDynamicInput() {
    let dynamicInput = '';

    const { loginType, username, password } = this.state;

    if (loginType === 'user') {
      dynamicInput = (
        <React.Fragment>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            name="username"
            required
            value={username}
            onChange={this.handleInputChange}
          />
        </React.Fragment>
      );
    } else if (loginType === 'company') {
      dynamicInput = (
        <React.Fragment>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="text"
            name="password"
            required
            value={password}
            onChange={this.handleInputChange}
          />
        </React.Fragment>
      );
    }

    return dynamicInput;
  }

  render() {
    const { email } = this.state;
    return (
      <React.Fragment>
        <Navbar />
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
                <FormGroup>
                  <ControlLabel style={{ marginTop: '20px' }}>
                    What's your type of profile?
                  </ControlLabel>
                  <Radio
                    name="loginType"
                    value="user"
                    required
                    onClick={this.handleInputChange}
                  >
                    User
                  </Radio>
                  <Radio
                    name="loginType"
                    value="company"
                    onClick={this.handleInputChange}
                  >
                    Company
                  </Radio>
                </FormGroup>
                <ControlLabel style={{ marginTop: '20px' }}>Email</ControlLabel>
                <FormControl
                  type="email"
                  name="email"
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
                    Don't have an account?
                    <a href="/html/adduser.html">Sign up</a>
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
