const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Takes user model and put some
// identifying piece of information into the cookie
passport.serializeUser((user,done)=>{
	done(null, user.id);
});

// Pulls it back out and turns it back into a user,
// sometime in the future
passport.deserializeUser((id,done)=>{
	User.findById(id)
		.then(user => {
			done(null,user);
		})
});



// console.developers.google.com
// require the key.js file with client keys
// Cookies based authentication
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });

			if(existingUser){
				// I already have a record with the given profile ID
				return done(null, existingUser);
			}
			// I dont´t have a user record with this ID,
			// make a new record
			const user = await new User({googleId: profile.id}).save();
			done(null,user);
			// Testing logs
			/*console.log('access token', accessToken);
			console.log('refresh token', refreshToken);
			console.log('access Token', profile);*/
		}
	)
);