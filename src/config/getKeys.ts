
type Keys = {
	googleClientID: string
	googleClientSecret: string
	mongoURI: string
	cookieKey: string,
}

let envVariables: Keys;

if (process.env.NODE_ENV === 'production') {
  // We are in production - return the prod set of keys
  envVariables = require('./prod');
} else {
  // We are in development - return the dev keys
  envVariables = require('./dev');
}

export default envVariables;
