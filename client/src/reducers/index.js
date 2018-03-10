import { combineReducers } from 'redux';
// reducer is the name of the function
// as it is importet from the redux-form library
// Renamed to reduxForm, to make it less confusing
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
	// authentication
	auth: authReducer,
	// survey form
	form: reduxForm,
	// survey list
	surveys: surveysReducer


});