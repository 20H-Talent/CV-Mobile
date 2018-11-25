import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from '../../containers/navbar/navbar.jsx'
import OffersList from '../../containers/offersList/offersList.jsx'

const offersPage = () => (
  <BrowserRouter>
    <React.Fragment>
      <Route path="/html/offers.html" exact component={Navbar} />
      <Route path="/html/offers.html" exact component={OffersList} />
    </React.Fragment>
  </BrowserRouter>
)

export default offersPage
