import { map } from '@laufire/utils/collection';
import passport from 'passport';
import setupProvider from './setupProvider';
import saveLogin from './saveLogin';
import setupVerifier from './setupVerifier';

const renewTokens = (req, res) => {
	res.send('failed');
	// fail redirect to /login
};
const logout = () => {};

const expressAuth = (context) => {
	const {
		app, config: { auth: { providers, loginURL, logoutURL, callbackURL }},
	} = context;

	map(providers, (value, provider) => {
		const props = { ...value, callbackURL: `${ process.env.URL }${ callbackURL }/${ provider }` };

		setupProvider({ ...context, data: { provider, props }});
		app.get(`${ loginURL }/${ provider }`, passport.authenticate(provider, { session: false, accessType: 'offline', prompt: 'consent' }));
		app.get(
			`${ callbackURL }/${ provider }`,
			passport.authenticate(provider, { session: false }),
			saveLogin
		);
		app.get(`${ logoutURL }/${ provider }`, logout);
		app.get('/renewTokens', renewTokens);
	});
	setupVerifier();
	app.use(passport.authenticate('jwt',
		{ failureRedirect: '/renewTokens', session: false }));
};

export default expressAuth;
