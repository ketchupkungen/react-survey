const passport = require('passport');

module.exports = (app) =>{
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
			prompt: 'select_account'
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	// kills the cookie and logs user out
	app.get('/api/logout', (req,res)=>{
		req.logout();
		res.redirect('/')
		//res.send(req.user);
	})
	// Shows current user
	app.get('/api/current_user', (req,res)=>{
		res.send(req.user);
	});
};