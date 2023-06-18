import { map, merge } from '@laufire/utils/collection';
import passport from 'passport';
import saveLogin from './saveLogin';
import setupVerifier from './setup/setupVerifier';
import renewTokens from './renewTokens';
import logout from './logout';
import setupAuthFlow from './setup/setupAuthFlow';
import getUserSchema from './getUserSchema';
import enrichReq from './enrichReq';
import normalizeProviders from './normalizeProviders';

const expressAuth = (context) => {
	const normalizedContext = merge(context, { config: { auth: {
		providers: normalizeProviders(context),
		userSchema: getUserSchema(context),
	}}});
	const { app, config: { auth: { providers, logoutURL }}} = normalizedContext;

	app.use(enrichReq(normalizedContext));
	map(providers, (...props) =>
		setupAuthFlow({ props, ...normalizedContext }));
	setupVerifier();

	app.get(`${ logoutURL }`, logout);
	app.get(
		'/renewTokens', renewTokens, saveLogin, (req, res) => res.redirect('/')
	);
	app.use(passport.authenticate('jwt',
		{ failureRedirect: '/renewTokens', session: false }));
};

export { expressAuth };
