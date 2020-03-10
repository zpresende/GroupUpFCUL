require('dotenv').config();
const sessions = require('client-sessions');

module.exports = sessions({
	cookieName: process.env.COOKIE_NAME,
	secret: process.env.SESSION_SECRET,
	duration: 30 * 60 * 1000, // 30 mins
	activeDuration: 5 * 60 * 1000, // 5mins
	httpOnly: true
	// secure: true		//	Uncoment when using SSL
});