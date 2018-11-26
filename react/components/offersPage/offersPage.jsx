import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from '../../containers/navbar/navbar.jsx'
import OffersList from '../../containers/offersList/offersList.jsx'
import OfferDisplay from '../../containers/offerDisplay/offerDisplay.jsx'
import OfferCreator from '../../containers/offerCreator/offerCreator.jsx'

const offersPage = () => (
  <BrowserRouter>
    <React.Fragment>
      <Route path="/html/offers.html" exact component={Navbar} />
      <Route path="/html/offers.html" exact component={OffersList} />
      <Route path="/html/offers.html/create" component={OfferCreator} />
      <Route path="/html/offers.html/offer/:id" component={OfferDisplay} />
    </React.Fragment>
  </BrowserRouter>
)

export default offersPage
