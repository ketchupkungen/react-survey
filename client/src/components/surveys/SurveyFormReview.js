// SurveyFormReview shows users their
// form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>
					{formValues[name]}
				</div>
			</div>
		);
	})


	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button
				className="btn yellow darken-3 left waves-effect waves-light"
				onClick={onCancel}
			>
				Back
			</button>
			<button
				onClick={() => submitSurvey(formValues, history)}
				className="btn green right waves-effect waves-light"
				type="submit">
				Send Survey
			  <i className="material-icons right">email</i>
			</button>
		</div>
	);
};

// from redux store
function mapStateToProps(state) {
	//console.log(state);

	return {
		formValues: state.form.surveyForm.values
	};
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));