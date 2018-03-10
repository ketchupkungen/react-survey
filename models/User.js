const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	// not only specify the type, but also default the value
	credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);