import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Reports from '../reports/reports.jsx';
import Navbar from '../../containers/navbar/navbar.jsx';
import ChartsPage from '../chartsPage/chartsPage.jsx';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<Route path="/html/reports.html" exact component={Navbar} />
					<Route path="/html/reports.html" exact component={Reports} />
					<Route path="/html/reports.html/chart" component={ChartsPage} />
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
