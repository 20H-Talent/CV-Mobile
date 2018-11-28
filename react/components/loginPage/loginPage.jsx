import React, { Component } from 'react';
import Navbar from '../../containers/navbar/navbar.jsx';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'oscarbb',
      email: 'oscarbb@mail.co'
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
        console.log(res);
        localStorage.setItem('token', JSON.stringify(res.token));
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <form onSubmit={this.handleLogIn.bind(this)}>
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="submit" value="Log in" />
        </form>
      </React.Fragment>
    );
  }
}

export default LoginPage;
