import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
// Custom components
import Navbar from '../containers/navbar/navbar.jsx';
import SummaryCard from '../containers/cards/summaryCard/summaryCard.jsx';

class Reports extends Component {
	constructor() {
		super();
		this.state = {
			summaries: [],
			loadError: false
		};
	}

	componentDidMount() {
		fetch('https://cv-mobile-api.herokuapp.com/api/summaries')
			.then(res => res.json())
			.then(res => this.setState({ summaries: res }))
			.catch(() => this.setState({ loadError: true }));
	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<Grid>
					<Col xs={12} md={10}>
						<h3 style={{ marginBottom: '30px' }}>Reports</h3>
						{this.state.summaries.map((sum, index) =>
							sum.title ? (
								<SummaryCard
									title={sum.title}
									icon="person"
									iconText={sum.totalAnswers}
									key={`summary-${index}`}
								/>
							) : null
						)}
					</Col>
				</Grid>
			</React.Fragment>
		);
	}
}

export default Reports;
