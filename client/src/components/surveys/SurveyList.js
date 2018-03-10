import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

class SurveyList extends Component {

	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		// Shows the latest on the bottom
		//return this.props.surveys.reverse().map(survey => {

		// Shows the latest on top
		return this.props.surveys.map((survey, submitSurvey, history) => {
			return (
				<div className="card" key={survey._id}>
					<div className="card-content">
						<span className="card-title">{survey.title}</span>
						<p>
							{survey.body}
						</p>
						<p className="right">
							Sent On: { new Date(survey.dateSent).toLocaleDateString() }
						</p>
					</div>
					<div className="card-action">
						<a>Yes: {survey.yes}</a>
						<a>No: {survey.no}</a>
						<a onClick={() => deleteSurvey(history)} className="right">DELETE</a>
					</div>
				</div>
			)
		})
	}

	render() {
		return (
			<div>
				{ this.renderSurveys() }
			</div>
		)
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);