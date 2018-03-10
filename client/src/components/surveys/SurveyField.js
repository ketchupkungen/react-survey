// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
	//console.log(props);
	//console.log(meta);
	return (
		<div>
			<label>{label}</label>
			<input style={{ marginBottom: '5px' }} {...input} />
		{/* if touched(next button) when field is
		empty, throw error*/}
			<div className="red-text" style={{ marginBottom: '20px' }}>{touched && error}</div>
		</div>
	);
};