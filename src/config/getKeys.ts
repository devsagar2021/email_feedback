
type Keys = {
	googleClientID: string
	googleClientSecret: string
	mongoURI: string
	cookieKey: string,
  payuMerchantKey: string,
  payuActiveSalt: string,
  clientHost: string,
  mailersendToken: string,
  mailjetApiKey: string,
  mailjetSecretKey: string,
  redirectDomain: string,
  mailgunApiKey: string,
  mailgunDomain: string,
}

let envVariables: Keys;

if (process.env.NODE_ENV === 'production') {
  // We are in production - return the prod set of keys
  envVariables = require('./prod').default;
} else {
  // We are in development - return the dev keys
  envVariables = require('./dev').default;
}

export default envVariables;
