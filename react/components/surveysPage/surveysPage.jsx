import React, { Component } from 'react'
import Navbar from '../../containers/navbar/navbar.jsx'

class SurveysPage extends Component {
  constructor() {
    super();
    this.state = {
      surveys: []
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <h1>This is the surveys page i finally render</h1>
      </React.Fragment>
    )
  }
}

export default SurveysPage