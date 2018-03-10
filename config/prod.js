// prodKeys.js - DO commit!
module.exports = {
	// Google Client
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	// Mongo URI
	mongoURI: process.env.MONGO_URI,
	// Cookie key
	cookieKey: process.env.COOKIE_KEY,
	// Stripe keys
	stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey: process.env.STRIPE_SECRET_KEY,
	// Send grid key
	sendGridKey: process.env.SEND_GRID_KEY,

	// Concerning email links redirecting
	redirectDomain: process.env.REDIRECT_DOMAIN
};