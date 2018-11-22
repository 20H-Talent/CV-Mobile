import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Row, Col } from 'react-bootstrap';
// Custom components
import Icon from '../../containers/icons/icon.jsx';

class ChartsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			graphData: [],
			graphOrigin: this.props.location.search.split('=')[1],
			loadError: false
		};
	}

	componentDidMount() {
		fetch('https://cv-mobile-api.herokuapp.com/api/summaries')
			.then(res => res.json())
			.then(res =>
				res.forEach(r =>
					r.origin === this.state.graphOrigin
						? this.convertToGraphData(r)
						: null
				)
			)
			.catch(() => this.setState({ loadError: true }));
	}

	getRandomColor() {
		let H = Math.floor(Math.random() * 360);

		return `hsl(${H}, 60%, 70%)`;
	}

	convertToGraphData(data) {
		let newData = [];
		data.answers.forEach(ans => {
			let ansData = {};
			ansData.labels = ans.options.map(option => option.value);
			ansData.datasets = [
				{
					label: ans.question,
					data: ans.options.map(option => option.count),
					backgroundColor: ans.options.map(() => this.getRandomColor())
				}
			];
			newData.push(ansData);
		});
		this.setState({ graphData: newData });
	}

	render() {
		const charts = this.state.graphData.map(chart => {
			return (
				<Row style={{ margin: '25px 0' }}>
					<Col>
						<h4 style={{ textAlign: 'center' }}>{chart.datasets[0].label}</h4>
						<Doughnut data={chart} />
					</Col>
				</Row>
			);
		});

		return (
			<div style={{ padding: '25px' }}>
				<Link to="/html/reports.html">
					<Icon icon="arrow_back" />
				</Link>
				{charts}
			</div>
		);
	}
}

export default ChartsPage;
