import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

let navStyle = {
	background: '#353a3f',
	minHeight: '56px'
};

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
				<Nav>
					<NavItem eventKey={1} href="../index.html">
						Home
					</NavItem>
					<NavItem eventKey={2} href="./profile.html">
						My Profile
					</NavItem>
					<NavItem eventKey={3} href="./search.html">
						Advanced Search
					</NavItem>
					<NavItem eventKey={4} href="./surveys.html">
						Surveys
					</NavItem>
					<NavItem eventKey={5} href="#" active>
						Reports
					</NavItem>
					<NavItem eventKey={6} href="#">
						Log In
					</NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default navbar;
