import passport from 'passport';
import setupProvider from './setupProvider';
import saveLogin from '../../saveLogin';

const { URL, PORT } = process.env;
const setupAuthFlow = ({ props: [value, provider], ...context }) => {
	const { app, config: { auth: { loginURL, callbackURL }}} = context;
	const props = {
		...value,
		callbackURL: `${ URL }:${ PORT }${ callbackURL }/${ provider }`,
	};

	setupProvider({ ...context, data: { provider, props }});
	app.get(`${ loginURL }/${ provider }`,
		passport.authenticate(provider, {
			session: false, accessType: 'offline', prompt: 'consent',
		}));
	app.get(
		`${ callbackURL }/${ provider }`,
		passport.authenticate(provider, { session: false }),
		saveLogin,
		(req, res) => res.redirect('/')
	);
};

export default setupAuthFlow;
