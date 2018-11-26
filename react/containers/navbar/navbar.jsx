import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

let navStyle = {
	background: '#353a3f',
	minHeight: '56px'
};

const cvLinks = [
	'../index.html',
	'./profile.html',
	'./favourite.html',
	'./search.html',
	'./company.html',
	'./offers.html',
	'./surveys.html',
	'./reports.html',
	'#'
];
const cvTexts = [
	'Home',
	'My Profile',
	'Favourites',
	'Advanced Search',
	'Companies',
	'Job Offers',
	'Surveys',
	'Reports',
	'Log In'
];

const navItems = cvLinks.map((link, index) => {
	return (
		<NavItem eventKey={index + 1} href={link} key={'navitem-' + index}>
			{cvTexts[index]}
		</NavItem>
	);
});

const navbar = () => {
	return (
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
};

export default navbar;
