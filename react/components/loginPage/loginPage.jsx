import React, { Component } from 'react';
import { Grid, Row, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Navbar from '../../containers/navbar/navbar.jsx';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: ''
    };
  }

  handleLogIn(e) {
    e.preventDefault();

    fetch('https://cv-mobile-api.herokuapp.com/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email
      }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.token));
      })
      .then(() => window.location.replace('/index.html'))
      .catch(err => console.log(err));
  }

  handleInputChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    this.setState({ [inputName]: inputValue });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Grid>
          <Row>
            <Col xs={12} md={10}>
              <form onSubmit={this.handleLogIn.bind(this)}>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  name="username"
                  required
                  value={this.state.username}
                  onChange={this.handleInputChange.bind(this)}
                />
                <ControlLabel style={{ marginTop: '20px' }}>Email</ControlLabel>
                <FormControl
                  type="email"
                  name="email"
                  required
                  value={this.state.email}
                  onChange={this.handleInputChange.bind(this)}
                />
                <Button
                  type="submit"
                  bsStyle="primary"
                  style={{ marginTop: '30px' }}
                >
                  Log in
                </Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default LoginPage;
