
// Regular expression for emails
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
	// Allows ',' between emails entered in
	// recipients field. Also trim allows users to enter
	// it like ', ' or ','. It trims away the spaces
	const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
		// Validates if email is valid.
		// if valid its true, otherwise its false
		.filter(email => re.test(email) === false);

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};