import { FETCH_USER } from '../actions/types';

// by default user = null, when we recieve FETCH_USER = true, frist then
// we know who user is
export default function(state = null, action){
	//console.log(action);

	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;

		default:
			return state;
	}
}