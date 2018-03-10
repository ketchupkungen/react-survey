const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		// if no user is logged in, send error message.
		/*if (!req.user){
			return res.status(401).send({ error: 'You must log in!' });
		}*/
		//console.log(req.body);
		const charge = await stripe.charges.create({
			// 500 = 5 dollars aka 500 cents
			amount: 500,
			// us dollars
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});

		//console.log(charge);
		// becomes available with passport
		// Adds 5 credits to user
		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};