import { map, merge } from '@laufire/utils/collection';
import passport from 'passport';
import saveLogin from './saveLogin';
import setupVerifier from './setup/setupVerifier';
import renewTokens from './renewTokens';
import logout from './logout';
import setupAuthFlow from './setup/setupAuthFlow';
import getUserSchema from './getUserSchema';
import includeContextToReq from './includeContextToReq';
import normalizeRepo from './normalizeRepo';

const expressAuth = (context) => {
	const normalizedContext = merge(context, {
		config: { auth: { repo: normalizeRepo(context) }},
	});
	const extendedContext = merge(normalizedContext, {
		config: { auth: { userSchema: getUserSchema(normalizedContext) }},
	});
	const { app, config: { auth: { providers, logoutURL }}} = extendedContext;

	app.use(includeContextToReq(extendedContext));

	map(providers, (...props) => setupAuthFlow({ props, ...extendedContext }));
	setupVerifier();

	app.get(`${ logoutURL }`, logout);
	app.get(
		'/renewTokens', renewTokens, saveLogin, (req, res) => res.redirect('/')
	);
	app.use(passport.authenticate('jwt',
		{ failureRedirect: '/renewTokens', session: false }));
};

export { expressAuth };
