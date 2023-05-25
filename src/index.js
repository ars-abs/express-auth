import { map } from '@laufire/utils/collection';
import passport from 'passport';
import setupProvider from './setupProvider';
import saveTokens from './saveTokens';

const setupVerifier = () => {
	// passport.use(new JwtStrategy({}))  idToken verification
};
const renewTokens = () => {
	// fail redirect to /login
};
const logout = () => {};

const saveLogin = async ({ user }, res) => {
	const { idToken } = user;

	await saveTokens(user);
	res.cookie(
		'token', idToken, { httpOnly: true, secure: true }
	);
	res.redirect('/');
};
const initVerifier = () => {
	// req.cookies.currentProvider
	// passport.authenticate('jwt', {failureRedirect: '/renewTokens', session: false })
};

const expressAuth = (context) => {
	const {
		app, config: { auth: { providers, loginURL, logoutURL, callbackURL }},
	} = context;
	const { URL } = process.env;

	map(providers, (value, provider) => {
		const props = { ...value, callbackURL: `${ URL }${ callbackURL }/${ provider }` };

		setupProvider({ ...context, data: { provider, props }});
		setupVerifier(context);

		app.get(`${ loginURL }/${ provider }`, passport.authenticate(provider, { session: false, accessType: 'offline', prompt: 'consent' }));
		app.get(
			`${ callbackURL }/${ provider }`,
			passport.authenticate(provider, { session: false }),
			saveLogin
		);
		app.get(`${ logoutURL }/${ provider }`, logout);
		app.get('/renewTokens', renewTokens);

		initVerifier(context);
	});
};

export default expressAuth;
