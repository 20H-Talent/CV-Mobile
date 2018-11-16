import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Col } from 'react-bootstrap';
// Custom components
import SummaryCard from '../../containers/cards/summaryCard/summaryCard.jsx';

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
		if (this.state.loadError) {
			return (
				<Col xs={12} md={10}>
					<h2>Sorry there was an error fetching the data</h2>
				</Col>
			);
		}
		return (
			<React.Fragment>
				<Grid>
					<Col xs={12} md={10}>
						<h3 style={{ marginBottom: '30px' }}>Reports</h3>
						{this.state.summaries.map((sum, index) =>
							sum.title ? (
								<Link
									to={{
										pathname: '/html/reports.html/chart',
										search: `?origin=${sum.origin}`
									}}
									key={`summary-${index}`}
								>
									<SummaryCard
										title={sum.title}
										icon="person"
										iconText={sum.totalAnswers}
									/>
								</Link>
							) : null
						)}
					</Col>
				</Grid>
			</React.Fragment>
		);
	}
}

export default Reports;
