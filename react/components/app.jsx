import React, { Component } from 'react';
import Navbar from '../containers/navbar/navbar.jsx';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Navbar />
				<h1>hello welcome</h1>
			</React.Fragment>
		);
	}
}

export default App;
