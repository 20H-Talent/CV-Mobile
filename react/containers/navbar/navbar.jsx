import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const navStyle = {
  background: '#353a3f',
  minHeight: '56px',
};

const cvLinks = [
  './my-profile.html',
  './favourite.html',
  './assessment.html',
  './search.html',
  './company.html',
  './offers.html',
  './surveys.html',
  './reports.html',
  './logout.html',
];
const cvTexts = [
  'My Profile',
  'Favourites',
  'Rate Users',
  'Advanced Search',
  'Companies',
  'Job Offers',
  'Surveys',
  'Reports',
  'Log out',
];

const navItems = cvLinks.map((link, index) => (
  <NavItem eventKey={index + 1} href={link} key={`navitem-${index}`}>
    {cvTexts[index]}
  </NavItem>
));

const navbar = () => (
  <Navbar inverse collapseOnSelect style={navStyle}>
    <Navbar.Header>
      <Navbar.Brand>
        <a
          href="../index.html"
          style={{ fontSize: '1.95rem', marginTop: '2px', color: '#fff' }}
        >
          CV App
        </a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse style={{ borderColor: 'transparent' }}>
      <Nav>{navItems}</Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default navbar;
