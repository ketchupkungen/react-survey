import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// First when we get a response from the API will we dispatch our action
// get request
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data })
};

export const fetchUser = () => async (dispatch) => {
	// output from axios
	const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteSurvey = (values, history) => async dispatch => {
  await axios.delete('/api/surveys', values);

  history.push("/surveys");
  //dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

/*export const updateSurvey = (values, history) => async dispatch => {
  const res = await axios.put("/api/surveys/" + values.survey, values);
  history.push("/surveys");
};*/