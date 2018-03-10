// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
// Field is for any traditional html text-field,
// text-inputs, dropdowns etc
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		// Assigns label and name to the following fields
		return _.map(formFields, ({ label, name}) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}
	render() {
		return(
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link className="btn red left waves-effect waves-light" to="/surveys">
						Cancel
					</Link>
					<button className="btn green right waves-effect waves-light" type="submit">Next
					  <i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate (values) {
	// takes a singel argument of values
	// and the values thing is the object
	// containing all the different values coming
	// of of the form
	const errors = {};

	/*if(!values.title){
		errors.title = 'You must provide a title';
	}*/

	// Validates emails
	errors.recipients = validateEmails(values.recipients || '');

	// Asignes error to empty strings on
	// the different fields
	_.each(formFields, ({ name, noValueError }) => {
		if(!values[name]) {
			errors[name] = noValueError;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'surveyForm',
	// text in input fields does not
	// get dumped on viewchange
	destroyOnUnmount: false
})(SurveyForm);